import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';
import { dashboardLayoutViewModel } from './DashboardLayoutViewModel';

function authHeaders() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    }
  };
}

async function fetchPharmaHomeData(pharmaId) {
    const [count, inventory, requests] = await Promise.all([
        axios.get(`/prescription/pharmacy/${pharmaId}/count`, authHeaders()),
        axios.get(`/prescription/pharmacy/${pharmaId}/inventory`, authHeaders()),
        axios.get(`/pharmacy/${pharmaId}/requests`, authHeaders()),
    ]);

    return {
        countRx: count.data,
        inventoryStock: inventory.data,
        requestCount: Array.isArray(requests.data) ? requests.data.length : 0,
    };
}


async function fetchPharmacyPatientsRequests(pharmaId) {
    try {
        const response = await axios.get(`/pharmacy/${pharmaId}/patients`, authHeaders());
        const data = response.data;
        
        const unifiedPatients = [
        ...(data.new_patients || []),
        ...(data.other_patients || [])
        ];

        const enrichedRequests = await fetchPharmacyRequests(pharmaId);

        return {
            patients: unifiedPatients,
            requests: enrichedRequests
        };

    } catch (err) {
        console.error("Error fetching pharmacy patients or requests:", err);
        throw err;
    }
}

async function fetchPharmacyRequests(pharmaId) {
    try {
        const res = await axios.get(`/pharmacy/${pharmaId}/requests`, authHeaders());
        const requests = res.data;

        const patIds = [...new Set(requests.map(r => r.notification_content.patient_id))];

        const patPromises = patIds.map(async (patId) => {
            const userRes = await axios.get(`/user/${patId}`, authHeaders());
            return { patId, user: userRes.data };
        });

        const pats = await Promise.all(patPromises);

        const patMap = new Map();
        pats.forEach(({ patId, user }) => {
            patMap.set(patId, user);
        });

        const enrichedRequests = requests.map(request => {
            const patId = request.notification_content.patient_id;
            const pat = patMap.get(patId);
            return {
                ...request,
                patient_name: pat ? `${pat.first_name} ${pat.last_name}` : "Unknown"
            };
        });

        return enrichedRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));;
    } catch (err) {
        console.error("Error fetching full request data:", err);
        throw err;
    }
}


async function fetchPharmacyPatients(pharmaId) {
    try {
        const response = await axios.get(`/pharmacy/${pharmaId}/patients`, authHeaders());

        const data = response.data;

        const unifiedPatients = [
            ...(data.new_patients || []),
            ...(data.other_patients || [])
        ];

        return unifiedPatients;
    } catch (err) {
        console.error("Error fetching pharmacy patients:", err);
        throw err;
    }
}

async function fetchMedicationslist(pharmaId) {
    try {
        const patients = await fetchPharmacyPatients(pharmaId);


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
                        .filter(entry => dashboardLayoutViewModel.isPrescriptionActive(entry.taken_date, entry.duration))
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
        })) .sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate));
        
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

async function handleRequest(pharmaId, reqID, stat) {
    try {
        const response = await axios.delete(
            `/pharmacy/${pharmaId}/requests`,
            {
                headers: authHeaders().headers,
                data: {
                    notification_id: reqID,
                    status: stat
                }
            }
        );
        console.log(response)
        return response.data;
    } catch (err) {
        console.error("Error handling request:", err);
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
            queryFn: () => fetchPharmacyPatientsRequests(pharmaId),
            enabled: !!pharmaId,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        });
    },
    handleRequest,
};

export default PharmacyDashboardViewModel;