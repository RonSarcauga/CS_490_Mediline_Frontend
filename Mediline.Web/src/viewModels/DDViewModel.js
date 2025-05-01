import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

const doctorId = 535; //temp hardcoded

const fetchDoctorDashboardData = async () => {
    const { data } = await axios.get(`/doctor/${doctorId}`);
    console.log('Fetched data:', data);
    return data;
}; 

const DoctorDashboardViewModel = {
    useDashboardData: function () {
        return useQuery({
            queryKey: ['doctorDashboard', doctorId],
            queryFn: fetchDoctorDashboardData
        })
    },
};

export default DoctorDashboardViewModel;
