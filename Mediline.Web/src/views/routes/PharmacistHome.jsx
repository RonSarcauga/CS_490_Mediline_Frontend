import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import ScrollableTable from '../../components/General/ScrollableTable';
import ThreeDotButton from '../../components/General/ThreeDotButton';
import StatusLabel from '../../components/General/StatusLabel';
import CommonIcon from '../../components/General/CommonIcon';

//import hardcoded data if needed
//import {} from '../../assets/js/const';
import {PharmaHomeData} from '../../assets/js/const';

const PharmacistHome = () => {

    //any hardcoded data can go here
    //const {} = ;
    const {requests, inventory, prescriptions} = PharmaHomeData;

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
                    axis={false}
                    items={
                      <>
                        <ItemGroup
                            stretch={true}
                            axis={false}
                            items={
                              <Container
                                fitParent={true}
                                stretch={true}
                                customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                                headerClass="p-5"
                                header={
                                  <ItemGroup
                                    customClass="gap-5"
                                    fitParent={true}
                                    axis={false}
                                    items={
                                      <>
                                        <strong>Prescription Requests</strong>
                                        <ItemGroup
                                            customClass="b-bottom-3 outline-secondary-400"
                                            fitParent={true}
                                            axis={true}
                                        />
                                        <>{/* two circles and 2 labels */}</>
                                        </>
                                    }
                                  />
                                }
                              />
                            }
                          />
                        <ItemGroup
                          stretch={true}
                          axis={false}
                          items={
                            <Container
                              customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100"
                              headerClass="p-5"
                              header={
                                <ItemGroup
                                  customClass="gap-5 justify-items-center"
                                  fitParent={true}
                                  stretch={true}
                                  axis={true}
                                  items={
                                    <>
                                      <strong>Inventory</strong>
                                      <ItemGroup
                                          customClass="b-bottom-3 outline-secondary-400"
                                          fitParent={true}
                                          axis={true}
                                      />
                                      <ScrollableTable 
                                        columns={["Medication", "Expires By", "Stock"]} 
                                        columnKeys={["medication", "expires", "stock"]}
                                        columnTypes = {{medication:{ type: 'icon', iconName: 'pill' }, expires:{ type: 'icon', iconName: 'calendar' }}}
                                        data={inventory}
                                        renderActions={() => <ThreeDotButton />} 
                                      />
                                    </>
                                  }
                                />
                              }
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
            customClass="gradient-light br-top-md b-left-3 b-right-3 b-top-3 outline-neutral-1100 "
            headerClass="p-5"
            header={
              <>
              <strong>Prescriptions</strong>
              <>
                <ScrollableTable 
                  columns={["Patient", "Doctor", "Medication", "Duration", "Dosage", "Total Bill", "Status"]} 
                  columnKeys={["patient", "doctor", "medication", "duration", "dosage", "bill", "status"]}
                  columnTypes = {{status:{ type: 'status'}, patient:{ type: 'icon', iconName: 'person' }, doctor:{ type: 'icon', iconName: 'doctor' }, dosage:{ type: 'icon', iconName: 'pill' }, duration:{ type: 'icon', iconName: 'clock' }, medication:{ type: 'icon', iconName: 'form' }}}
                  data={prescriptions}
                  renderActions={() => <ThreeDotButton />} 
                />
              </>
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

export default PharmacistHome;
