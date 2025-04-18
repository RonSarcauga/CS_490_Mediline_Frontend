import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import ScrollableTable from '../../components/General/ScrollableTable';
import ThreeDotButton from '../../components/General/ThreeDotButton';
import Accordion from '../../components/General/Accordion';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
import {pharmaPatData} from '../../assets/js/const';

const PharmacistPatientProfile = () => {

  //any hardcoded data can go here
  const {patient, latestRequests, allPatients} = pharmaPatData;

  const accordionData = [
    {
      header: (<>Latest Requests</>),
      content: (
        <>
          <ScrollableTable 
            columns={[""]} 
            columnKeys={["name"]}
            data={latestRequests}
          />
        </>
      ),
    },
    {
      header: (<>All Patients</>),
      content: (
        <>
          <ScrollableTable 
            columns={[""]} 
            columnKeys={["name"]}
            data={allPatients}
          />
        </>
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
                  <Container
                    fitParent={true}
                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                    headerClass="p-5"
                    header={
                      <ItemGroup
                        customClass="gap-5 align-items-center"
                        fitParent={true}
                        axis={true}
                        items={
                          <>
                            <strong>Personal Information</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <ItemGroup
                              customClass="justify-content-space-between"
                              fitParent={true}
                              stretch={true}
                              axis={false}
                              items={
                                <>
                                <div>
                                  <strong>Name</strong>
                                  <br/>
                                  {patient.name}
                                </div>
                                <div>
                                  <strong>Date of Birth</strong>
                                  <br/>
                                  {patient.dob}
                                </div>
                                <div>
                                  <strong>Height</strong>
                                  <br/>
                                  {patient.height} cm
                                </div>
                                <div>
                                  <strong>Weight</strong>
                                  <br/>
                                  {patient.weight} lbs
                                </div>
                                </>
                              }
                            />
                          </>
                        }
                      />
                    }
                  />
                  <Container
                    fitParent={true}
                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                    headerClass="p-5"
                    header={
                      <ItemGroup
                        customClass="gap-5 align-items-center"
                        fitParent={true}
                        axis={true}
                        items={
                          <>
                            <strong>Contact Information</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <ItemGroup
                              customClass="gap-5"
                              fitParent={true}
                              axis={true}
                              items={
                                <>
                                  <ItemGroup
                                    customClass="col-gap-10"
                                    fitParent={true}
                                    stretch={true}
                                    axis={false}
                                    items={
                                      <>
                                        <div>
                                          <strong>Email</strong>
                                          <br/>
                                          {patient.email}
                                        </div>
                                        <div>
                                          <strong>Phone</strong>
                                          <br/>
                                          {patient.phone}
                                        </div>
                                      </> 
                                    }
                                  />
                                  <div>
                                    <strong>Address</strong>
                                    <br/>
                                    {patient.address}
                                  </div>
                                </>
                              }
                            />
                          </>
                        }
                      />
                    }
                  />
                  <Container
                    fitParent={true}
                    customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                    headerClass="p-5"
                    header={
                      <ItemGroup
                        customClass="gap-5 align-items-center"
                        fitParent={true}
                        axis={true}
                        items={
                          <>
                            <strong>Medication History</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <ItemGroup
                              customClass="col-gap-5"
                              fitParent={true}
                              axis={false}
                              items={
                                <>
                                  <ScrollableTable 
                                    columns={["Medication", "Duration", "Dosage", "Taken Since", "Expires By"]} 
                                    columnKeys={["medication", "duration", "dosage", "since", "expires"]}
                                    data={patient.medHistory}
                                  />
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
                <Accordion data = {accordionData} />
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

export default PharmacistPatientProfile;
