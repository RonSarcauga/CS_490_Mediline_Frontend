import React, { useState, useEffect, useRef } from 'react';
import Container, { ItemGroup } from '../General/Container';
import io from 'socket.io-client';
import { chatLogFetch } from '../../viewModels/Chatbox-axios';
import BaseIcon from '../General/BaseIcon';
import Modal from '../../components/General/Modal';
import CustomTextArea from '../../components/General/InputBar';
import { submitMedicalRecord } from '../../viewModels/PDAViewModel';

const Chatbox = ({ user, data, appointmentId, currentUser }) => {
    const { patient, doctor } = data;
    const patientId = patient.id;
    const doctorId = doctor.id;
    const patientName = patient.name;
    const doctorName = doctor.name;

    const [messages, setMessages] = useState([]);
    const [messageText, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const chatContainerRef = useRef(null);
    const socketRef = useRef(null);

    const [noteText, setNoteText] = useState('');
    const [stars, setStars] = useState(10);

    const [activeModal, setActiveModal] = useState(null);
    const handleOpenModal = (modalId) => {
        setActiveModal(modalId);
    }
    const handleCloseModal = () => {
        setActiveModal(null);
    }

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

        socket.on('endChat', () => {
            console.log("Socket disconnected");
            setIsConnected(false);
            setIsFinished(true);
            socket.disconnect();
            if (currentUser.role == "patient") handleOpenModal("patientModal")
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
            socket.off('endChat');
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
            <Container
                customClass="gradient-light br-sm b-3 outline-neutral-1100 p-5"
                fitParent={true}
                header={[
                    <>
                        <Container
                            customClass="bg-primary-dark-800 p-4 br-sm"
                            fitParent={true}
                            content={[
                                <>
                                    <ItemGroup
                                        customClass="gap-4 px-1 align-items-center justify-content-space-between"
                                        axis={false}
                                        fitParent={true}
                                        stretch={true}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-4 px-1 align-items-center"
                                                    axis={false}
                                                    stretch={true}
                                                    items={[
                                                        <>
                                                            <Container
                                                                customClass="align-items-center justify-content-center p-0"
                                                                content={[
                                                                    <>
                                                                        <BaseIcon
                                                                            height="30px"
                                                                            width="30px"
                                                                            viewBox="0 0 24 24"
                                                                            fillColor="none">
                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                            <g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </g>
                                                                        </BaseIcon>
                                                                    </>
                                                                ]}
                                                            />
                                                            <h5 className="font-semibold font-5 text-primary-neutral-100">{currentUser.doctor ? ("Dr. "+doctorName) : (patientName)}</h5>
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass="gap-4 px-1 align-items-center"
                                                    axis={false}
                                                    stretch={true}
                                                    items={[
                                                        <>
                                                            { currentUser.role == "doctor" && isConnected ?
                                                            (<Container
                                                                customClass={`bg-warning-500 py-2 br-sm text-center`}
                                                                fitParent={true}
                                                                isClickable={isConnected}
                                                                onClick={() => {
                                                                    socketRef.current?.emit('endChat', { appointment_id: appointmentId });
                                                                    console.log("Doctor ended the chat");
                                                                    handleOpenModal("doctorModal")
                                                                }}
                                                                content={[<p className="font-semibold text-primary-neutral-100">End Meeting</p>]}
                                                            />) : ("") }
                                                            <Container
                                                                customClass={`${(isConnected || isFinished) ? "bg-primary-dark-400" : "bg-neutral-1100"} py-2 br-sm text-center`}
                                                                fitParent={true}
                                                                isClickable={!isConnected && !isFinished}
                                                                onClick={() => {
                                                                    console.log("Join Chat clicked");
                                                                    socketRef.current?.connect();
                                                                }}
                                                                content={[<p className="font-semibold text-primary-neutral-100">{isFinished ? "Chat Ended" : !isConnected ? "Join Chat" : "Connected"}</p>]}
                                                            />
                                                        </>
                                                    ]}
                                                />
                                                
                                            </>
                                        ]}
                                    />
                                </>
                            ]}
                        />
                    </>
                ]}
                contentClass="pt-4" //chat goes here
                content={[
                    <>
                        <>
                            <ItemGroup
                                customClass="align-content-space-between"
                                fitParent={true}
                                stretch={true}
                                axis={true}
                                items={
                                    <>
                                        <Container
                                            customClass={`chat-container br-md box-shadow-sm shadow-primary-dark-800 ${(isFinished || !isConnected) ? "bg-neutral-1000 b-1 border-neutral-1100" : "bg-neutral-1100"}`}
                                            fitParent={true}
                                            content={[
                                                <div
                                                    ref={chatContainerRef}
                                                    className="overflow-y p-1 scrollable gap-3 p-5"
                                                    fitParent={true}
                                                    style={{
                                                        minHeight: "300px", 
                                                        maxHeight: "300px", //hardcoded height
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    { isFinished ? (
                                                        <>
                                                        <div className="text-center align-content-center" style={{ minHeight: "250px"}}>The meeting has ended.</div>
                                                        <Container
                                                            customClass={`bg-neutral-1100 py-2 br-sm text-center`}
                                                            fitParent={true}
                                                            isClickable={isConnected}
                                                            onClick={() => navigate(`/dashboard/${currentUser.role}`)}
                                                            content={[<p className="font-semibold text-primary-neutral-100">Return to home</p>]}
                                                        />
                                                        </>

                                                    ) : !isConnected ? (
                                                        <div className="text-center align-content-center" style={{ minHeight: "250px"}}>Meeting not joined.</div>
                                                    ) : messages.length === 0 ? (
                                                        <div className="text-center align-content-center" style={{ minHeight: "250px"}}>No messages yet.</div>
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
                                                        disabled={isLoading || !isConnected || isFinished}
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
                    </>
                ]}
            />
            <Modal
                id="doctorModal"
                isOpen={activeModal === "doctorModal"}
                onClose={handleCloseModal}
                disableOutsideClose={true}
            >
                <>
                    <ItemGroup
                        customClass="px-2 pt-2 gap-5 text-start"
                        axis={true}
                        style={{
                            gridAutoColumns: "30vw"
                        }}
                        items={[
                            <form>
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={true}
                                    fitParent={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="bg-neutral-1100 p-6"
                                                fitParent={true}
                                                headerClass="b-bottom-3 outline-neutral-800 py-3"
                                                header={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="p-0 align-items-center justify-content-center"
                                                            axis={false}
                                                            fitParent={true}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <h3 className="font-semibold text-neutral-600">
                                                                        NOTES ABOUT MEETING
                                                                    </h3>
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="hideScroll overflow-x-hidden px-0 pt-5 pb-5 b-bottom-3 outline-neutral-800"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-5"
                                                            axis={true}
                                                            fitParent={true}
                                                            style={{
                                                                maxHeight: "200px"
                                                            }}
                                                            items={[
                                                                <>
                                                                    {
                                                                        <CustomTextArea
                                                                            customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                            placeholder="Keep it short..."
                                                                            value={noteText}
                                                                            onChange={(e) => setNoteText(e.target.value)}
                                                                        />
                                                                    }
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                footer={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-neutral-1000 py-3 b-3 outline-neutral-700 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={async () => {
                                                                            console.log("button clicked")
                                                                            try {
                                                                                await submitMedicalRecord(patientId, appointmentId, noteText);
                                                                                alert("Medical record saved successfully.");
                                                                                handleCloseModal();
                                                                            } catch (err) {
                                                                                alert("Failed to save medical record.");
                                                                            }
                                                                        }}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-600">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            </form>
                        ]}
                    />
                </>
            </Modal>
            <Modal
                id="patientModal"
                isOpen={activeModal === "patientModal"}
                onClose={handleCloseModal}
                disableOutsideClose={true}
            >
                <>
                    <ItemGroup
                        customClass="px-2 pt-2 gap-5 text-start"
                        axis={true}
                        style={{
                            gridAutoColumns: "30vw"
                        }}
                        items={[
                            <form>
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={true}
                                    fitParent={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="bg-neutral-1100 p-6"
                                                fitParent={true}
                                                headerClass="b-bottom-3 outline-neutral-800 py-3"
                                                header={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="p-0 align-items-center justify-content-center"
                                                            axis={false}
                                                            fitParent={true}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <h3 className="font-semibold text-neutral-600">
                                                                        RATE YOUR DOCTOR'S PERFORMANCE
                                                                    </h3>
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="hideScroll overflow-x-hidden px-0 pt-5 pb-5 b-bottom-3 outline-neutral-800"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-5"
                                                            axis={true}
                                                            fitParent={true}
                                                            style={{
                                                                maxHeight: "200px"
                                                            }}
                                                            items={[
                                                                <>
                                                                    {
                                                                        <div className="star-rating text-center">
                                                                            {[...Array(10)].map((_, i) => {
                                                                                const value = i + 1;
                                                                                return (
                                                                                <span
                                                                                    key={value}
                                                                                    onClick={() => setStars(value)}
                                                                                    style={{
                                                                                    cursor: "pointer",
                                                                                    color: value <= stars ? "gold" : "gray",
                                                                                    fontSize: "24px",
                                                                                    padding: "0 2px"
                                                                                    }}
                                                                                    title={`${value} Stars`}
                                                                                >
                                                                                    {value <= stars ? "★" : "☆"}
                                                                                </span>
                                                                                );
                                                                            })}
                                                                            </div>
                                                                    }
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                footer={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-neutral-1000 py-3 b-3 outline-neutral-700 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={async () => {
                                                                            try {
                                                                                await submitDoctorSurvey(doctorId, patientId, patientName, stars);
                                                                                alert("Thank you for your feedback!");
                                                                                handleCloseModal();
                                                                            } catch (err) {
                                                                                alert("Failed to submit feedback.");
                                                                            }
                                                                        }}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-600">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            </form>
                        ]}
                    />
                </>
            </Modal>
        </>
    );
};

export default Chatbox;
