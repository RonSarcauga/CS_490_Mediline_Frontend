import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
//import {} from '../../assets/js/const';

const DoctorAppointment = () => {

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
                                  <strong>Booking Information</strong>
                                  <ItemGroup
                                      customClass="b-bottom-3 outline-secondary-400"
                                      fitParent={true}
                                      axis={true}
                                  />
                                  <>{/* similar cards found elsewhere for example */}</>
                                  </>
                                ]}
                              />
                              <Container
                                fitParent={true}
                                customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                                headerClass="p-5"
                                header={[
                                  <>
                                  <strong>Your Care Rating</strong>
                                  <>{/* use rated icon component */}</>
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
                            temp label - appointment window
                            <>{/* appointment page */}</>
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
            customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
            headerClass="p-5"
            header={[
              <>
              temp label - patient card
              <>{/* copy from patient home */}</>
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

export default DoctorAppointment;
