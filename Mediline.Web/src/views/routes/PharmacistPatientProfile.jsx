import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import ScrollableTable from '../../components/General/ScrollableTable';
import ThreeDotButton from '../../components/General/ThreeDotButton';
import Accordion from '../../components/General/Accordion';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
//import {} from '../../assets/js/const';

const PharmacistPatientProfile = () => {

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
                              customClass="col-gap-5"
                              fitParent={true}
                              axis={false}
                              items={
                                <>
                                {/* info of patient -- could maybe reuse card from doctor patient profile? */}
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
                              customClass="col-gap-5"
                              fitParent={true}
                              axis={false}
                              items={
                                <>
                                {/* similar cards exist */}
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
                                {/* scrollable list maybe */}
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
              temp label - patient list
              <>{/* accordion -- maybe also scrollable table */}</>
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
