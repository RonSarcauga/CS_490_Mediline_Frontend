import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';
import BaseIcon from '../../components/General/BaseIcon';
import Accordion from '../../components/General/Accordion';
import RatedIcon from '../../components/General/RatedIcon';
import StatusLabel from '../../components/General/StatusLabel';
import Chatbox from '../../components/Dashboard/Chatbox';
import SharedChatBox from '../../components/Dashboard/SharedChatBox';

//import hardcoded data if needed
//import {} from '../../assets/js/const';
import {doctorAppointmentData, chatlog} from '../../assets/js/const';

const DoctorAppointment = () => {
  //any hardcoded data can go here
  //const {} = ;
  const { rating, ratingColor, patient, booking } = doctorAppointmentData;
  const log = chatlog;
  const accordionData = [
    {
      header: (<><CommonIcon name={'person'} />Basic Info</>),
      content: (
        <>
        <ItemGroup
          items={
              <>
                <strong>Last Appointment</strong>
                <div><CommonIcon name={'calendar'} /> {patient.lastAppointment.date} <CommonIcon name={'clock'} /> {patient.lastAppointment.time}</div>
                <div><CommonIcon name={'doctor'} /> {patient.lastAppointment.doctor}</div>
                <strong>Address</strong>
                {patient.address}
                <strong>Phone</strong>
                {patient.phone}
              </>
          }
        />
        </>
      ),
    },
    {
      header: (<><CommonIcon name={'pill'} />Medications</>),
      content: (
        <>
        {patient.medications.length > 0 ? (
          <ul>
            {patient.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        ) : (
          <div>No medications available</div>
        )}
      </>
      ),
    },
    {
      header: (<><CommonIcon name={'form'} />Forms</>),
      content: (
        <>No Forms to Show</>
      ),
    }
  ];

  const mainBody = (
    <>
    <ItemGroup
      axis={false}
      fitParent={true}
      customClass="pl-10 pr-5 pt-10 gap-8 item-group-row-even"
      style={{
          minHeight: "78vh",
          maxHeight: "88vh"
      }}
      items={
          <>
            <ItemGroup
              customClass="gap-5"
              fitParent={true}
              axis={true}
              style={{
                  maxHeight: "54.5vh"
              }}
              items={
                <>
                  <ItemGroup
                    customClass="gap-5"
                    fitParent={true}
                    axis={true}
                    items={
                      <>
                        <ItemGroup
                          customClass="gap-5 justify-content-space-between"
                          fitParent={true}
                          axis={false}
                          items={
                            <>
                              <ItemGroup
                                customClass=""
                                axis={false}
                                items={
                                  <Container
                                    fitParent={true}
                                    stretch={true}
                                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                                    headerClass="p-5"
                                    header={
                                      <>
                                        <ItemGroup
                                          customClass="gap-5"
                                          fitParent={true}
                                          axis={true}
                                          items={
                                            <>
                                              <ItemGroup
                                                customClass="align-items-center justify-content-space-between"
                                                stretch={true}
                                                axis={false}
                                                items={
                                                  <>
                                                    <h1>Booking Information</h1>
                                                    <StatusLabel status={"In Progress"}/>
                                                  </>
                                                }
                                              />
                                              <ItemGroup
                                                  customClass="b-bottom-3 outline-secondary-400"
                                                  fitParent={true}
                                                  axis={true}
                                              />
                                              <ItemGroup
                                                customClass="justify-items-top align-content-top"
                                                fitParent={true}
                                                stretch={true}
                                                items={
                                                    <>
                                                      <strong>Meeting Time</strong>
                                                      <div><CommonIcon name={'calendar'} /> {booking.time.date} <CommonIcon name={'clock'} /> {booking.time.time}</div>
                                                      <div><CommonIcon name={'doctor'} /> {booking.doctor}</div>
                                                      <strong>Treatment</strong>
                                                      {booking.treatment}
                                                    </>
                                                }
                                              />
                                            </>
                                          }
                                        />
                                      </>
                                    }
                                  />
                                }
                              />
                              <ItemGroup
                                customClass=""
                                stretch={true}
                                axis={false}
                                items={
                                  <Container
                                    fitParent={true}
                                    stretch={true}
                                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                                    headerClass="p-5"
                                    header={
                                      <>
                                        <ItemGroup
                                          customClass="justify-items-center gap-5"
                                          stretch={true}
                                          axis={true}
                                          items={
                                            <>
                                              <strong>Your Care Rating</strong>
                                              <RatedIcon rating={rating} borderColor={ratingColor} />
                                            </>
                                          }
                                          />
                                      </>
                                    }
                                  />
                                }
                              />
                            </>
                          }
                        />
                        <Container
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                          headerClass="p-5"
                          header={
                            <>
                              <Chatbox user={1} data={log}></Chatbox>
                            </>
                          }
                        />
                      </>
                    }
                  />
                </>
              }
            />
          <Container
            fitParent={true}
            customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
            headerClass="p-5"
            header={
              
              <ItemGroup
                customClass="gap-7"
                axis={true}
                fitParent={true}
                items={
                  <>
                    <ItemGroup
                      customClass="gap-5 justify-items-center align-items-center"
                      axis={true}
                      fitParent={true}
                      items={
                        <>
                          <BaseIcon xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 100 100">
                            <g clipPath="url(#clip0_56_1683)">
                              <path
                                fill="#E9573E"
                                d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50"
                              ></path>
                              <path
                                fill="#F9DCA4"
                                fillRule="evenodd"
                                d="m37.63 62.59 25.74.24v5.853l11.33 5.403-25.384 23.817-21.782-24.822 10.096-4.298z"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#677079"
                                fillRule="evenodd"
                                d="M86.534 84.131A49.86 49.86 0 0 1 50 100c-2.075 0-4.149-.128-6.209-.383a55.1 55.1 0 0 1-18.063-5.897 50.2 50.2 0 0 1-12.712-10.073l2.076-5.016 18.33-8.178c1.416 7.34 6.853 18.665 16.466 25.084A39.04 39.04 0 0 0 67.78 70.752l16.283 7.934z"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#000"
                                fillRule="evenodd"
                                d="M64.387 69.167c1.178.561 3.193 1.501 3.388 1.616-3.284 10.305-25.437 14.078-31.967-1.223z"
                                clipRule="evenodd"
                                opacity="0.11"
                              ></path>
                              <path
                                fill="#FFE8BE"
                                fillRule="evenodd"
                                d="M50.37 13.644c34.436 0 21.015 57.065 0 57.065-19.847 0-34.435-57.065 0-57.065"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#F9DCA4"
                                fillRule="evenodd"
                                d="M29.717 38.908c-4.968 2.168-.745 12.438 2.382 12.392a51.7 51.7 0 0 1-2.382-12.392M71.424 38.908c4.968 2.167.745 12.438-2.38 12.392a51.8 51.8 0 0 0 2.38-12.392"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#AD835F"
                                fillRule="evenodd"
                                d="M37.858 24.979c-.958 4.479-.622 8.932-4.868 9.754-1.01.194-1.678 1.562-1.896 2.767a37 37 0 0 0-.615 7.98c.168.92-.64-1.768-.64-1.768l-.138-5.136s-.06-.984-.038-2.484c.049-3.042.395-7.974 1.936-9.482 2.299-2.25 6.259-1.631 6.259-1.631M63.26 24.979c.959 4.479.624 8.932 4.868 9.754 1.01.194 1.68 1.562 1.897 2.767.471 2.64.64 5.326.504 8.005-.17.922.64-1.767.64-1.767l.268-5.142s.04-1.004.016-2.504c-.045-3.042-.391-7.974-1.933-9.482-2.3-2.25-6.26-1.631-6.26-1.631"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#60350A"
                                fillRule="evenodd"
                                d="M41.042 75.206c-2.443-2.358-4.398-4.186-6.172-6.017-2.273-2.347-3.043-4.728-3.485-8.896a179 179 0 0 1-1.688-21.731S31.37 48.809 34.49 53.86c1.602 2.594 8.155-3.503 10.769-4.43a4.34 4.34 0 0 1 5.243 1.265 4.266 4.266 0 0 1 5.199-1.265c2.614.927 9.077 6.136 10.77 4.43 4.07-4.104 4.947-15.285 4.947-15.285-.17 7.353-.78 14.688-1.827 21.968-.588 4.443-.885 6.165-2.405 7.903a49.8 49.8 0 0 1-7.395 6.785c-1.34 1.061-3.668 2.058-9.6 2.022-5.512-.032-7.772-.72-9.149-2.048M64.085 25.885a4.27 4.27 0 0 1 4.466 1.986c2.517 4.228 2.726 4.773 2.726 4.773s-.298-7.563-.477-8.463a1.13 1.13 0 0 1 1.574.046c.178.359-.718-7.606-5.396-9.133-1.71-4.858-7.693-8.456-7.693-8.456l-.27 2.699a9.8 9.8 0 0 0-8.52-6.708c1.08 1.216.82 2.104.82 2.104a13.2 13.2 0 0 0-5.32-1.023c.227 1.439-1.438 2.97-1.438 2.97s-1.034-1.576-5.128-2.115c-.72 2.608-2.071 3.058-3.374 4.273a30.6 30.6 0 0 0-3.011 3.599s.134-2.52 1.034-3.24c.338-.223-7.631 2.918-3.644 14.622a3.175 3.175 0 0 0-3.147 2.366c2.249.629 1.318 4.029 2.577 6.233.885-2.557 1.471-7.538 7.004-6.233 3.96.933 7.763 2.935 12.33 3.095 6.451.225 8.901-3.162 14.887-3.395"
                                clipRule="evenodd"
                              ></path>
                              <path
                                fill="#FFE8BE"
                                fillRule="evenodd"
                                d="M52.451 62.45a4.49 4.49 0 0 0 3.583-.951c1.165-1.343 2.115-3.251.348-4.277a13.9 13.9 0 0 0-5.795-2.382c-2.1.336-4.095 1.15-5.831 2.379-2.169 1.254-.842 2.937.325 4.28a4.5 4.5 0 0 0 3.582.951c-1.312-4.57 5.102-4.57 3.788 0"
                                clipRule="evenodd"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_56_1683">
                                <path fill="#fff" d="M0 0h100v100H0z"></path>
                              </clipPath>
                            </defs>
                          </BaseIcon>
                          <div><strong>{patient.name}</strong></div>
                          <div><strong>MRN:</strong> {patient.mrn}</div>
                          <div>{patient.gender} ● {patient.birthday} ({patient.age})</div>
                        </>
                      }
                    />
                    
                    <Accordion data = {accordionData} />
                  </>
                }
              />
            }
          />
        </>
      }
      />
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default DoctorAppointment;
