import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

const patientId = 534; //temp hardcoded

const fetchPatientDashboardData = async () => {
    const { data } = await axios.get(`/patient/${patientId}/info`);
    console.log('Fetched data:', data);
    return data;
};

const PatientDashboardViewModel = {
    useDashboardData: function () {
            return useQuery({
                queryKey: ['patientDashboard', patientId],
                queryFn: fetchPatientDashboardData
            })
        },
};

export default PatientDashboardViewModel;
