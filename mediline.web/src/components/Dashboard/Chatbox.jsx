import React, { useState, useEffect, useRef } from 'react';
import Container, { ItemGroup } from '../General/Container';
import io from 'socket.io-client';
import { chatLogFetch } from '../../viewModels/Chatbox-axios';

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
    const recipientName = isPatient ? doctorName : doctorName; // optionally just use doctor

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
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            <ItemGroup
                customClass="gap-5"
                fitParent={true}
                stretch={true}
                axis={true}
                items={
                    <>
                        <ItemGroup
                            customClass="bg-secondary-400 p-4 br-md justify-content-space-between align-items-center"
                            fitParent={true}
                            axis={false}
                            items={[
                                <ItemGroup
                                    axis={false}
                                    stretch={true}
                                    fitParent={true}
                                    items={[
                                        <div className="overlay-container">
                                            <img src="public/img/person-icon.svg" width="40" height="40" alt="Profile" />
                                        </div>,
                                        <div className="pl-2 pt-2 font-medium">{recipientName}</div>
                                    ]}
                                />
                            ]}
                        />
                        <Container
                            customClass="chat-container"
                            content={[
                                <div
                                    ref={chatContainerRef}
                                    className="overflow-y-visible p-1"
                                    style={{
                                        maxHeight: "400px",
                                        overflowY: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.75rem",
                                        borderRadius: "10px",
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
                                            <div
                                                key={msg.messageId || index}
                                                style={{
                                                    alignSelf: msg.sender === user ? "flex-end" : "flex-start",
                                                    backgroundColor: msg.sender === user ? "#5695DD" : "#C5D8E3",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "20px",
                                                    maxWidth: "70%",
                                                    position: "relative"
                                                }}
                                            >
                                                <strong style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                                                    {msg.sender === patientId ? patientName : doctorName}
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
                                            </div>
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
                                    <button
                                        className="bg-transparent border-0 br-sm d-flex justify-content-end"
                                        onClick={onSendMessage}
                                        disabled={isLoading || !messageText.trim()}
                                    >
                                        <img src="public/img/send-icon.svg" width="40" height="30" alt="Send" />
                                    </button>
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
