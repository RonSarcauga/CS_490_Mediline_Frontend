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

/*async function fetchActiveMedications(pharmaId) {
  try {
    const patientsRes = await fetchPharmacyPatients(pharmaId);
    const patients = [
      ...(patientsRes.new_patients || []),
      ...(patientsRes.other_patients || [])
    ];

    const allMedications = await Promise.all(
      patients.map(async (pat) => {
        try {
          const res = await axios.get(`/prescription/user/${pat.patient_id}`, authHeaders());
          const history = res.data;

          // Filter and format active prescriptions
          return history
            .filter(entry => isPrescriptionActive(entry.taken_date, entry.duration))
            .map(entry => ({
              medication: entry.medication_name,
              dosage: entry.dosage,
              patientName: pat.name || `${pat.first_name} ${pat.last_name}`,
              startDate: entry.taken_date,
              duration: entry.duration,
              instructions: entry.medical_instructions,
              isActive: true
            }));
        } catch (err) {
          console.error(`Error fetching history for patient ${pat.id}:`, err);
          return []; // fallback: skip this patient
        }
      })
    );

    return allMedications.flat(); // flatten all patient meds
  } catch (err) {
    console.error("Error fetching active medications:", err);
    throw err;
  }
}*/


async function fetchMedicationslist(pharmaId) {
    try {
        const patientsRes = await fetchPharmacyPatients(pharmaId);
        const patients = [...patientsRes.new_patients, ...patientsRes.other_patients];       

        const allMeds = await Promise.all(
            patients.map(async (pat) => {
                console.log("pat",pat)
                try {
                    const res = await axios.get(`/prescription/patient/${pat.patient_id}/history`, authHeaders());
                    const history = res.data;
                    console.log("hist",history)
                    // Filter and format active prescriptions
                    return history
                        .filter(entry => isPrescriptionActive(entry.taken_date, entry.duration))
                        .map(entry => ({
                            medication: entry.medication_name,
                            dosage: entry.dosage,
                            patientName: pat.patient_name,
                            doctorName: pat.doctor_name,
                            startDate: entry.taken_date,
                            duration: entry.duration,
                            isActive: true
                        }));
                } catch (err) {
                    console.error(`Error fetching history for patient ${pat.patient_id}:`, err);
                    return []; // fallback: skip this patient
                }
            })
        );
  
        return allMeds.flat();
    } catch (err) {
        console.error("Error fetching full medication data:", err);
        throw err;
    }
}

async function fetchPatientOverview(patientId) {
    try {
        const [/*reportRes,*/ userRes, medsRes] = await Promise.all([
            /*axios.get(`/report/user/${patientId}`, {
                ...authHeaders(),
                params: {
                sort_by: 'created_at',
                order_by: 'desc',
                    },
            }),*/
            axios.get(`/user/${patientId}`, authHeaders()),
            axios.get(`/prescription/patient/${patientId}/history`, authHeaders()),
        ]);

        //const reports = reportRes.data;
        const user = userRes.data;

        /*const latestReport = Array.isArray(reports) && reports.length > 0 ? reports[0] : {};
        const {
            height = null,
            weight = null
        } = latestReport;*/

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
        
        console.log("medsRes.data:", medsRes.data);

        const medHistory = medsRes.data?.map(med => ({
           medication: med.name,
           dosage: med.dosage,
           //duration: med.duration,
           //takenDate: med.taken_date
         })) || [];

        return {
            name: `${first_name} ${last_name}`,
            dob,
            phone,
            address: address1,
            city,
            state,
            zipcode,
            email,
            //height,
            //weight,
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
    usePatientOverview(patientId) {
        return useQuery({
            queryKey: ['pharmaPatient', patientId],
            queryFn:   () => fetchPatientOverview(patientId),
            staleTime: 1000 * 60 * 5,
            retry:     1,
            enabled: !!patientId
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