// src/viewModels/DDViewModel.js

import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

//x helper to include JWT on every request
function authHeaders() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    }
  };
}

async function fetchDoctorHomeData(doctorId) {
  //x fire only the endpoints you currently need; others remain commented
  const [patCount, patToday, pendCount, upCount] = await Promise.all([
    axios.get(`/doctor/${doctorId}/doctor-patients`,             authHeaders()),
    axios.get(`/doctor/${doctorId}/patients-today`,              authHeaders()), // might need date passed in
    axios.get(`/doctor/${doctorId}/pending-appointments/count`,  authHeaders()),
    //axios.get(`/doctor/${doctorId}/ratings`,                   authHeaders()),
    axios.get(`/doctor/${doctorId}/upcoming-appointments/count`, authHeaders()),
  ]);

  //x debug all raw responses
  console.log('🩺 fetchDoctorHomeData results:', {
    patientCount:       patCount.data,
    patientsToday:      patToday.data,
    pendingAppointments: pendCount.data,
    upcomingAppointments: upCount.data,
  });

  return {
    patientCount:  patCount.data.doctor_patients_count,
    patientsToday: patToday.data,
    pendingCount:  pendCount.data.pending_appointments_count,
    upcomingCount: upCount.data.upcoming_appointments_count,
    //rating:        ratings.data.average_rating,
    //accepting patients
    //invoices  
  };
}

export const DoctorDashboardViewModel = {
  useDashboardData(doctorId) {
    return useQuery({
      queryKey: ['doctorDashboard', doctorId],
      queryFn:   () => fetchDoctorHomeData(doctorId),
      enabled:   !!doctorId,            // only run when you have an ID
      staleTime: 1000 * 60 * 5,         // 5 minutes
      retry:     1,                     // retry once
    });
  },
};

export default DoctorDashboardViewModel;
