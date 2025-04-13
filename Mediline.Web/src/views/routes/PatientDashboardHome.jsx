import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import RatedIcon from '../../components/General/RatedIcon';
import ScrollableTable from '../../components/General/ScrollableTable';
import AppointmentCard from '../../components/Dashboard/AppointmentCard';
import ThreeDotButton from '../../components/General/ThreeDotButton';
import EditableUserIcon from '../../components/General/EditableUserIcon';
import StatusLabel from '../../components/General/StatusLabel';
import AccordionList from '../../components/General/Accordion';
import Container, { ItemGroup } from '../../components/General/Container';
import BaseIcon from '../../components/General/BaseIcon';
import CommonIcon from '../../components/General/CommonIcon';

import {patientDashboardData} from '../../assets/js/const';
import '../../assets/scss/components/_patient-dashboard-home.scss';

const PatientDashboardHome = () => {
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const accordionData = [
    {
      header: (<><CommonIcon name={'person'} />Basic Info</>),
      content: (
        <>
        <div><strong>Last Appointment</strong></div>
        <div><CommonIcon name={'calendar'} /> {user.lastAppointment.date}</div>
        <div><CommonIcon name={'clock'} /> {user.lastAppointment.time}</div>
        <div><CommonIcon name={'doctor'} /> {user.lastAppointment.doctor}</div>
        <div><strong>Address</strong></div>
        <div>{user.address}</div>
        <div><strong>Phone</strong></div>
        <div>{user.phone}</div>
        </>
      ),
    },
    {
      header: (<><CommonIcon name={'pill'} />Medications</>),
      content: (
        <>
        {user.medications.length > 0 ? (
          <ul>
            {user.medications.map((medication, index) => (
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
      customClass="pl-10 pr-5 pt-10 gap-8 item-group-row-odd-left"
      style={{
          minHeight: "78vh",
          maxHeight: "88vh"
      }}
      items={[
          <>
            <ItemGroup
              customClass="gap-5"
              fitParent={true}
              axis={true}
              style={{
                  maxHeight: "54.5vh"
              }}
              items={[
                  <>
                    <Container
                      fitParent={true}
                      customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                      headerClass="p-5"
                      header={[
                          <>
                              <ItemGroup
                                  customClass="gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={[
                                      <>
                                        <ItemGroup
                                            customClass="justify-content-space-between align-items-center"
                                            fitParent={true}
                                            stretch={true}
                                            axis={false}
                                            items={[
                                                <>
                                                    <h1>Your Care Team</h1>
                                                    <ItemGroup
                                                        customClass="gap-3"
                                                        axis={false}
                                                        stretch={true}
                                                        items={[
                                                            <>
                                                              <ItemGroup
                                                                  customClass="bg-dark-100 br-sm pl-1 py-1"
                                                                  isClickable={true}
                                                                  stretch={true}
                                                                  axis={false}
                                                                  items={[
                                                                      <>
                                                                        <h1 className="font-4 font-medium text-neutral-1100 pr-4 pl-4 pt-2 pb-2">
                                                                            Book an Appointment
                                                                        </h1>
                                                                      </>
                                                                  ]}
                                                              />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                        <ItemGroup
                                            customClass="b-bottom-3 outline-secondary-400"
                                            fitParent={true}
                                            axis={true}
                                        />
                                        <ItemGroup
                                          axis={false}
                                          fitParent={true}
                                          className="p-4"
                                          items={[
                                            <div key="left" className="p-4">
                                              <RatedIcon rating={doctor.rating} borderColor={doctor.borderColor} />
                                            </div>,

                                            <ItemGroup
                                              key="right"
                                              axis={true}
                                              fitParent={true}
                                              evenSplit={true}
                                              items={[
                                                <ItemGroup
                                                  key="top"
                                                  axis={false}
                                                  fitParent={true}
                                                  items={[
                                                    <div
                                                      key="top-left"
                                                      className="p-4"
                                                      style={{ minWidth: '200px' }}
                                                    >
                                                      <div>
                                                        <strong>Doctor</strong> <br /> {doctor.name}
                                                      </div>
                                                    </div>,

                                                    <div
                                                      key="top-right"
                                                      className="p-4"
                                                    >
                                                      <strong>Status</strong> <StatusLabel status={doctor.status} />
                                                    </div>
                                                  ]}
                                                />,

                                                <div key="bottom" className="flex justify-start items-center p-4">
                                                  <div>
                                                    <strong>Last Appointment:</strong> <br />
                                                    <CommonIcon name="calendar" /> {doctor.lastAppointment.date}{' '}
                                                    <CommonIcon name="clock" /> {doctor.lastAppointment.time}
                                                  </div>
                                                </div>
                                              ]}
                                            />
                                          ]}
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
                      header={[
                          <>
                              <ItemGroup
                                  customClass="gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={[
                                      <>
                                        <ItemGroup
                                            customClass="justify-content-space-between align-items-center"
                                            fitParent={true}
                                            stretch={true}
                                            axis={false}
                                            items={[
                                                <>
                                                    <h1>Checkout</h1>
                                                    
                                                </>
                                            ]}
                                        />
                                        <ItemGroup
                                          axis={false}
                                          stretch={true}
                                          fitParent={true}
                                          customClass="justify-center items-center"
                                          items={[
                                            <ScrollableTable 

                                                columns={["Appointment", "Doctor", "Treatment", "Total Bill", "Status"]} 
                                                columnKeys={["appointment", "doctor", "treatment", "totalBill", "status"]}
                                                columnTypes = {{appointment:{ type: 'icon', iconName: 'calendar' }, doctor:{ type: 'icon', iconName: 'doctor' }, status:{ type: 'status' }}}
                                                data={checkout}
                                                renderActions={() => <ThreeDotButton />} 
                                            />
                                          ]}
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
                      header={[
                          <>
                              <ItemGroup
                                  customClass="gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={[
                                      <>
                                        <ItemGroup
                                            customClass="justify-content-space-between align-items-center gap-30"
                                            fitParent={true}
                                            stretch={true}
                                            axis={false}
                                            items={[
                                                <>
                                                    <h1>Upcoming Appointments</h1>
                                                </>
                                            ]}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                          {appointments.map((a, i) => (
                                            <AppointmentCard key={i} data={a} />
                                          ))}
                                        </div>
                                      </>
                                  ]}
                              />
                          </>
                        ]}
                      />
                  </>
              ]}
          />
              <Container
                  customClass="px-0 pb-10"
                  fitParent={true}
                  content={[
                      <>
                          <Container
                              fitParent={true}
                              customClass="gradient-light br-md b-3 outline-neutral-1100 justify-content-center align-items-center"
                              content={[
                                  <>
                                      <ItemGroup
                                          customClass="gap-10"
                                          axis={true}
                                          fitParent={true}
                                          items={[
                                              <>
                                                  <ItemGroup
                                                      customClass="justify-items-center gap-5"
                                                      axis={true}
                                                      fitParent={true}
                                                      items={[
                                                          <>
                                                              <BaseIcon
                                                                  height="150px"
                                                                  width="150px"
                                                                  fillColor='none'
                                                                  viewBox='0 0 61.7998 61.7998'>
                                                                  <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />
                                                                  <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                  <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                  <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />
                                                                  <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />
                                                                  <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                  <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                  <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                  <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                  <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                  <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                              </BaseIcon>
                                                              <ItemGroup
                                                                  customClass="justify-items-center gap-4"
                                                                  axis={true}
                                                                  items={[
                                                                      <>
                                                                          <ItemGroup
                                                                              customClass="justify-items-center gap-2"
                                                                              axis={true}
                                                                              items={[
                                                                                  <>
                                                                                      <h3 className="font-semibold font-7">USER NAME</h3>
                                                                                      <h3 className="font-regular font-4 text-neutral-700">USER EMAIL</h3>
                                                                                  </>
                                                                              ]}
                                                                          />
                                                                          <Container
                                                                              customClass="bg-dark-100 br px-4 py-2"
                                                                              isClickable={true}
                                                                              content={[
                                                                                  <>
                                                                                      <h3 className="font-semibold font-4 text-neutral-1100">Edit Profile</h3>
                                                                                  </>
                                                                              ]}
                                                                          />
                                                                      </>
                                                                  ]}
                                                              />
                                                          </>
                                                      ]}
                                                  />
                                                  <ItemGroup
                                                      axis={true}
                                                      fitParent={true}
                                                      customClass="bg-neutral-1100 br p-7 gap-5"
                                                      items={[
                                                          <>
                                                              
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
          </>
      ]}
      />
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default PatientDashboardHome;
