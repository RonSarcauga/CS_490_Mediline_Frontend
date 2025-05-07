import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';
import EditableUserIcon from '../../components/General/EditableUserIcon';
import Chatbox from '../../components/Dashboard/Chatbox';

import { bookingInfo, patientDashboardData } from '../../assets/js/const';
import AccordionList from '../../components/General/Accordion';
import {doctorAppointmentData, chatlog} from '../../assets/js/const';
import SharedChatBox from '../../components/Dashboard/SharedChatBox';

const PatientAppointment = () => {
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const log = chatlog;
  const { meetingTime, treatment } = bookingInfo;

  const accordionData = [
    {
      header: (<><CommonIcon name={'person'} />Basic Info</>),
      content: (
        <ItemGroup
          items={[
            <>
              <strong>Last Appointment</strong>
              <div><CommonIcon name={'calendar'} /> {user.lastAppointment.date} <CommonIcon name={'clock'} /> {user.lastAppointment.time}</div>
              <div><CommonIcon name={'doctor'} /> {user.lastAppointment.doctor}</div>
              <strong>Address</strong>
              {user.address}
              <strong>Phone</strong>
              {user.phone}
            </>
          ]}
        />
      ),
    },
    {
      header: (<><CommonIcon name={'pill'} />Medications</>),
      content: (
        user.medications.length > 0 ? (
          <ul>
            {user.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        ) : (
          <div>No medications available</div>
        )
      ),
    },
    {
      header: (<><CommonIcon name={'form'} />Forms</>),
      content: <>No Forms to Show</>,
    }
  ];

  const mainBody = (
    <ItemGroup
      axis={false}
      fitParent={true}
      customClass="pl-10 pr-5 pt-10 gap-8 item-group-row-even"
      style={{ minHeight: "78vh", maxHeight: "88vh" }}
      items={[
        <>
          <ItemGroup
            customClass="gap-5"
            fitParent={true}
            axis={true}
            style={{ maxHeight: "54.5vh" }}
            items={[
              <>
                <ItemGroup
                  customClass="gap-10"
                  fitParent={true}
                  axis={true}
                  items={[
                    <>
                      <ItemGroup
                        customClass="gap-5"
                        fitParent={true}
                        axis={true}
                        items={[
                          <>
                            <Container
                              fitParent={true}
                              customClass="gradient-light br-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                              headerClass="p-5"
                              header={
                                <ItemGroup
                                  customClass="justify-content-space-between align-items-center b-bottom-3 outline-secondary-300"
                                  fitParent={true}
                                  stretch={true}
                                  axis={false}
                                  items={[
                                    <>
                                      <ItemGroup
                                        fitParent={false}
                                        axis={true}
                                        style={{ padding: "0.5rem 0" }}
                                        items={[<h1>Booking Information</h1>]}
                                      />
                                      <ItemGroup
                                        customClass="bg-dark-500 pl-1 py-1 br-md"
                                        stretch={true}
                                        axis={false}
                                        items={[
                                          <h1 className="font-4 font-medium text-neutral-1100 pr-4 pl-4 pt-2 pb-2">
                                            In Progress
                                          </h1>
                                        ]}
                                      />
                                    </>
                                  ]}
                                />
                              }
                              content={[
                                <ItemGroup
                                  customClass="justify-content-space-between align-items-center"
                                  fitParent={true}
                                  stretch={true}
                                  axis={false}
                                  items={[
                                    <ItemGroup
                                      customClass="pl-4"
                                      fitParent={true}
                                      axis={true}
                                      items={[
                                        <div className="font-semibold py-1">MEETING TIME</div>,
                                        <div className="py-1 mr-3"><CommonIcon name="calendar"/>{meetingTime.date} <CommonIcon name="clock"/>{meetingTime.time}</div>,
                                        <div className="py-1 mr-3"><CommonIcon name="doctor"/>{meetingTime.doctor}</div>,
                                        <div className="font-semibold pt-4">TREATMENT</div>,
                                        <div className="pb-4">{treatment}</div>
                                      ]}
                                    />,
                                    <ItemGroup
                                      customClass="pr-30"
                                      fitParent={true}
                                      axis={true}
                                      items={[
                                        <div className="font-semibold py-1">PRE-APPOINTMENT CHECKLIST</div>,
                                        <div className="py-1"> Check-in Form -----
                                          <span style={{backgroundColor: '#00b000', padding: '4px 8px', borderRadius: '4px'}} className="ml-3 text-neutral-1100">Completed</span>
                                        </div>,
                                        <div className="py-1">Self-Evaluation -----
                                        <span style={{backgroundColor: '#00b000', padding: '3px 8px', borderRadius: '4px'}} className="ml-3 text-neutral-1100">Completed</span>
                                        </div>
                                      ]}
                                    />
                                  ]}
                                />
                              ]}
                            />
                          </>
                        ]}
                      />
                      <Container
                        fitParent={true}
                        customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                        headerClass="p-5"
                        header={
                          <ItemGroup
                            customClass="flex-column h-full"
                            fitParent={true}
                            axis={true}
                            items={[
                              <>
                              {/*
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
                                          <svg className="overlay-circle" width="10" height="10">
                                            <circle cx="5" cy="5" r="5" fill="lightgreen" />
                                          </svg>
                                          <img src="public/img/person-icon.svg" width="40" height="40" />
                                        </div>,
                                        <div className="pl-2 font-medium">{doctor.name}</div>
                                      ]}
                                    />
                                  ]}
                                />
                                <ItemGroup
                                  customClass="p-4 overflow-auto flex-grow-1"
                                  fitParent={true}
                                  axis={true}
                                  style={{ minHeight: "300px", maxHeight: "400px" }}
                                  items={[
                                    <>
                                      <div className="bg-secondary-200 p-4 br-md align-self-start mb-4 max-width-70">
                                        Good morning {user.name}. I see you are in the waiting room so we will begin our consultation shortly.
                                      </div>
                                      <div className="bg-secondary-300 p-4 br-md d-flex justify-content-end mb-2">
                                        Ready when you are Doctor.
                                      </div>
                                    </>
                                  ]}
                                />*/}
                               <Chatbox user={0} data={log}></Chatbox>
                                
                                {/*(<ItemGroup
                                  customClass="p-4 bg-neutral-50 br-bottom-md"
                                  fitParent={true}
                                  axis={true}
                                  items={[
                                    <div className="br-md bg-white p-3 input-bar d-flex align-items-center justify-content-space-between">
                                      <input
                                        type="text"
                                        placeholder="Type a message"
                                        className="border-0 outline-0 bg-transparent pl-4 py-2 w-100"
                                      />
                                      <button className="bg-transparent border-0 br-sm d-flex justify-content-end">
                                        <img src="public/img/send-icon.svg" width="40" height="30" />
                                      </button>
                                    </div>
                                  ]}
                                />*/}
                              </>
                            ]}
                          />
                        }
                      />
                    </>
                  ]}
                />
              </>
            ]}
          />
          <Container
            fitParent={true}
            customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
            headerClass="p-5"
            content={[
              <ItemGroup
                customClass="gap-7"
                axis={true}
                fitParent={true}
                items={[
                  <>
                    <ItemGroup
                      customClass="gap-5 justify-items-center align-items-center"
                      axis={true}
                      fitParent={true}
                      items={[
                        <EditableUserIcon />,
                        <div><strong>{user.name}</strong></div>,
                        <div><strong>MRN:</strong> {user.mrn}</div>,
                        <div>{user.gender} ● {user.birthday} ({user.age})</div>
                      ]}
                    />
                    <AccordionList data={accordionData} />
                  </>
                ]}
              />
            ]}
          />
        </>
      ]}
    />
  );

  return <Dashboard content={mainBody} />;
};

export default PatientAppointment;