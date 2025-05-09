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
    const [allPat, pendCount, upCount] = await Promise.all([
        axios.get(`/doctor/${doctorId}/doctor-patients`, authHeaders()),
        axios.get(`/doctor/${doctorId}/pending-appointments/count`, authHeaders()),
        axios.get(`/doctor/${doctorId}/upcoming-appointments/count`, authHeaders()),
        //accepting patients
    ]);
    return {
        allPatients: allPat.data,
        pendingCount: pendCount.data.pending_appointments_count,
        upcomingCount: upCount.data.upcoming_appointments_count,
        //accepting patients
    };
}

async function fetchDoctorPatientData(patientId) {
    const [patInfo, nextApp] = await Promise.all([
        axios.get(`/patient/${patientId}/info`, authHeaders()),
        axios.get(`/appointment/upcoming/${patientId}`, authHeaders()),
    ]);
    
    console.log('fetchDoctorPatientData results:', {
        patientInfo: patInfo.data,
        nextAppointment: nextApp.data,
    });
    
    return {
        patientInfo: patInfo.data,
        nextAppointment: nextApp.data,
    };
}

export const DoctorDashboardViewModel = {
    useDoctorHome(doctorId) {
        return useQuery({
            queryKey: ['doctorDashboard', doctorId],
            queryFn:   () => fetchDoctorHomeData(doctorId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!doctorId,
        });
    },
    useDoctorPatient(patientId) {
        return useQuery({
            queryKey: ['doctorPatient', patientId],
            queryFn:   () => fetchDoctorPatientData(patientId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!patientId,
        });
    },
    usePatientsByDate(doctorId, date) {
        return useQuery({
            queryKey: ['patientsByDate', doctorId, date],
            queryFn: () =>
                axios.get(`/doctor/${doctorId}/patients-today`, {
                    ...authHeaders(),
                    params: { date },
                }).then(res => res.data),
            enabled: !!doctorId && !!date,
            staleTime: 0,
        });
    },
};

export default DoctorDashboardViewModel;
