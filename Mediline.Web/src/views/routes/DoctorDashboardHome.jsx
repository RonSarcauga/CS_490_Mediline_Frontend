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

//import hardcoded data if needed
//import {} from '../../assets/js/const';

const DoctorDashboardHome = () => {

    //any hardcoded data can go here
    //const {} = ;

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
                                    items={[
                                      <>
                                      <Container
                                        fitParent={true}
                                        customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                        headerClass="p-5"
                                        header={[
                                          <>
                                          {/* patient symbols and count */}
                                          </>
                                        ]}
                                      />
                                      <Container
                                        fitParent={true}
                                        customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                        headerClass="p-5"
                                        header={[
                                          <>
                                          {/* serving patient status */}
                                          </>
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
                              customClass="gap-5 align-items-center"
                              fitParent={true}
                              axis={true}
                              items={[
                                <>
                                  <strong>Accepting Patients</strong>
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
                                      <Container
                                        fitParent={true}
                                        customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                        headerClass="p-5"
                                        header={[
                                          <>
                                          {/* appointment count */}
                                          </>
                                        ]}
                                      />
                                      <Container
                                        fitParent={true}
                                        customClass="br-sm bg-neutral-1100 outline-neutral-100"
                                        headerClass="p-5"
                                        header={[
                                          <>
                                          {/* pending count */}
                                          </>
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
                              fitParent={true}
                              axis={false}
                              items={[
                                <>
                                {/* invoices -- use scrollable table*/}
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
                        customClass="gap-5 align-items-center"
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
                              customClass="col-gap-5"
                              fitParent={true}
                              axis={false}
                              items={[
                                <>
                                {/* schedule */}
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
