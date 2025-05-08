import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

function authHeaders() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    }
  };
}

async function fetchDoctorHomeData(doctorId) {
  const [allPat, patToday, pendCount, upCount] = await Promise.all([
    axios.get(`/doctor/${doctorId}/doctor-patients`,             authHeaders()),
    axios.get(`/doctor/${doctorId}/patients-today`,              authHeaders()), // might need date passed in
    axios.get(`/doctor/${doctorId}/pending-appointments/count`,  authHeaders()),
    //axios.get(`/doctor/${doctorId}/ratings`,                   authHeaders()),
    axios.get(`/doctor/${doctorId}/upcoming-appointments/count`, authHeaders()),
  ]);

  console.log('fetchDoctorHomeData results:', {
    allPatients:       allPat.data,
    patientsToday:      patToday.data,
    pendingAppointments: pendCount.data,
    upcomingAppointments: upCount.data,
  });

  return {
    allPatients:  allPat.data,
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
      enabled:   !!doctorId,
      staleTime: 1000 * 60 * 5,
      retry:     1,
    });
  },
};

export default DoctorDashboardViewModel;
