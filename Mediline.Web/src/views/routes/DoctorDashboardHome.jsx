import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import ScrollableTable from '../../components/General/ScrollableTable';
import ThreeDotButton from '../../components/General/ThreeDotButton';
import StatusLabel from '../../components/General/StatusLabel';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

import {doctorDashboardData} from '../../assets/js/const';
import DoctorDashboardViewModel from '../../viewModels/DDViewModel';

const DoctorDashboardHome = () => {
  const { data, isLoading, error } = DoctorDashboardViewModel.useDashboardData();
  const { patientCount, servingP, appointmentCount, pendingCount, invoices, patientsToday, appointmentsToday} = doctorDashboardData;
  const weekDates = [
    { date: 9, day: "Sun" },
    { date: 10, day: "Mon" },
    { date: 11, day: "Tue" },
    { date: 12, day: "Wed" },
    { date: 13, day: "Thu" },
    { date: 14, day: "Fri" },
    { date: 15, day: "Sat" }
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
                  <ItemGroup
                    customClass="gap-5"
                    fitParent={true}
                    axis={false}
                    items={[
                      <>
                        <Container
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                          headerClass="p-5"
                          header={[
                            <ItemGroup
                              customClass="gap-5 align-items-center"
                              fitParent={true}
                              axis={true}
                              items={[
                                <>
                                  <strong>Total Patients</strong>
                                  <ItemGroup
                                      customClass="b-bottom-3 outline-secondary-400"
                                      fitParent={true}
                                      axis={true}
                                  />
                                  <ItemGroup
                                    customClass="col-gap-5"
                                    fitParent={true}
                                    axis={false}
                                    stretch={true}
                                    items={[
                                      <>
                                        <Container
                                          fitParent={true}
                                          customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                          headerClass="p-5"
                                          header={[
                                            <ItemGroup
                                              customClass="col-gap-5 font-10 font-semibold align-items-center"
                                              fitParent={true}
                                              axis={false}
                                              items={[
                                                <>
                                                  <CommonIcon name='people'></CommonIcon>
                                                  {patientCount}
                                                </>
                                              ]}
                                            />
                                          ]}
                                        />
                                        <Container
                                          fitParent={true}
                                          customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                          headerClass="p-5"
                                          header={[
                                            <ItemGroup
                                              customClass="col-gap-5 font-5 font-light align-items-center"
                                              fitParent={true}
                                              axis={false}
                                              items={[
                                                <>
                                                  {/* checkbox */}
                                                  Serving Patients
                                                </>
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
                          ]}
                        />
                        <Container
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                          headerClass="p-5"
                          header={[
                            <ItemGroup
                              customClass="gap-5"
                              fitParent={true}
                              axis={true}
                              items={[
                                <>
                                  <strong>Upcoming Appointments</strong>
                                  <ItemGroup
                                      customClass="b-bottom-3 outline-secondary-400"
                                      fitParent={true}
                                      axis={true}
                                  />
                                  <ItemGroup
                                    customClass="col-gap-5"
                                    fitParent={true}
                                    stretch={true}
                                    axis={false}
                                    items={[
                                      <>
                                        <Container
                                          fitParent={true}
                                          customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                          headerClass="p-5"
                                          header={[
                                            <ItemGroup
                                              customClass="col-gap-5 font-10 font-semibold align-items-center"
                                              fitParent={true}
                                              axis={false}
                                              items={[
                                                <>
                                                  <CommonIcon name='calendar'></CommonIcon>
                                                  {appointmentCount}
                                                </>
                                              ]}
                                            />
                                          ]}
                                        />
                                        <Container
                                          fitParent={true}
                                          customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                          headerClass="p-5"
                                          header={[
                                            <ItemGroup
                                              customClass="font-5 font-light"
                                              fitParent={true}
                                              axis={true}
                                              items={[
                                                <>
                                                  <Container
                                                    fitParent={true}
                                                    customClass="font-10 font-semibold"
                                                    header={[
                                                      pendingCount
                                                    ]}
                                                  />
                                                  In Pending
                                                </>
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
                      <ItemGroup
                        customClass="gap-5 align-items-center"
                        fitParent={true}
                        axis={true}
                        items={[
                          <>
                            <strong>My Invoices</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <ItemGroup
                              customClass="col-gap-5"
                              stretch={true}
                              fitParent={true}
                              axis={false}
                              items={[
                                <>
                                  <ScrollableTable 
                                    columns={["Status", "Date", "Number", "Name", "Total"]} 
                                    columnKeys={["status", "date", "number", "name", "total"]}
                                    columnTypes = {{status:{ type: 'status'}, date:{ type: 'icon', iconName: 'calendar' }, name:{ type: 'icon', iconName: 'person' }}}
                                    data={invoices}
                                    renderActions={() => <ThreeDotButton />} 
                                  />
                                </>
                              ]}
                            />
                          </>
                        ]}
                      />
                    ]}
                  />
                  <Container
                    fitParent={true}
                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                    headerClass="p-5"
                    header={[
                      <ItemGroup
                        customClass="gap-5"
                        fitParent={true}
                        axis={true}
                        items={[
                          <>
                            <strong>My Schedule</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <ItemGroup
                              customClass="col-gap-5 justify-content-center"
                              fitParent={true}
                              axis={false}
                              items={[
                                <>
                                {/* schedule */}
                                <ItemGroup
                                  customClass="col-gap-5"
                                  fitParent={true}
                                  stretch={true}
                                  axis={false}
                                  items={weekDates.map(({ date, day }, idx) => (
                                    <Container
                                      key={idx}
                                      customClass="p-5 br-sm bg-neutral-1100 font-5"
                                      content={[
                                        <ItemGroup
                                          key={`${day}-${date}`}
                                          axis={true}
                                          customClass="align-items-center text-center"
                                          items={[
                                            <div className="font-bold text-xl">{date}</div>,
                                            <div className="text-sm text-neutral-700">{day}</div>
                                          ]}
                                        />
                                      ]}
                                    />
                                  ))}
                                />

                                </>
                              ]}
                            />
                          </>
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
            header={[
              <ItemGroup
                customClass="gap-5 align-items-center"
                fitParent={true}
                axis={true}
                items={[
                  <>
                    <strong>Your Patients Today</strong>
                    <ItemGroup
                        customClass="b-bottom-3 outline-secondary-400"
                        fitParent={true}
                        axis={true}
                    />
                    <ItemGroup
                      customClass="col-gap-5"
                      fitParent={true}
                      axis={false}
                      items={[
                        <>
                        {/* patient list */}
                        <>
                                  <ScrollableTable 
                                    style = {{maxHeight: "750px", minHeight: "750px"}}
                                    columns={["Time", "Name"]} 
                                    columnKeys={["time", "name"]}
                                    data={patientsToday}
                                  />
                                </>
                        </>
                      ]}
                    />
                  </>
                ]}
              />
            ]}
          />
        </>
      ]}
      />
    </>
  );
  return <Dashboard content = {mainBody} />;
};

export default DoctorDashboardHome;
