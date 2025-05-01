import React from 'react';
import BaseIcon from '../General/BaseIcon';
import CommonIcon from '../General/CommonIcon';
import Container, { ItemGroup } from '../General/Container';
import InputBar from '../General/InputBar';

import { patientDashboardData } from '../../assets/js/const';
//adjust this line to have better data in const.js
const Chatbox = ({ user, data }) => {
    const { patient, doctor, log } = data;

    let recipient = doctor;
    let messenger = patient;

    if (user === 1) {
        recipient = patient;
        messenger = doctor;
    }

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
                                            {/*<svg className="overlay-circle" width="10" height="10">
                                                <circle cx="5" cy="5" r="5" fill="lightgreen" />
                                            </svg>*/}
                                            <img src="public/img/person-icon.svg" width="40" height="40" />
                                        </div>,
                                        <div className="pl-2 pt-2 font-medium">{"Dr. "+ recipient}</div>
                                    ]}
                                />
                            ]}
                        />
                        <Container
                            customClass="chat-container"
                            content={[
                                <div
                                    customClass="overflow-y-visible p-1"
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
                                    />
                                    <button className="bg-transparent border-0 br-sm d-flex justify-content-end">
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
