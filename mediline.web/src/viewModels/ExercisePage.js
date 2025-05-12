import axios from '../assets/js/api.js';



export const fetchExerciseList = async () => {
    const { data } = await axios.get(`/exercise/`);
    console.log('Fetched exercises:', data);
    return data;
};

export const fetchPatientExerciseList = async (patientId) => {
    const { data } = await axios.get(`/exercise/user/${patientId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });
    console.log('Fetched data:', data);
    return data;
};

export const fetchChartData = async (patientId) => {
    const { data } = await axios.get(`/report/user/${patientId}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });
    console.log('Fetched data:', data);

    let chartDataCalorie = [];
    let chartDataHeight = [];
    let chartDataExercise = [];
    let chartDataSleep = [];
    let chartDataWeight = [];
    let chartDataDates = [];
    let chartDataDays = [];

    for (let i = 0; i < data.length; i++) {
        chartDataCalorie.push(data[i].calories_intake);
        chartDataHeight.push(data[i].height);
        chartDataExercise.push(data[i].hours_of_exercise);
        chartDataSleep.push(data[i].hours_of_sleep);
        chartDataWeight.push(data[i].weight);

        // Assuming data[i].created_at or data[i].date is the submission date
        const dateStr = data[i].created_at;
        chartDataDates.push(dateStr);

        // Convert to day of week label
        const dayLabel = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }) : '';
        chartDataDays.push(dayLabel);
    }

    return {
        calories: chartDataCalorie,
        height: chartDataHeight,
        exercise: chartDataExercise,
        sleep: chartDataSleep,
        weight: chartDataWeight,
        days: chartDataDays, // <-- Pass this to your chart
        dates: chartDataDates
    };
};
/*
export const fetchMedicationList = async (patientId) => {
    const { data } = await axios.get(`/prescription/user/${patientId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });
    const medications = [];

    for (let i = 0; i < data.length; i++) {
        const medId = data[i].prescription_id;
        const prescriptionData = await fetchPrescriptionList(medId);

        for (let j = 0; j < prescriptionData.name.length; j++) {
            medications.push({
                name: prescriptionData.name[j],
                dosage: prescriptionData.dosage[j],
            });
        }
    }
    console.log('Fetched medications:', medications);

    return medications; // Return an array of objects
};

const fetchPrescriptionList = async (medId = 0) => {
    const { data } = await axios.get(`/prescription/${medId}/medications`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    console.log('Fetched data:', data);
    let medList = new Array(data.length)
    let doseList = new Array(data.length)
    for(var i = 0; i < data.length; i++) {
        medList[i] = data[i].name;
        doseList[i] = data[i].dosage;
    }

    return {
        name:medList,
        dosage:doseList
    };
};
*/
export const submitForm = async (formData, patientId, doctorId) => {
    try {
        const response = await axios.post(`/report/user/${patientId}`, {
            calories_intake: Number(formData.calories),
            doctor_id: doctorId,
            height: Number(formData.height),
            hours_of_exercise: Number(formData.exercise),
            hours_of_sleep: Number(formData.sleep),
            report_id: 1,
            weight: Number(formData.weight),
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }); 
        console.log('Form submitted successfully:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error; 
    }
};

export const submitExercise = async (exerciseData, patientId, doctorId) => {
    try {

        console.log('Exercise data:', exerciseData);

        const exercises = Object.entries(exerciseData);

        const responses = await Promise.all(
            exercises.map(async ([exerciseId, reps]) => {
                const response = await axios.post(`/exercise/${exerciseId}`, {
                    reps: reps.toString(), 
                    patient_id: Number(patientId),
                    doctor_id: Number(doctorId),
                    status: "IN_PROGRESS"
                } , {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                });
                console.log(`Exercise ${exerciseId} submitted successfully:`, response.data);
                return response.data;
            })
        );

        console.log('All exercises submitted successfully:', responses);
        return responses;
    } catch (error) {
        console.error('Error submitting exercise data:', error);
        throw error;
    }
};

export const updateExerciseStatus = async (exerciseId, status, reps) => {
    try {
        const response = await axios.put(`/exercise/${exerciseId}`, {
            status: status,
            reps: reps
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });
        console.log(`Exercise ${exerciseId} status updated to ${status}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating status for exercise ${exerciseId}:`, error);
        throw error;
    }
};

export const fetchMedicationList = async (patientId) => {
    try{
        const { data } = await axios.get(`/prescription/patient/${patientId}/history`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
    });
    let medList = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            medList.push({
                ...data[i][j],
            });
        }
    }
    console.log('Fetched medications:', medList);
    return medList;
    }catch (error) {
        console.error('Error fetching new medication list:', error);
        throw error;
    }
}