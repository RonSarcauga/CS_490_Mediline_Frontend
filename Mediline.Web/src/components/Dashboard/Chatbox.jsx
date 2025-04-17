import React from 'react';
import BaseIcon from '../General/BaseIcon';
import CommonIcon from '../General/CommonIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import InputBar from '../../components/General/InputBar';

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
                    <Container
                        fitParent={true}
                        customClass="br-sm bg-secondary-400"
                        headerClass="p-5"
                        header={
                            <>
                                <ItemGroup
                                    customClass=""
                                    fitParent={true}
                                    stretch={true}
                                    axis={false}
                                    items={
                                        <>
                                            <CommonIcon name="person"/>
                                            {recipient}
                                        </>
                                    }
                                />
                            </>
                        }
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

                    <InputBar
                        customClass='br-md bg-neutral-1100 p-5'
                        sendIcon={
                            <CommonIcon name="send"/>
                        }
                        placeholder="Send Message..."
                    />
                </>
            }
        />
    </>
  );
};

export default Chatbox;
