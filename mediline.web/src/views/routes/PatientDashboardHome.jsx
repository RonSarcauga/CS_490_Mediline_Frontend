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
import CommonIcon from '../../components/General/CommonIcon';

import {patientDashboardData} from '../../assets/js/const';
import PatientDashboardViewModel from '../../viewModels/PDViewModel';

const PatientDashboardHome = () => {
  const { data, isLoading, error } = PatientDashboardViewModel.useDashboardData();
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const accordionData = [
    {
      header: (<><CommonIcon name={'person'} />Basic Info</>),
      content: (
        <>
        <ItemGroup
          items={
              <>
                <strong>Last Appointment</strong>
                <div><CommonIcon name={'calendar'} /> {user.lastAppointment.date} <CommonIcon name={'clock'} /> {user.lastAppointment.time}</div>
                <div><CommonIcon name={'doctor'} /> {user.lastAppointment.doctor}</div>
                <strong>Address</strong>
                {data?.address1}, {data?.city}, {data?.state}, {data?.country}, {data?.zipcode}
                <strong>Phone</strong>
                {data?.phone}
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
                    <Container
                      fitParent={true}
                      customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
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
                                            customClass="justify-content-space-between align-items-center"
                                            fitParent={true}
                                            stretch={true}
                                            axis={false}
                                            items={
                                                <>
                                                    <h1>Your Care Team</h1>
                                                    <ItemGroup
                                                        customClass="gap-3"
                                                        axis={false}
                                                        stretch={true}
                                                        items={
                                                            <>
                                                              <ItemGroup
                                                                  customClass="bg-dark-100 br-sm pl-1 py-1"
                                                                  isClickable={true}
                                                                  stretch={true}
                                                                  axis={false}
                                                                  items={
                                                                      <>
                                                                        <h1 className="font-4 font-medium text-neutral-1100 pr-4 pl-4 pt-2 pb-2">
                                                                            Book an Appointment
                                                                        </h1>
                                                                      </>
                                                                  }
                                                              />
                                                            </>
                                                        }
                                                    />
                                                </>
                                            }
                                        />
                                        <ItemGroup
                                            customClass="b-bottom-3 outline-secondary-400"
                                            fitParent={true}
                                            axis={true}
                                        />
                                        <ItemGroup
                                          axis={false}
                                          fitParent={true}
                                          customClass="m-4 justify-content-center col-gap-20"
                                          items={
                                            <>
                                            <RatedIcon rating={doctor.rating} borderColor={doctor.borderColor} />

                                            <ItemGroup
                                              axis={true}
                                              fitParent={true}
                                              customClass="pl-10 gap-10"
                                              items={
                                                <>
                                                <ItemGroup
                                                  axis={false}
                                                  fitParent={true}
                                                  items={
                                                    <>
                                                    <div style={{ minWidth: '200px' }} >
                                                      <strong>Doctor</strong> <br /> {doctor.name}
                                                    </div>

                                                    <div>
                                                      <strong>Status</strong> <StatusLabel status={doctor.status} />
                                                    </div>
                                                    </>
                                                  }
                                                />
                                                <div>
                                                    <strong>Last Appointment:</strong> <br />
                                                    <CommonIcon name="calendar" /> {doctor.lastAppointment.date}{' '}
                                                    <CommonIcon name="clock" /> {doctor.lastAppointment.time}
                                                </div>
                                                </>
                                              }
                                            />
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
                        customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                        headerClass="p-5"
                        header={
                            <>
                              <ItemGroup
                                  customClass="gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={
                                      <>
                                        <h1>Checkout</h1>
                                        <ItemGroup
                                          axis={false}
                                          stretch={true}
                                          fitParent={true}
                                          customClass="justify-center items-center"
                                          items={
                                            <ScrollableTable 
                                                columns={["Appointment", "Doctor", "Treatment", "Total Bill", "Status"]} 
                                                columnKeys={["appointment", "doctor", "treatment", "totalBill", "status"]}
                                                columnTypes = {{appointment:{ type: 'icon', iconName: 'calendar' }, doctor:{ type: 'icon', iconName: 'doctor' }, status:{ type: 'status' }}}
                                                data={checkout}
                                                renderActions={() => <ThreeDotButton />} 
                                            />
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
                      customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                      headerClass="p-5"
                      header={
                          <>
                              <ItemGroup
                                  customClass="gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={
                                      <>
                                        <h1>Upcoming Appointments</h1>
                                        <ItemGroup
                                          customClass="gap-5 justify-items-center"
                                          fitParent={true}
                                          stretch={true}
                                          axis={true}
                                          items={
                                              <>
                                                {appointments.map((a, i) => (
                                                  <AppointmentCard key={i} data={a} />
                                                ))}
                                              </>
                                          }
                                      />
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
              customClass="px-0 pb-10"
              fitParent={true}
              content={
                  <>
                      <Container
                          fitParent={true}
                          customClass="gradient-light br-md b-3 outline-neutral-1100 justify-content-center align-items-space-between pt-10"
                          content={
                              <>
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
                                                <EditableUserIcon />
                                                <div><strong>{data?.first_name} {data?.last_name}</strong></div>
                                                <div><strong>MRN:</strong> {user.mrn}</div>
                                                <div>{user.gender} ● {data?.dob} {/*({user.age})*/}</div>
                                              </>
                                            }
                                          />
                                          
                                          <AccordionList data = {accordionData} />
                                        </>
                                      }
                                  />
                              </>
                          }
                      />
                  </>
              }
          />
        </>
      }
      />
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default PatientDashboardHome;
