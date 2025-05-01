
import axios from '../assets/js/api.js';

const patientId = 300; //temp hardcoded

export const fetchExerciseList = async () => {
    const { data } = await axios.get(`/exercise/`);
    console.log('Fetched data:', data);
    return data;
};

export const fetchPatientExerciseList = async () => {
    const { data } = await axios.get(`/exercise/user/${patientId}`);
    console.log('Fetched data:', data);
    return data;
};

export const fetchChartData = async () => {
    const { data } = await axios.get(`/report/user/${patientId}`);
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

export const submitForm = async (formData) => {
    const { data } = await axios.post(`/exercise/`, formData);
    console.log('Submitted data:', data);
    return data;
    
}


