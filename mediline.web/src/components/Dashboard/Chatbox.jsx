import React, { useState, useEffect, useRef } from 'react';
import Container, { ItemGroup } from '../General/Container';
import io from 'socket.io-client';
import { chatLogFetch } from '../../viewModels/Chatbox-axios';
import BaseIcon from '../General/BaseIcon';

const Chatbox = ({ user, data, appointmentId }) => {
    const { patient, doctor } = data;
    const patientId = patient.id;
    const doctorId = doctor.id;
    const patientName = patient.name;
    const doctorName = doctor.name;

    const [messages, setMessages] = useState([]);
    const [messageText, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const chatContainerRef = useRef(null);
    const socketRef = useRef(null);

    const isPatient = user === patientId;
    const recipientName = isPatient ? doctorName : doctorName;

    const onSendMessage = () => {
        if (messageText.trim() === '') return;

        const chatMessage = {
            appointment_id: appointmentId,
            message: messageText,
            user_id: user,
        };

        console.log("Emitting message:", chatMessage);
        socketRef.current?.emit('message', chatMessage);
        setMessage('');
    };

    useEffect(() => {
        const socket = io("https://cs-490-mediline-backend-1021109447710.us-central1.run.app/chat", {
            autoConnect: false,
            auth: {
                token: localStorage.getItem("jwtToken")
            }
        });

        //catch all debug
        socket.onAny((event, data) => {
            console.log("Received event:", event, data);
        });


        socketRef.current = socket;

        socket.on('connect', () => {
            console.log("Socket connected");
            setIsConnected(true);
            socket.emit('join', { appointment_id: appointmentId });
        });

        socket.on('disconnect', () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        socket.on('message', (msg) => {
            console.log("Received structured message:", msg);
            setMessages(prev => [...prev, {
                message: msg.message,
                sender: msg.user_id,
                timestamp: msg.timestamp
            }]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    }, [appointmentId]);

    useEffect(() => {
        const fetchChatLog = async () => {
            try {
                setIsLoading(true);
                const { chatlog } = await chatLogFetch(appointmentId);
                console.log("Loaded chat history:", chatlog);
                setMessages(chatlog.map(msg => ({
                    message: msg.message,
                    sender: msg.sender,
                    timestamp: msg.timestamp
                })));
            } catch (err) {
                console.error("Failed to load chat log:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChatLog();
    }, [appointmentId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';

        const cleanedTimestamp = timestamp.split('.')[0] + 'Z';

        const date = new Date(cleanedTimestamp);

        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };



    return (
        <>
            <ItemGroup
                customClass="align-content-space-between"
                fitParent={true}
                stretch={true}
                axis={true}
                items={
                    <>
                        <Container
                            customClass="chat-container bg-neutral-1100 br-md box-shadow-sm shadow-primary-dark-800"
                            fitParent={true}
                            content={[
                                <div
                                    ref={chatContainerRef}
                                    className="overflow-y p-1 scrollable gap-3 p-5"
                                    style={{
                                        maxHeight: "210px",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {!isConnected ? (
                                        <div className="text-center py-3">
                                            <button
                                                className="border-0 br-sm"
                                                onClick={() => {
                                                    console.log("Join Chat clicked");
                                                    socketRef.current?.connect();
                                                }}
                                            >
                                                Join Chat
                                            </button>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="text-center py-3">No messages yet.</div>
                                    ) : (
                                        messages.map((msg, index) => (
                                            <ItemGroup
                                                key={msg.messageId || index}
                                                customClass={`pl-5 pr-5 pt-2 pb-2 br-md ${msg.sender != user ? "bg-neutral-900" : "bg-primary-800"}`}
                                                fitParent={true}
                                                axis={true}
                                                style={{ alignSelf: msg.sender == user ? "flex-end" : "flex-start", maxWidth: "70%", }}
                                                items={[
                                                    <>
                                                        <strong style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                                                            {msg.sender == patientId ? patientName : doctorName}
                                                        </strong>
                                                        <div>{msg.message}</div>
                                                        <div style={{
                                                            fontSize: "0.7rem",
                                                            opacity: 0.8,
                                                            textAlign: "right",
                                                            marginTop: "0.3rem"
                                                            }}>
                                                            {formatTime(msg.timestamp)}
                                                        </div>
                                                    </>

                                                ]}
                                            />
                                            
                                        ))
                                    )}
                                </div>
                            ]}
                        />
                        <ItemGroup
                            customClass="bg-neutral-50 br-bottom-md"
                            fitParent={true}
                            stretch={true}
                            axis={true}
                            items={[
                                <div className="br-md bg-white p-3 input-bar d-flex align-items-center justify-content-space-between">
                                    <input id="messageInput"
                                        type="text"
                                        placeholder="Type a message"
                                        className="bg-transparent pl-4 py-2 stretch text-black"
                                        value={messageText}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => { if (e.key === 'Enter') onSendMessage(); }}
                                        disabled={isLoading}
                                    />
                                    {<button
                                        className="bg-transparent border-0 br-sm d-flex justify-content-end"
                                        onClick={onSendMessage}
                                        disabled={isLoading || !messageText.trim()}
                                    >
                                        <BaseIcon width={30} height={30} fillColor="none">
                                            <path d="M18.8951 3.61502C19.7248 3.37794 20.492 4.1451 20.2549 4.97489L16.2553 18.9736C15.8267 20.4736 13.823 20.7554 12.9973 19.4317L10.1999 14.947C9.87715 14.4296 9.44039 13.9928 8.92298 13.6701L4.43823 10.8726C3.11455 10.047 3.39632 8.04323 4.89636 7.61465L18.8951 3.61502Z" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.1924 13.6777L13.7279 10.1422" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                        </BaseIcon>
                                    </button>}
                                </div>
                            ]}
                        />
                    </>
                }
            />
        </>
    );
};

export default Chatbox;
