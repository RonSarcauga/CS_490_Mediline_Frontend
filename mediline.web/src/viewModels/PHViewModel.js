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
        axios.get(`/prescription/pharmacy/${pharmaId}/inventory`, authHeaders()),
    ]);
    return {
        countRx: count.data,
        inventoryStock: inventory.data,
    };
}

async function fetchPharmacyPatients(pharmaId) {
    try {
        const response = await axios.get(`/pharmacy/${pharmaId}/patients`, authHeaders());
        return response.data;
    } catch (err) {
        console.error("Error fetching pharmacy patients:", err);
        throw err;
    }
}

function isPrescriptionActive(takenDateStr, duration) {
  if (!takenDateStr || typeof duration !== 'number') return false;

  const start = new Date(takenDateStr);
  const end = new Date(start);
  end.setDate(start.getDate() + duration);

  const now = new Date();
  return now >= start && now <= end;
}

async function fetchMedicationslist(pharmaId) {
    try {
        const patientsRes = await fetchPharmacyPatients(pharmaId);
        const patients = [
            ...(patientsRes.new_patients || []),
            ...(patientsRes.other_patients || [])
        ];

        const allMeds = await Promise.all(
            patients.map(async (pat) => {
                try {
                    const [historyRes, userRes] = await Promise.all([
                        axios.get(`/prescription/patient/${pat.patient_id}/history`, authHeaders()),
                        axios.get(`/user/${pat.patient_id}`, authHeaders())
                    ]);

                    const history = (historyRes.data || []).flat();
                    const userData = userRes.data;

                    const doctorName = userData?.doctor.first_name+" "+userData?.doctor.last_name || "Unknown";

                    return history
                        .filter(entry => isPrescriptionActive(entry.taken_date, entry.duration))
                        .map(entry => ({
                            medication: entry.medication_name,
                            dosage: entry.dosage,
                            patientName: pat.patient_name,
                            startDate: entry.taken_date,
                            duration: entry.duration,
                            status: entry.status,
                            doctorName: doctorName,
                        }));
                } catch (err) {
                    console.error(`Error processing patient ${pat.patient_id}:`, err);
                    return [];
                }
            })
        );

        return allMeds.flat().sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } catch (err) {
        console.error("Error fetching full medication data:", err);
        throw err;
    }
}


async function fetchPatientOverview(patientId, pharmaId) {
    try {
        const [userRes, medsRes] = await Promise.all([
            axios.get(`/user/${patientId}`, authHeaders()),
            axios.get(`/prescription/patient/${patientId}/history`, authHeaders()),
        ]);

        const user = userRes.data;

        let reportData = null;
        if (user.pharmacy_id === pharmaId) {
            try {
                const reportRes = await axios.get(`/report/user/${patientId}/latest`, authHeaders());
                reportData = reportRes.data;
            } catch (err) {
                console.warn("Failed to fetch latest report:", err);
            }
        }

        const {
            first_name,
            last_name,
            dob,
            phone,
            address1,
            city,
            state,
            zipcode,
            email
        } = user;
        
        const medHistory = (medsRes.data || [])
        .flat()
        .map(med => ({
            medication: med.name,
            dosage: med.dosage,
            duration: med.duration,
            takenDate: med.taken_date,
        }));

                console.log("medHistory:", medHistory);
        
        return {
            name: `${first_name} ${last_name}`,
            dob,
            phone,
            address: address1,
            city,
            state,
            zipcode,
            email,
            height: reportData?.height ?? null,
            weight: reportData?.weight ?? null,
            medications: medHistory
        };
    } catch (err) {
        console.error("Error fetching patient overview:", err);
        throw err;
    }
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
    fetchMedicationslist,
    usePatientOverview(patientId, pharmaId) {
        return useQuery({
            queryKey: ['pharmaPatient', patientId],
            queryFn:   () => fetchPatientOverview(patientId, pharmaId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!patientId && !!pharmaId
        });
    },
    usePharmacyPatients(pharmaId) {
        return useQuery({
            queryKey: ['pharmacyPatients', pharmaId],
            queryFn: () => fetchPharmacyPatients(pharmaId),
            enabled: !!pharmaId,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        });
    }
};

export default PharmacyDashboardViewModel;