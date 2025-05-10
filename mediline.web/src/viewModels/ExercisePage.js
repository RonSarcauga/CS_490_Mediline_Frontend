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
    let chartDataCalorie = new Array(data.length)
    let chartDataHeight = new Array(data.length)
    let chartDataExercise = new Array(data.length)
    let chartDataSleep = new Array(data.length)
    let chartDataWeight = new Array(data.length)
    for(var i = 0; i < data.length; i++) {
        chartDataCalorie[i] = data[i].calories_intake;
        chartDataHeight[i] = data[i].height;
        chartDataExercise[i] = data[i].hours_of_exercise;
        chartDataSleep[i] = data[i].hours_of_sleep;
        chartDataWeight[i] = data[i].weight;
    }
    return {
        calories: chartDataCalorie,
        height: chartDataHeight,
        exercise: chartDataExercise,
        sleep: chartDataSleep,
        weight: chartDataWeight
    };
};

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

export const submitForm = async (formData, patientId) => {
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
                    reps: reps, 
                    patient_id: patientId,
                    doctor_id: doctorId,
                    status: "in_progress"
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



