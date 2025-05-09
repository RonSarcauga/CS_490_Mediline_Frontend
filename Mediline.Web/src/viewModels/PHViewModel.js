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

async function fetchPharmaHomeData(pharmaId) {
    const [count, inventory] = await Promise.all([
        axios.get(`/prescription/pharmacy/${pharmaId}/count`, authHeaders()),
        //axios.get(`/prescription/pharmacy/${pharmaId}/inventory`, authHeaders()),
    ]);
    return {
        countRx: count.data,
        //inventoryStock: inventory.data,
    };
}

async function fetchMedicationslist(pharmaId) {
    try {
        const patientsRes = await axios.get(`/pharmacy/${pharmaId}/patients`, authHeaders());
        const patients = patientsRes.data;
    
        const allPrescriptions = await Promise.all(
            patients.map(async (pat) => {
            const res = await axios.get(`/prescription/user/${pat.patient_id}`, authHeaders());
            const prescriptions = res.data;
            return prescriptions.map((presc) => ({
                ...presc,
            }));
            })
        );
    
        const flatPrescriptions = allPrescriptions.flat();
    
        const allMeds = await Promise.all(
            flatPrescriptions.map(async (presc) => {
            const res = await axios.get(`/prescription/${presc.prescription_id}/medications`, authHeaders());
            const meds = res.data;
    
            return meds.map((med) => ({
                //...med,
                medication: med.name,
                dosage: med.dosage,
                patientName: presc.patient_name,
                doctorName: presc.doctor_name,
                status: presc.status,
                date: presc.created_at,
            }));
            })
        );
  
        return allMeds.flat();
    } catch (err) {
        console.error("Error fetching full medication data:", err);
        throw err;
    }
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

export const PharmacyDashboardViewModel = {
    usePharmaHome(pharmaId) {
        return useQuery({
            queryKey: ['pharmaDashboard', pharmaId],
            queryFn:   () => fetchPharmaHomeData(pharmaId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!pharmaId,
        });
    },
    useDoctorPatient(patientId) {
        return useQuery({
            queryKey: ['pharmaPatient', patientId],
            queryFn:   () => fetchDoctorPatientData(patientId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!patientId,
        });
    },
    fetchMedicationslist,
};

export default PharmacyDashboardViewModel;