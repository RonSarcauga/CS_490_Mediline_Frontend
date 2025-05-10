import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
//import {} from '../../assets/js/const';

const DoctorPatientProfile = () => {

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
                    axis={true}
                    items={[
                      <>
                        <Container
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                          headerClass="p-5"
                          header={[
                            <>
                            temp label - patient profile card
                            <>{/* patient profile card -- look at appointment card for similarity */}</>
                            </>
                          ]}
                        />
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
                                  <>
                                  <strong>Body Mass Index</strong>
                                  <ItemGroup
                                      customClass="b-bottom-3 outline-secondary-400"
                                      fitParent={true}
                                      axis={true}
                                  />
                                  <>{/* patient profile card -- look at appointment card for similarity */}</>
                                  </>
                                ]}
                              />
                              <ItemGroup
                                customClass="gap-5"
                                fitParent={true}
                                axis={true}
                                items={[
                                  <>
                                    <Container
                                      fitParent={true}
                                      customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                                      headerClass="p-5"
                                      header={[
                                        <>
                                        temp label - heart rate
                                        </>
                                      ]}
                                    />
                                    <Container
                                      fitParent={true}
                                      customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                                      headerClass="p-5"
                                      header={[
                                        <>
                                        temp label - calories
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
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                          headerClass="p-5"
                          header={[
                            <>
                              <strong>Patient Progress</strong>
                              <ItemGroup
                                  customClass="b-bottom-3 outline-secondary-400"
                                  fitParent={true}
                                  axis={true}
                              />
                              <>{/* graph -- same as patient */}</>
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
            customClass="gap-5"
            fitParent={true}
            axis={true}
            items={[
              <>
                <Container
                  fitParent={true}
                  customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                  headerClass="p-5"
                  header={[
                    <>
                    <strong>Daily Tasks</strong>
                    <ItemGroup
                        customClass="b-bottom-3 outline-secondary-400"
                        fitParent={true}
                        axis={true}
                    />
                    <>{/* daily tasks -- similar to patient view -- need way to assign? */}</>
                    </>
                  ]}
                />
                <Container
                  fitParent={true}
                  customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                  headerClass="p-5"
                  header={[
                    <>
                    <strong>Present Medication</strong>
                    <ItemGroup
                        customClass="b-bottom-3 outline-secondary-400"
                        fitParent={true}
                        axis={true}
                    />
                    <>{/* present medication -- similar to patient view -- need way to assign? */}</>
                    </>
                  ]}
                />
                <Container
                  fitParent={true}
                  customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                  headerClass="p-5"
                  header={[
                    <>
                    <strong>Notes</strong>
                    <ItemGroup
                        customClass="b-bottom-3 outline-secondary-400"
                        fitParent={true}
                        axis={true}
                    />
                    <>{/* notes -- similar to patient view -- need way to assign?  */}</>
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

export default DoctorPatientProfile;
