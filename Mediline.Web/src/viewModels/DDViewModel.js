import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

async function fetchDoctorHomeData(doctorId) {
    const [patCount, patToday, pendCount, ratings, upCount] = await Promise.all([
      axios.get(`/doctor/${doctorId}/doctor-patients/count`),
      axios.get(`/doctor/${doctorId}/patients-today`),
      axios.get(`/doctor/${doctorId}/pending-appointments/count`),
      //axios.get(`/doctor/${doctorId}/ratings`),
      axios.get(`/doctor/${doctorId}/upcoming-appointments/count`),
    ]);
  
    return {
        patientCount: patCount.data.total_patients,
        patientsToday: patToday.data,
        pendingCount: pendCount.data.pending_appointments_count,
        //rating: ratings.data.average_rating,
        upcomingCount: upCount.data.upcoming_appointments_count,
        //accepting patients
        //invoices  
    };
}

export const DoctorDashboardViewModel = {
    useDashboardData(doctorId) {
        return useQuery({
            queryKey: ['doctorDashboard', doctorId],
            queryFn: () => fetchDoctorHomeData(doctorId),
        });
    },
};
export default DoctorDashboardViewModel;
