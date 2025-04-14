import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
//import {} from '../../assets/js/const';

const PharmacistHome = () => {

    //any hardcoded data can go here
    //const {} = ;

  const mainBody = (
    <>
    <ItemGroup
      axis={true}
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
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                          headerClass="p-5"
                          header={[
                            <>
                            <strong>Prescription Requests</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <>{/* two circles and 2 labels */}</>
                            </>
                          ]}
                        />
                        <Container
                          fitParent={true}
                          customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
                          headerClass="p-5"
                          header={[
                            <>
                            <strong>Inventory</strong>
                            <ItemGroup
                                customClass="b-bottom-3 outline-secondary-400"
                                fitParent={true}
                                axis={true}
                            />
                            <>{/* medicine list -- scrollable table component should work */}</>
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
              <strong>Prescriptions</strong>
              <>{/* prescriptions list -- scrollable table component should work here too */}</>
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

export default PharmacistHome;
