import BaseIcon from '../General/BaseIcon';
import CommonIcon from '../General/CommonIcon';
import Container, { ItemGroup } from '../General/Container';
import InputBar from '../General/InputBar';
import { chatLogFetch } from '../../viewModels/Chatbox-axios';
import React, { useRef, useEffect, useState } from "react";


import { patientDashboardData} from '../../assets/js/const';
//adjust this line to have better data in const.js
const Chatbox = ({ user, data, onSendMessage }) => {
    const { patient, doctor, log: initial_log} = data;
    const [log, setLog] = useState(initial_log);
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef(null);

    let recipient = doctor;
    let messenger = patient;
    let isPatient = false;

    if (user === 1) {
        recipient = patient;
        messenger = doctor;
        isPatient = true;
    }

    //scrolls to bottom of chat when message is sent
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [log]);

    const handleSendMessage = () => {
        if (message.trim() === '') return;

        // Add the new message to the log
        const newMessage = [user, message];
        setLog([...log, newMessage]);
        
        // clear input field
        setMessage('');

        if (onSendMessage) {
            onSendMessage(user, message, newLog);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
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
                                    stretch={true} //text does not stack,
                                    fitParent={true}
                                    items={[
                                        <div className="overlay-container">
                                            <img src="public/img/person-icon.svg" width="40" height="40" />
                                        </div>,
                                        //determines the sender role based on isPatient
                                        <div className="pl-2 pt-2 font-medium">
                                            {isPatient ? recipient : "Dr. " + recipient}
                                        </div>
                                    ]}
                                />
                            ]}
                        />
                        <Container
                            customClass="chat-container overflow-y-visible"
                            content={[
                                <div
                                    ref={chatContainerRef}
                                    className="p-1"
                                    style={{
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.75rem",
                                        borderRadius: "10px",
                                    }}
                                >
                                    {log.map(([sender, message], index) => (
                                        <div
                                            key={index}
                                            style={{
                                                alignSelf: sender === user ? "flex-end" : "flex-start",
                                                backgroundColor: sender === user ? "#5695DD" : "#C5D8E3",
                                                padding: "0.75rem 1rem",
                                                borderRadius: "20px",
                                                maxWidth: "70%",
                                            }}
                                        >
                                            <strong style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                                                {sender === 0 ? patient.name : doctor.name}
                                            </strong>
                                            {message}
                                        </div>
                                    ))}
                                </div>,
                            ]}
                        />

                        <ItemGroup
                            customClass="bg-neutral-50 br-bottom-md"
                            fitParent={true}
                            stretch={true}
                            axis={true}
                            items={[
                                <div className="br-md bg-white p-3 input-bar d-flex align-items-center justify-content-space-between">
                                    <input
                                        type="text"
                                        placeholder="Type a message"
                                        className="bg-transparent pl-4 py-2 stretch text-black"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button 
                                        className="bg-transparent border-0 br-sm d-flex justify-content-end"
                                        onClick={handleSendMessage}
                                    >
                                        <img src="public/img/send-icon.svg" width="40" height="30" />
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