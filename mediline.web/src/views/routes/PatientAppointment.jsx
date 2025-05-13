import React, { useRef, useEffect, useState, useContext } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Container, { ItemGroup } from '../../components/General/Container';
import CommonIcon from '../../components/General/CommonIcon';
import EditableUserIcon from '../../components/General/EditableUserIcon';
import Chatbox from '../../components/Dashboard/Chatbox';

import { bookingInfo, patientDashboardData } from '../../assets/js/const';
import AccordionList from '../../components/General/Accordion';
import {doctorAppointmentData, chatlog} from '../../assets/js/const';
import SharedChatBox from '../../components/Dashboard/SharedChatBox';
import { UserContext } from '../../context/UserProvider'

const PatientAppointment = () => {
  const { doctor, checkout, appointments, user } = patientDashboardData;
  const log = chatlog;
  const { meetingTime, treatment } = bookingInfo;
      const { currentUser } = useContext(UserContext);
      console.log(currentUser, currentUser.user_id)

  const mainBody = (
    <ItemGroup
      axis={false}
      fitParent={true}
      customClass="pl-10 pr-5 pt-10 gap-8 item-group-row-even"
      style={{ minHeight: "78vh", maxHeight: "88vh" }}
      items={[
        <>

                              <Chatbox
                                  user={currentUser.user_id}
                                  appointmentId={314}
                                  data={{
                                  patient: { name: "Sandra Jones", id: 124 },
                                  doctor: { name: "Benjamin Hernandez", id: 21 }
                                }}
                              />
  </>
      ]}
      />

  );

  return <Dashboard content={mainBody} />;
};

export default PatientAppointment;