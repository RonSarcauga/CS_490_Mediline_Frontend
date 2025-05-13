import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar, { CustomTextArea } from '../../components/General/InputBar';
import Checkbox from '../../components/General/CheckboxRefactored';
import Modal from '../../components/General/Modal';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import { fetchPatientExerciseList, fetchExerciseList, fetchChartData, fetchMedicationList, submitForm, submitExercise, updateExerciseStatus } from '../../viewModels/ExercisePage.js';
import DoctorDashboardViewModel from '../../viewModels/DDViewModel';
import ExerciseChart from '../../components/Dashboard/ExerciseChart';
import { dpVM } from '../../viewModels/DPViewModel';
import Spinner from '../../components/General/Spinner';

function DDProfile() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const { patientId } = useParams();
    const defaultPatientId = 1;
    const currentPatientId = patientId ? parseInt(patientId, 10) : defaultPatientId;

    const [activeModal, setActiveModal] = useState(null);
    const [activeTab, setActiveTab] = useState("tab1");

    // Everything that is graph-related
    const [chartData, setChartData] = useState([]);
    const [selectedGraph, setSelectedGraph] = useState("graph1");
    const graphs = [
        { id: "graph1", label: "Exercise" },
        { id: "graph2", label: "Weight" },
        { id: "graph3", label: "Sleep" },
    ]

    // Used to track the state of the graph window
    const [windowStart, setWindowStart] = useState(0);
    const windowSize = 7; // Show 7 data points at a time
    const windowEnd = windowStart + windowSize;

    const formattedLabels = chartData.dates
        ? chartData.dates.map(dateStr => {
            const d = new Date(dateStr);
            return `${d.getMonth() + 1}/${d.getDate()}`;
        })
        : [];
    const slicedLabels = formattedLabels.slice(windowStart, windowEnd);
    const slicedExercise = chartData.exercise?.slice(windowStart, windowEnd) || [];
    const slicedWeight = chartData.weight?.slice(windowStart, windowEnd) || [];
    const slicedSleep = chartData.sleep?.slice(windowStart, windowEnd) || [];
    const slicedHeight = chartData.height?.slice(windowStart, windowEnd) || [];
    const slicedCalories = chartData.calories?.slice(windowStart, windowEnd) || [];

    const refreshChartData = async () => {
        const updatedChartData = await fetchChartData(currentUser.user_id);
        setChartData(updatedChartData);
    };

    // Stores the exercise list
    const [exerciseList, setExerciseList] = useState([]);
    const [exerciseState, setExerciseState] = useState({});
    const [regimens, setRegimens] = useState([]);

    // Handles toggling an exercise inside the Regimens tab
    const handleExerciseStatusToggle = async (exerciseId, currentStatus, reps, patientExerciseID) => {
        let status = currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";

        try {
            console.log("Toggling exercise status...");
            await dpVM.updatePatientRegimens(patientExerciseID, status, reps);

            // Refresh the data for tab4
            await fetchTabData("tab4");

            console.log("Exercise status updated successfully.");
        } catch (error) {
            console.error("Error updating exercise status:", error);
        }
    };


    // Used for submitting prescription requests
    const medicationForm = useForm();
    const onSubmitOrder = (data) => {
        console.log(`Ordered medication: ${JSON.stringify(data)}`);

        // Clear fields
        medicationForm.setValue("medication", "");
        medicationForm.setValue("dosage", "");
        medicationForm.setValue("duration", "");
        medicationForm.setValue("instructions", "");

        // Refreshes the page as data is fetched
        setLoading(true);
        dpVM.submitOrder(data, currentUser.user_id, patientId);
        fetchData();
        setLoading(false);
    }

    // Used for submitting exercises
    const exerciseForm = useForm();
    const onSubmitExercises = async () => {
        // Extract all exercises from the exerciseState
        const exercisesToSubmit = Object.entries(exerciseState)
            .filter(([_, state]) => state.checked) // Only include exercises that are checked
            .map(([exerciseId, state]) => ({
                exercise_id: exerciseId,
                ...state,
            }));

        if (exercisesToSubmit.length === 0) {
            console.error("No exercises selected for submission.");
            return;
        }

        console.log("Submitting the following exercises:", JSON.stringify(exercisesToSubmit, null, 2));

        try {
            // Submit each exercise to the async function in the view model
            for (const exercise of exercisesToSubmit) {
                await dpVM.submitExercise(currentPatientId, currentUser.user_id, exercise);
                console.log(`Successfully submitted exercise: ${JSON.stringify(exercise)}`);
            }

            // Optionally, clear the exercise state or reset the form after submission
            setExerciseState({});
            exerciseForm.reset();

            // Refresh the Regimens tab
            await fetchTabData("tab4");

            console.log("All exercises submitted successfully.");
        } catch (error) {
            console.error("Error submitting exercises:", error);
        }
    };

    // Used to initially load the data for the patient profile
    useEffect(() => {
        fetchData();
    }, [])

    // Used to fetch data for each tab
    useEffect(() => {
        if (activeTab) {
            fetchTabData(activeTab);
        }
    }, [activeTab]);


    // Asynchronous fucntion to fetch all the data that is needed for the profile page
    const fetchData = async () => {
        const result = await dpVM.fetchData(currentPatientId, currentUser.user_id);
        setData(result);
        setLoading(false);

        console.log(`Profile Data:\n${JSON.stringify(result, null, 2)}`);
    }

    // Used to manage data from API calls
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set loading states for each individual tabs
    const [loadingStates, setLoadingStates] = useState({
        overview: false,
        encounters: false,
        medications: false,
        regimens: false,
        exercise: false,
        graphs: false,
        forms: false,
    });

    // Conditionally fetches data based on the tab you are in
    const fetchTabData = async (tabId) => {
        setLoadingStates((prev) => ({
            ...prev,
            [tabId]: true
        }))
        try {
            switch (tabId) {
                case "exercise":
                    if (exerciseList.length === 0) {
                        const exercises = await dpVM.getExerciseList();
                        let filteredExercises = exercises;

                        if (regimens.length > 0) {
                            const assignedExerciseIds = regimens.map((regimen) => regimen.exercise_id);
                            filteredExercises = exercises.filter(
                                (exercise) => !assignedExerciseIds.includes(exercise.exercise_id)
                            );
                        }

                        setExerciseList(filteredExercises);
                    }
                    break;
                case "tab4":
                    {
                        const regimens = await dpVM.getPatientRegimens(currentPatientId);
                        setRegimens(regimens);
                    }
                    break;
                default:
                    console.warn(`No data fetch logic implemented for tab: ${tabId}`)
            }
        } catch (error) {
            console.error(`Error fetching data for ${tabId}`);
        } finally {
            setLoadingStates((prev) => ({
                ...prev,
                [tabId]: false,
            }));
        }
    };

    if (loading) return <Container fitParent={true} customClass="p-5" content={[<Spinner size={64} />]} />;
    if (!data)   return <h3 className="font-semibold font-primary-neutral-300">Error: Data could not be fetched!</h3>;

    const handleOpenModal = async (modalId) => {
        setActiveModal(modalId);
        if (!loadingStates["exercise"]) {
            fetchTabData(modalId);
        }
    }

    const handleCloseModal = () => {
        setActiveModal(null);
    }

    // Handle checkbox toggle
    const handleCheckbox = (exerciseId) => {
        setExerciseState((prevState) => {
            const isChecked = prevState[exerciseId]?.checked;

            if (isChecked) {
                // Uncheck the checkbox and remove the exercise
                const { [exerciseId]: _, ...rest } = prevState;
                exerciseForm.setValue(`exercises.${exerciseId}`, undefined); // Clear reps
                return rest;
            } else {
                // Check the checkbox and initialize the reps value
                exerciseForm.setValue(`exercises.${exerciseId}.reps`, ""); // Initialize reps
                return {
                    ...prevState,
                    [exerciseId]: { checked: true, reps: "" },
                };
            }
        });
    };

    // Handle exercise input change
    const handleInputChange = (exerciseId, field, value) => {
        setExerciseState((prevState) => {
            const updatedState = { ...prevState };
            if(!updatedState[exerciseId]) {
                updatedState[exerciseId] = {};
            }
            updatedState[exerciseId][field] = value;
            return updatedState;
        });
        console.log("Updated exerciseState:", JSON.stringify(exerciseState, null, 2));

        // Update the value in react-hook-form for the specific exercise
        exerciseForm.setValue(`exercises.${exerciseId}.${field}`, value);
    };

    const tabs = [
        { id: "tab1", label: "Overview" },
        { id: "tab2", label: "Encounters" },
        { id: "tab3", label: "Medications" },
        { id: "tab4", label: "Regimens" },
        { id: "tab5", label: "Graphs" },
        { id: "tab6", label: "Forms" },
    ]

    const tabContent = {
        tab1: (
            <>
                <ItemGroup
                    customClass="gap-12"
                    axis={true}
                    fitParent={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="bg-primary-dark-600 br-sm p-5"
                                            fitParent={true}
                                            content={[
                                                <>
                                                    <h5 className="font-5 text-dark-300 font-semibold">Basic Information</h5>
                                                </>
                                            ]}
                                        />
                                        <ItemGroup
                                            customClass="gap-5"
                                            axis={true}
                                            fitParent={true}
                                            items={[
                                                <>
                                                    <ItemGroup
                                                        customClass="gap-6"
                                                        axis={false}
                                                        stretch={true}
                                                        fitParent={true}
                                                        style={{
                                                            gridAutoColumns: "1fr 1fr auto"
                                                        }}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-3"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <p className="font-4">First Name</p>
                                                                            <InputBar
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder=""
                                                                                value={data.patientInfo.first_name}
                                                                                readonly={true}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                                <ItemGroup
                                                                    customClass="gap-3"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <p className="font-4">Last Name</p>
                                                                            <InputBar
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder=""
                                                                                value={data.patientInfo.last_name}
                                                                                readonly={true}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                                <ItemGroup
                                                                    customClass="gap-3"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <p className="font-4">Sex</p>
                                                                            <InputBar
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder=""
                                                                                value={dashboardLayoutViewModel.capitalize(data.patientInfo.gender)}
                                                                                readonly={true}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                    <ItemGroup
                                                        customClass="gap-6"
                                                        axis={false}
                                                        stretch={true}
                                                        fitParent={true}
                                                        evenSplit={true}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-3"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <p className="font-4">Date of Birth</p>
                                                                            <InputBar
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder=""
                                                                                value={dashboardLayoutViewModel.formatBirthDate(data.patientInfo.dob, "MM/DD/YYYY")}
                                                                                readonly={true}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />

                                    </>
                                ]}
                            />
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="bg-primary-dark-600 br-sm py-5 pl-5 pr-3"
                                            fitParent={true}
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        customClass="justify-content-space-between align-items-center"
                                                        axis={false}
                                                        fitParent={true}
                                                        stretch={true}
                                                        items={[
                                                            <>
                                                                <h5 className="font-5 text-dark-300 font-semibold">Contact Information</h5>
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                        <form>
                                            <ItemGroup
                                                customClass="gap-5"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Email</p>
                                                                                <InputBar
                                                                                    customClass="bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0"
                                                                                    placeholder="Enter your email"
                                                                                    value={data.patientInfo.email}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Phone</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your phone number"
                                                                                    value={data.patientInfo.phone}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Address</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your address"
                                                                                    value={data.patientInfo.address1}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">City</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your city"
                                                                                    value={data.patientInfo.city}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">State</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your state"
                                                                                    value={data.patientInfo.state}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Postal Code</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your postal code"
                                                                                    value={data.patientInfo.zipcode}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </form>
                                    </>
                                ]}
                            />
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="bg-primary-dark-600 br-sm py-5 pl-5 pr-3"
                                            fitParent={true}
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        customClass="justify-content-space-between align-items-center"
                                                        axis={false}
                                                        fitParent={true}
                                                        stretch={true}
                                                        items={[
                                                            <>
                                                                <h5 className="font-5 text-dark-300 font-semibold">Pharmacy Information</h5>
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                        <form>
                                            <ItemGroup
                                                customClass="gap-5"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Pharmacy Name</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your address"
                                                                                    value={data.pharmacyInfo.pharmacy_name}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Address</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your address"
                                                                                    value={data.pharmacyInfo.address1}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-6"
                                                            axis={false}
                                                            stretch={true}
                                                            fitParent={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">City</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your city"
                                                                                    value={data.pharmacyInfo.city}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">State</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your state"
                                                                                    value={data.pharmacyInfo.state}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4">Postal Code</p>
                                                                                <InputBar
                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                    placeholder="Enter your postal code"
                                                                                    value={data.pharmacyInfo.zipcode}
                                                                                    readonly={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </form>
                                    </>
                                ]}
                            />
                            <div></div>
                        </>
                    ]}
                />
            </>
        ),
        tab2: (
            <>
                <ItemGroup
                    customClass="gap-12"
                    axis={true}
                    fitParent={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            fitParent={true}
                                            style={{
                                                maxHeight: "678px",
                                                maxWidth: "1120px",
                                            }}
                                            headerClass="bg-primary-dark-600 br-sm p-5"
                                            header={[
                                                <>
                                                    <h5 className="font-5 text-dark-300 font-semibold">Upcoming Encounters</h5>
                                                </>
                                            ]}
                                            contentClass={`hideScroll ${Array.isArray(data.upcomingAppointments) && data.upcomingAppointments.length > 0 ? "py-3 px-5" : "px-0 py-5"}`}
                                            content={[
                                                <>
                                                    {
                                                        Array.isArray(data.upcomingAppointments) && data.upcomingAppointments.length > 0 ? (
                                                            data.upcomingAppointments.map((appt) => (
                                                                <ItemGroup
                                                                    axis={true}
                                                                    style={{
                                                                        gridAutoRows: "100px",
                                                                        width: "100%"
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="b-bottom-3 outline-primary-dark-800 align-items-center justify-content-space-between"
                                                                                axis={false}
                                                                                stretch={true}
                                                                                fitParent={true}
                                                                                items={[
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            customClass="align-content-center"
                                                                                            axis={false}
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            style={{
                                                                                                gridAutoColumns: "180px"
                                                                                            }}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">DATE</h5>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-6 align-items-center"
                                                                                                                    fitParent={true}
                                                                                                                    axis={false}
                                                                                                                    stretch={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="align-items-center gap-2"
                                                                                                                                axis={false}
                                                                                                                                stretch={true}
                                                                                                                                items={[
                                                                                                                                    <>
                                                                                                                                        <BaseIcon
                                                                                                                                            height="15px"
                                                                                                                                            width="15px"
                                                                                                                                            viewBox="0 1 24 24"
                                                                                                                                            fillColor="none">
                                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                                                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="hsl(0, 0%, 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                            </g>
                                                                                                                                        </BaseIcon>
                                                                                                                                        <p className="font-3 font-medium text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(appt.start_date, "MM/DD/YYYY")}</p>
                                                                                                                                    </>
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">DOCTOR</h5>
                                                                                                                <p className="font-3 font-medium text-neutral-600">
                                                                                                                    {appt.doctor_name}
                                                                                                                </p>
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">TREATMENT</h5>
                                                                                                                <p className="font-3 font-medium text-neutral-600">
                                                                                                                    {appt.treatment}
                                                                                                                </p>
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">STARTS</h5>
                                                                                                                <p className="font-3 font-medium text-neutral-600">
                                                                                                                    {dashboardLayoutViewModel.splitDateTime(appt.start_date).time}
                                                                                                                </p>
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <Container
                                                                                            customClass="bg-primary-dark-800 px-5 py-2 br-sm"
                                                                                            isClickable={true}
                                                                                            onClick={() => {
                                                                                                if (new Date(appt.start_date) <= new Date()) {
                                                                                                    navigate(`/dashboard/${currentUser.role}/appointment`);
                                                                                                } else {
                                                                                                    alert("You cannot join the meeting before the scheduled time.");
                                                                                                }
                                                                                            }}
                                                                                            content={[
                                                                                                <>
                                                                                                    <p className="font-3 text-primary-neutral-200 font-semibold">JOIN MEETING</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            ))
                                                        ) : (
                                                            <Container
                                                                customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "128px"
                                                                }}
                                                                content={[
                                                                    <>
                                                                        <p className="font-4 font-semibold text-primary-neutral-100">No upcoming appointments</p>
                                                                    </>
                                                                ]}
                                                            />
                                                        )
                                                    }
                                                </>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0"
                                            fitParent={true}
                                            style={{
                                                maxHeight: "678px",
                                                maxWidth: "1120px",
                                            }}
                                            headerClass="bg-primary-dark-600 br-sm p-5"
                                            header={[
                                                <>
                                                    <h5 className="font-5 text-dark-300 font-semibold">Encounter History</h5>
                                                </>
                                            ]}
                                            contentClass={`hideScroll ${data.pastAppointments.length > 0 ? "p-5" : "px-0 py-5"}`}
                                            content={[
                                                <>
                                                    {
                                                        Array.isArray(data.pastAppointments) && data.pastAppointments.length > 0 ? (
                                                            data.pastAppointments.map((appt) => (
                                                                <ItemGroup
                                                                    axis={true}
                                                                    style={{
                                                                        gridAutoRows: "100px",
                                                                        width: "100%"
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="b-bottom-3 outline-primary-dark-800 align-items-center justify-content-space-between"
                                                                                axis={false}
                                                                                stretch={true}
                                                                                fitParent={true}
                                                                                items={[
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            customClass="align-content-center"
                                                                                            axis={false}
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            style={{
                                                                                                gridAutoColumns: "180px"
                                                                                            }}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">DATE</h5>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-6 align-items-center"
                                                                                                                    fitParent={true}
                                                                                                                    axis={false}
                                                                                                                    stretch={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="align-items-center gap-2"
                                                                                                                                axis={false}
                                                                                                                                stretch={true}
                                                                                                                                items={[
                                                                                                                                    <>
                                                                                                                                        <BaseIcon
                                                                                                                                            height="15px"
                                                                                                                                            width="15px"
                                                                                                                                            viewBox="0 1 24 24"
                                                                                                                                            fillColor="none">
                                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                                                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="hsl(0, 0%, 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                            </g>
                                                                                                                                        </BaseIcon>
                                                                                                                                        <p className="font-3 font-medium text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(appt.created_at, "MM/DD/YYYY")}</p>
                                                                                                                                    </>
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">DOCTOR</h5>
                                                                                                                <p className="font-3 font-medium text-neutral-600">
                                                                                                                    {appt.appointment.doctor_name}
                                                                                                                </p>
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <h5 className="font-3 text-neutral-600">NOTES</h5>
                                                                                                                <ItemGroup
                                                                                                                    customClass="hideScroll"
                                                                                                                    axis={true}
                                                                                                                    stretch={true}
                                                                                                                    style={{
                                                                                                                        gridAutoColumns: "500px",
                                                                                                                        maxHeight: "40px"
                                                                                                                    }}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <p className="font-3 font-medium text-neutral-600">
                                                                                                                                {appt.description}
                                                                                                                            </p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            ))
                                                        ) : (
                                                            <Container
                                                                customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "128px"
                                                                }}
                                                                content={[
                                                                    <>
                                                                        <p className="font-4 font-semibold text-primary-neutral-100">No appointments on record</p>
                                                                    </>
                                                                ]}
                                                            />
                                                        )
                                                    }
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <div></div>
                        </>
                    ]}
                />
            </>
        ),
        tab3: (
            <>
                <ItemGroup
                    customClass="gap-12"
                    axis={true}
                    fitParent={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="p-0"
                                            fitParent={true}
                                            style={{
                                                maxHeight: "400px",
                                                maxWidth: "1120px",
                                            }}
                                            headerClass="bg-primary-dark-600 br-sm p-5"
                                            header={[
                                                <>
                                                    <ItemGroup
                                                        customClass="justify-content-space-between align-items-center"
                                                        axis={false}
                                                        stretch={true}
                                                        fitParent={true}
                                                        items={[
                                                            <>
                                                                <h5 className="font-5 text-dark-300 font-semibold">Active Medications</h5>
                                                                <ItemGroup
                                                                    customClass="p-0 br-md align-items-center justify-content-space-between gap-0"
                                                                    axis={false}
                                                                    stretch={true}
                                                                    isClickable={true}
                                                                    onClick={() => handleOpenModal("medication")}
                                                                    items={[
                                                                        <>
                                                                            <BaseIcon
                                                                                fill="none"
                                                                                height="40px"
                                                                                width="40px">
                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <g id="SVGRepo_iconCarrier">
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="hsl(210, 20%, 45%)" />
                                                                                </g>
                                                                            </BaseIcon>
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                            contentClass={`hideScroll pt-7 pb-5 ${data.pastMedications.length > 0 ? 'px-5' : ''}`}
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        customClass="gap-8"
                                                        axis={true}
                                                        fitParent={true}
                                                        items={[
                                                            <>
                                                                {data.activeMedications.length > 0 ? (
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="py-2"
                                                                            axis={false}
                                                                            fitParent={true}
                                                                            style={{
                                                                                gridAutoColumns: "250px"
                                                                            }}
                                                                            items={[
                                                                                <>
                                                                                    <h5 className="font-3 text-neutral-600">ITEM ORDERED</h5>
                                                                                    <h5 className="font-3 text-neutral-600">DURATION</h5>
                                                                                    <h5 className="font-3 text-neutral-600">DOSAGE</h5>
                                                                                    <h5 className="font-3 text-neutral-600">STATUS</h5>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        {data.activeMedications.map((medication, index) => (
                                                                            <>
                                                                                <ItemGroup
                                                                                    key={index}
                                                                                    customClass="position-relative hover-parent align-content-center"
                                                                                    axis={false}
                                                                                    fitParent={true}
                                                                                    stretch={true}
                                                                                    style={{
                                                                                        gridAutoColumns: "250px",
                                                                                        gridAutoRows: "40px"
                                                                                    }}
                                                                                    items={[
                                                                                        <>
                                                                                            <Container
                                                                                                customClass="bg-primary-dark-500 position-absolute hidden-element"
                                                                                                style={{
                                                                                                    height: "1.5px",
                                                                                                    width: "100%",
                                                                                                    bottom: "0",
                                                                                                    left: "0"
                                                                                                }}
                                                                                                content={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="pr-3 pl-1 py-1 br-md bg-primary-dark-500 position-absolute align-items-center"
                                                                                                            axis={false}
                                                                                                            stretch={true}
                                                                                                            isClickable={true}
                                                                                                            onClick={() => handleOpenModal("medication")}
                                                                                                            style={{
                                                                                                                bottom: "0",
                                                                                                                left: "45%",
                                                                                                                transform: "translateY(50%)"
                                                                                                            }}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <BaseIcon
                                                                                                                        fill="none"
                                                                                                                        height="28px"
                                                                                                                        width="28px">
                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="hsl(210, 20%, 55%)" />
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <p className="font-3 font-semibold text-primary-neutral-200">ADD MEDICATION</p>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">{medication.name}</p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                                            {medication.duration} days
                                                                                                        </p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                                            {medication.dosage} mg
                                                                                                        </p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <h3 className={`font-3 py-1 px-3 br font-semibold ${medication.status === "PAID" ? 'text-success-100 bg-success-500' : 'text-caution-100 bg-caution-500'}`}>
                                                                                                                        {medication.status}
                                                                                                                    </h3>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Container
                                                                            customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                            style={{
                                                                                width: "100%",
                                                                                height: "128px"
                                                                            }}
                                                                            content={[
                                                                                <>
                                                                                    <p className="font-4 font-semibold text-primary-neutral-100">You have no active medications</p>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0"
                                            fitParent={true}
                                            style={{
                                                maxHeight: "400px",
                                                maxWidth: "1120px",
                                            }}
                                            headerClass="bg-primary-dark-600 br-sm p-5"
                                            header={[
                                                <>
                                                    <h5 className="font-5 text-dark-300 font-semibold">Medication History</h5>
                                                </>
                                            ]}
                                            contentClass={`pt-7 pb-5 ${data.pastMedications.length > 0 ? 'px-5' : ''}`}
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        customClass="gap-8 hideScroll"
                                                        axis={true}
                                                        fitParent={true}
                                                        style={{
                                                            maxHeight: "200px"
                                                        }}
                                                        items={[
                                                            <>
                                                                {data.pastMedications.length > 0 ? (
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="py-0"
                                                                            axis={false}
                                                                            fitParent={true}
                                                                            style={{
                                                                                gridAutoColumns: "250px"
                                                                            }}
                                                                            items={[
                                                                                <>
                                                                                    <h5 className="font-3 text-neutral-600">ITEM ORDERED</h5>
                                                                                    <h5 className="font-3 text-neutral-600">DURATION</h5>
                                                                                    <h5 className="font-3 text-neutral-600">DOSAGE</h5>
                                                                                    <h5 className="font-3 text-neutral-600">TAKEN BY</h5>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        {data.pastMedications.map((medication, index) => (
                                                                            <>
                                                                                <ItemGroup
                                                                                    key={index}
                                                                                    customClass=" py-1"
                                                                                    axis={false}
                                                                                    fitParent={true}
                                                                                    stretch={true}
                                                                                    style={{
                                                                                        gridAutoColumns: "250px"
                                                                                    }}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">{medication.name}</p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                                            {medication.duration} days
                                                                                                        </p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                                            {medication.dosage} mg
                                                                                                        </p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                                            {dashboardLayoutViewModel.formatBirthDate(medication.taken_date)}
                                                                                                        </p>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Container
                                                                            customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                            style={{
                                                                                width: "100%",
                                                                                height: "128px"
                                                                            }}
                                                                            content={[
                                                                                <>
                                                                                    <p className="font-4 font-semibold text-primary-neutral-100">You have no medications on record</p>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <div></div>
                        </>
                    ]}
                />
            </>
        ),
        tab4: (
            <>
                {loadingStates["tab4"] ? (
                    <Container fitParent={true} customClass="p-5" content={[<Spinner size={64} />]} />
                ) : (
                        <>
                            <ItemGroup
                                customClass="gap-12"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <ItemGroup
                                            customClass="gap-6"
                                            axis={true}
                                            fitParent={true}
                                            items={[
                                                <>
                                                    <Container
                                                        customClass="p-0"
                                                        fitParent={true}
                                                        style={{
                                                            maxHeight: "400px",
                                                            maxWidth: "1120px",
                                                        }}
                                                        headerClass="bg-primary-dark-600 br-sm p-5"
                                                        header={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="justify-content-space-between align-items-center"
                                                                    axis={false}
                                                                    stretch={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <h5 className="font-5 text-dark-300 font-semibold">Active Programs</h5>
                                                                            <ItemGroup
                                                                                customClass="p-0 br-md align-items-center justify-content-space-between gap-0"
                                                                                axis={false}
                                                                                stretch={true}
                                                                                isClickable={true}
                                                                                onClick={() => handleOpenModal("exercise")}
                                                                                items={[
                                                                                    <>
                                                                                        <BaseIcon
                                                                                            fill="none"
                                                                                            height="40px"
                                                                                            width="40px">
                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="hsl(210, 20%, 45%)" />
                                                                                            </g>
                                                                                        </BaseIcon>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                        contentClass={`hideScroll pt-7 pb-5 ${Array.isArray(regimens) && regimens.length > 0 ? 'px-0' : ''}`}
                                                        content={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-8"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            {Array.isArray(regimens) && regimens.filter(regimen => regimen.status === "IN_PROGRESS").length > 0 ?
                                                                                (regimens.filter(regimen => regimen.status === "IN_PROGRESS").map((regimen, index) => (
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            key={index}
                                                                                            customClass=" pt-2 pb-6 justify-content-space-between position-relative hover-parent px-5"
                                                                                            axis={false}
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <Container
                                                                                                        customClass="bg-primary-dark-500 position-absolute"
                                                                                                        style={{
                                                                                                            height: "1.5px",
                                                                                                            width: "100%",
                                                                                                            bottom: "0",
                                                                                                            left: "0"
                                                                                                        }}
                                                                                                        content={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="pr-3 pl-1 py-1 br-md bg-primary-dark-500 position-absolute align-items-center hidden-element"
                                                                                                                    axis={false}
                                                                                                                    stretch={true}
                                                                                                                    isClickable={true}
                                                                                                                    onClick={() => handleOpenModal("exercise")}
                                                                                                                    style={{
                                                                                                                        bottom: "0",
                                                                                                                        left: "45%",
                                                                                                                        transform: "translateY(50%)"
                                                                                                                    }}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <BaseIcon
                                                                                                                                fill="none"
                                                                                                                                height="28px"
                                                                                                                                width="28px">
                                                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                <g id="SVGRepo_iconCarrier">
                                                                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z" fill="hsl(210, 20%, 55%)" />
                                                                                                                                </g>
                                                                                                                            </BaseIcon>
                                                                                                                            <p className="font-3 font-semibold text-primary-neutral-200">ADD REGIMEN</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        axis={false}
                                                                                                        fitParent={true}
                                                                                                        stretch={true}
                                                                                                        style={{
                                                                                                            gridAutoColumns: "250px"
                                                                                                        }}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-2"
                                                                                                                    axis={true}
                                                                                                                    stretch={true}
                                                                                                                    fitParent={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <h5 className="font-4 text-neutral-600 font-semibold">{regimen.type_of_exercise}</h5>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="gap-6 align-items-center"
                                                                                                                                fitParent={true}
                                                                                                                                axis={false}
                                                                                                                                stretch={true}
                                                                                                                                items={[
                                                                                                                                    <>

                                                                                                                                        <ItemGroup
                                                                                                                                            customClass="align-items-center gap-1"
                                                                                                                                            axis={false}
                                                                                                                                            stretch={true}
                                                                                                                                            items={[
                                                                                                                                                <>
                                                                                                                                                    <BaseIcon
                                                                                                                                                        height="18px"
                                                                                                                                                        width="18px"
                                                                                                                                                        viewBox="0 -3.5 25 25"
                                                                                                                                                        fillColor="none">
                                                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                                                            <path d="M5 0H11V3.58579L8 6.58579L5 3.58579V0Z" fill="hsl(0, 0%, 50%)" /> <path d="M3.58579 5H0V11H3.58579L6.58579 8L3.58579 5Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M5 12.4142V16H11V12.4142L8 9.41421L5 12.4142Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M12.4142 11H16V5H12.4142L9.41421 8L12.4142 11Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                        </g>
                                                                                                                                                    </BaseIcon>
                                                                                                                                                    <p className="font-3 font-medium text-neutral-600">{regimen.reps} reps</p>
                                                                                                                                                </>
                                                                                                                                            ]}
                                                                                                                                        />
                                                                                                                                    </>
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <Checkbox
                                                                                                        checkboxClass="b-4 outline-primary-dark-600 fill-primary-dark-600 align-self-center"
                                                                                                        checkColor="hsl(210, 20%, 95%)"
                                                                                                        label={[
                                                                                                            <p></p>
                                                                                                        ]}
                                                                                                        onChange={() => handleExerciseStatusToggle(regimen.exercise_id, regimen.status, regimen.reps, regimen.patient_exercise_id)}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ))) : (
                                                                                    <>
                                                                                        <Container
                                                                                            customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                height: "128px"
                                                                                            }}
                                                                                            content={[
                                                                                                <>
                                                                                                    <p className="font-4 font-semibold text-primary-neutral-100">You have no assigned programs</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                    <Container
                                                        customClass="p-0"
                                                        fitParent={true}
                                                        style={{
                                                            maxHeight: "400px",
                                                            maxWidth: "1120px",
                                                        }}
                                                        headerClass="bg-primary-dark-600 br-sm p-5"
                                                        header={[
                                                            <>
                                                                <h5 className="font-5 text-dark-300 font-semibold">Completed Programs</h5>
                                                            </>
                                                        ]}
                                                        contentClass={`pt-7 pb-5 ${Array.isArray(regimens) && regimens.length > 0 ? 'px-0' : ''}`}
                                                        content={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-8 hideScroll"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    style={{
                                                                        maxHeight: "200px"
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            {Array.isArray(regimens) && regimens.filter(regimen => regimen.status === "COMPLETED").length > 0 ?
                                                                                (regimens.filter(regimen => regimen.status === "COMPLETED").map((regimen, index) => (
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            key={index}
                                                                                            customClass="px-5 pt-2 pb-6 justify-content-space-between b-bottom-3 outline-primary-dark-400"
                                                                                            axis={false}
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        axis={false}
                                                                                                        fitParent={true}
                                                                                                        stretch={true}
                                                                                                        style={{
                                                                                                            gridAutoColumns: "250px"
                                                                                                        }}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-2"
                                                                                                                    axis={true}
                                                                                                                    stretch={true}
                                                                                                                    fitParent={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <h5 className="font-4 text-neutral-600 font-semibold">{regimen.type_of_exercise}</h5>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="gap-6 align-items-center"
                                                                                                                                fitParent={true}
                                                                                                                                axis={false}
                                                                                                                                stretch={true}
                                                                                                                                items={[
                                                                                                                                    <>

                                                                                                                                        <ItemGroup
                                                                                                                                            customClass="align-items-center gap-1"
                                                                                                                                            axis={false}
                                                                                                                                            stretch={true}
                                                                                                                                            items={[
                                                                                                                                                <>
                                                                                                                                                    <BaseIcon
                                                                                                                                                        height="18px"
                                                                                                                                                        width="18px"
                                                                                                                                                        viewBox="0 -3.5 25 25"
                                                                                                                                                        fillColor="none">
                                                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                                                            <path d="M5 0H11V3.58579L8 6.58579L5 3.58579V0Z" fill="hsl(0, 0%, 50%)" /> <path d="M3.58579 5H0V11H3.58579L6.58579 8L3.58579 5Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M5 12.4142V16H11V12.4142L8 9.41421L5 12.4142Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M12.4142 11H16V5H12.4142L9.41421 8L12.4142 11Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                        </g>
                                                                                                                                                    </BaseIcon>
                                                                                                                                                    <p className="font-3 font-medium text-neutral-600">{regimen.reps} reps</p>
                                                                                                                                                </>
                                                                                                                                            ]}
                                                                                                                                        />
                                                                                                                                    </>
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <Checkbox
                                                                                                        checkboxClass="b-4 outline-primary-dark-600 fill-primary-dark-600 align-self-center"
                                                                                                        checkColor="hsl(210, 20%, 95%)"
                                                                                                        label={[
                                                                                                            <p></p>
                                                                                                        ]}
                                                                                                        checked={true}
                                                                                                        onChange={() => handleExerciseStatusToggle(regimen.exercise_id, regimen.status, regimen.reps, regimen.patient_exercise_id)}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ))) : (
                                                                                    <>
                                                                                        <Container
                                                                                            customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                height: "128px"
                                                                                            }}
                                                                                            content={[
                                                                                                <>
                                                                                                    <p className="font-4 font-semibold text-primary-neutral-100">You have no active programs</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                        <div></div>
                                    </>
                                ]}
                            />
                    </>
                )}
            </>
        ),
        tab5: (
            <>
                <ItemGroup
                    customClass="gap-12"
                    axis={true}
                    fitParent={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="p-0"
                                            fitParent={true}
                                            style={{
                                                maxHeight: "678px",
                                                maxWidth: "1120px",
                                            }}
                                            headerClass="bg-primary-dark-600 br-sm p-5"
                                            header={[
                                                <>
                                                    <h5 className="font-5 text-dark-300 font-semibold">Patient Progress</h5>
                                                </>
                                            ]}
                                            contentClass="py-5"
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        axis={true}
                                                        fitParent={true}
                                                        style={{
                                                            gridAutoColumns: "1fr",
                                                            gridAutoRows: "auto 1fr"
                                                        }}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="justify-content-center gap-3 pb-3 align-items-center"
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    axis={false}
                                                                    items={[
                                                                        <>
                                                                            <Container
                                                                                customClass={`${(windowStart === 0) ? "bg-primary-neutral-500" : "bg-primary-dark-400"} py-3 br-sm text-center`}
                                                                                fitParent={true}
                                                                                isClickable={!(windowStart === 0)}
                                                                                onClick={async () => {
                                                                                    setWindowStart(prev => {
                                                                                        const newStart = Math.max(0, prev - windowSize);
                                                                                        setTimeout(refreshChartData, 0); // Re-fetch after state update
                                                                                        return newStart;
                                                                                    });
                                                                                }}
                                                                                content={[<p className="font-semibold text-primary-neutral-100">?  Previous</p>]}
                                                                            />
                                                                            <h5 className="font-4 text-neutral-600 font-semibold">
                                                                                {slicedLabels.length > 0
                                                                                    ? `${slicedLabels[0]} - ${slicedLabels[slicedLabels.length - 1]}`
                                                                                    : ""}
                                                                            </h5>
                                                                            <Container
                                                                                customClass={`${(windowEnd >= (chartData.dates?.length || 0)) ? "bg-primary-neutral-500" : "bg-primary-dark-400"} py-3 br-sm text-center`}
                                                                                fitParent={true}
                                                                                isClickable={!(windowEnd >= (chartData.dates?.length || 0))}
                                                                                onClick={async () => {
                                                                                    setWindowStart(prev => {
                                                                                        const maxStart = (chartData.dates?.length || 0) - windowSize;
                                                                                        const newStart = Math.min(maxStart, prev + windowSize);
                                                                                        setTimeout(refreshChartData, 0); // Re-fetch after state update
                                                                                        return newStart;
                                                                                    });
                                                                                }}
                                                                                content={[<p className="font-semibold text-primary-neutral-100">Next  ?</p>]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                                <ItemGroup
                                                                    customClass="justify-content-center justify-items-center align-items-center text-align-center"
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    axis={false}
                                                                    style={{
                                                                        gridAutoColumns: "1fr",
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            {graphs.map((graph) => (
                                                                                <ItemGroup
                                                                                    customClass={`text-align-center justify-content-center py-5 br-top-sm ${selectedGraph === graph.id ? "bg-neutral-1100" : "bg-neutral-1000 text-dark-200 b-bottom-4 outline-primary-dark-600"}`}
                                                                                    key={graph.id}
                                                                                    axis={false}
                                                                                    stretch={true}
                                                                                    fitParent={true}
                                                                                    isClickable={true}
                                                                                    onClick={() => {
                                                                                        setSelectedGraph(graph.id);
                                                                                        console.log(`You selected graph ${JSON.stringify(selectedGraph, null, 2)}`);
                                                                                    }}
                                                                                    items={[
                                                                                        <>
                                                                                            <p className={`font-4 font-semibold ${selectedGraph === graph.id ? "text-dark-300" : "text-dark-200"}`}>{graph.label}</p>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            ))}
                                                                        </>
                                                                    ]}
                                                                />
                                                                <ItemGroup
                                                                    customClass="br-bottom-sm bg-neutral-1100 pt-5 pb-8 align-content-center justify-items-center gap-5"
                                                                    fitParent={true}
                                                                    style={{
                                                                        minHeight: "400px",
                                                                        gridAutoColumns: "1fr"
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            {selectedGraph === "graph1" && <ExerciseChart inputData={chartData.exercise} inputLabel="Exercise" pointFillColor="hsl(120, 45%, 85%)" lineColor="hsl(120, 45%, 35%)" />}
                                                                            {selectedGraph === "graph2" && <ExerciseChart inputData={chartData.weight} inputLabel="Weight" pointFillColor="hsl(250, 60%, 80%)" lineColor="hsl(250, 60%, 40%)" />}
                                                                            {selectedGraph === "graph3" && <ExerciseChart inputData={chartData.sleep} inputLabel="Sleep" />}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />

                                    </>
                                ]}
                            />
                            <div></div>
                        </>
                    ]}
                />
            </>
        ),
        tab6: (
            <>
                <ItemGroup
                    customClass="gap-12"
                    axis={true}
                    fitParent={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-6"
                                axis={true}
                                fitParent={true}
                                items={[
                                    <>
                                        <Accordion
                                            headerClass="p-5 br-sm bg-primary-dark-600"
                                            header={[
                                                <>
                                                    <ItemGroup
                                                        customClass="align-items-center justify-content-space-between"
                                                        fitParent={true}
                                                        stretch={true}
                                                        axis={false}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-3"
                                                                    axis={false}
                                                                    stretch={true}
                                                                    items={[
                                                                        <>
                                                                            <h1 className="font-5 font-semibold text-primary-neutral-100">Daily Survey</h1>
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                            toggleIcon={[
                                                <div className="dropdownDown"></div>
                                            ]}
                                            bodyClass="pt-6 pb-3"
                                            body={[
                                                <ItemGroup
                                                    axis={true}
                                                    stretch={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            <form>
                                                                <ItemGroup
                                                                    customClass="gap-8"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="gap-5"
                                                                                axis={true}
                                                                                fitParent={true}
                                                                                items={[
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            customClass="gap-6"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            fitParent={true}
                                                                                            evenSplit={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-3"
                                                                                                        axis={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <p className="font-4">What is your height in centimeters?</p>
                                                                                                                <InputBar
                                                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                    placeholder=""
                                                                                                                    value={ data.forms.length > 0 ? data.forms[0].height : "" }
                                                                                                                    readonly={true}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <ItemGroup
                                                                                            customClass="gap-6"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            fitParent={true}
                                                                                            evenSplit={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-3"
                                                                                                        axis={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <p className="font-4">How much do you weigh in kilograms?</p>
                                                                                                                <InputBar
                                                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                    placeholder=""
                                                                                                                    value={data.forms.length > 0 ? data.forms[0].weight : ""}
                                                                                                                    readonly={true}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <ItemGroup
                                                                                            customClass="gap-6"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            fitParent={true}
                                                                                            evenSplit={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-3"
                                                                                                        axis={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <p className="font-4">How much calories did you consume</p>
                                                                                                                <InputBar
                                                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                    placeholder=""
                                                                                                                    value={data.forms.length > 0 ? data.forms[0].calories_intake : ""}
                                                                                                                    readonly={true}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <ItemGroup
                                                                                            customClass="gap-6"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            fitParent={true}
                                                                                            evenSplit={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-3"
                                                                                                        axis={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <p className="font-4">How many hours of sleep did you get?</p>
                                                                                                                <InputBar
                                                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                    placeholder=""
                                                                                                                    value={data.forms.length > 0 ? data.forms[0].hours_of_sleep : ""}
                                                                                                                    readonly={true}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                        <ItemGroup
                                                                                            customClass="gap-6"
                                                                                            axis={false}
                                                                                            stretch={true}
                                                                                            fitParent={true}
                                                                                            evenSplit={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-3"
                                                                                                        axis={true}
                                                                                                        fitParent={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <p className="font-4">How many hours did you exercise for?</p>
                                                                                                                <InputBar
                                                                                                                    customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                    placeholder=""
                                                                                                                    value={data.forms.length > 0 ? data.forms[0].hours_of_exercise : ""}
                                                                                                                    readonly={true}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </form>
                                                        </>
                                                    ]}
                                                />
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <div></div>
                        </>
                    ]}
                />
            </>
        ),
    };

    return (
        <>
            <Modal
                id="exercise"
                isOpen={activeModal === "exercise"}
                onClose={handleCloseModal}
            >
                <form>
                    {loadingStates["exercise"] ? (
                        <Container fitParent={true} customClass="p-5" content={[<Spinner size={64} />]} />
                    ) : (
                            <ItemGroup
                                customClass="px-2 pt-2 gap-5 text-start"
                                axis={true}
                                style={{
                                    gridAutoColumns: "30vw"
                                }}
                                items={[
                                    <>
                                        <ItemGroup
                                            customClass="gap-5"
                                            axis={true}
                                            fitParent={true}
                                            items={[
                                                <>
                                                    <Container
                                                        customClass="bg-neutral-1100 p-6"
                                                        fitParent={true}
                                                        headerClass="b-bottom-3 outline-neutral-800 py-3"
                                                        header={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="p-0 align-items-center justify-content-space-between"
                                                                    axis={false}
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    items={[
                                                                        <>
                                                                            <h3 className="font-semibold text-neutral-600">
                                                                                ADD REGIMEN
                                                                            </h3>
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                        contentClass="hideScroll px-0 pt-5 pb-5 b-bottom-3 outline-neutral-800"
                                                        content={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="gap-5"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    style={{
                                                                        maxHeight: "200px"
                                                                    }}
                                                                    items={[
                                                                        <>
                                                                            {exerciseList.length > 0 && (
                                                                                exerciseList.map((exercise) => (
                                                                                    <>
                                                                                        <ItemGroup
                                                                                            key={exercise.exercise_id}
                                                                                            customClass=" pt-2 pb-6 justify-content-space-between position-relative"
                                                                                            axis={false}
                                                                                            fitParent={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        axis={false}
                                                                                                        fitParent={true}
                                                                                                        stretch={true}
                                                                                                        style={{
                                                                                                            gridAutoColumns: "250px"
                                                                                                        }}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-2"
                                                                                                                    axis={true}
                                                                                                                    stretch={true}
                                                                                                                    fitParent={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <h5 className="font-4 text-neutral-600 font-semibold">{exercise.type_of_exercise}</h5>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="gap-6 align-items-center"
                                                                                                                                fitParent={true}
                                                                                                                                axis={false}
                                                                                                                                stretch={true}
                                                                                                                                items={[
                                                                                                                                    <>
                                                                                                                                        <ItemGroup
                                                                                                                                            customClass="align-items-center gap-2"
                                                                                                                                            axis={false}
                                                                                                                                            stretch={true}
                                                                                                                                            items={[
                                                                                                                                                <>
                                                                                                                                                    <BaseIcon
                                                                                                                                                        height="18px"
                                                                                                                                                        width="18px"
                                                                                                                                                        viewBox="0 -3.5 25 25"
                                                                                                                                                        fillColor="none">
                                                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                                                            <path d="M5 0H11V3.58579L8 6.58579L5 3.58579V0Z" fill="hsl(0, 0%, 50%)" /> <path d="M3.58579 5H0V11H3.58579L6.58579 8L3.58579 5Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M5 12.4142V16H11V12.4142L8 9.41421L5 12.4142Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                            <path d="M12.4142 11H16V5H12.4142L9.41421 8L12.4142 11Z" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                        </g>
                                                                                                                                                    </BaseIcon>
                                                                                                                                                    <ItemGroup
                                                                                                                                                        customClass="align-items-center gap-1"
                                                                                                                                                        axis={false}
                                                                                                                                                        stretch={true}
                                                                                                                                                        items={[
                                                                                                                                                            <>
                                                                                                                                                                <InputBar
                                                                                                                                                                    {...exerciseForm.register(`exercises.${exercise.exercise_id}.reps`, {
                                                                                                                                                                        required: 'Reps are required',
                                                                                                                                                                        validate: (value) =>
                                                                                                                                                                            value > 0 || "Reps must be greater than 0",
                                                                                                                                                                    })}
                                                                                                                                                                    customClass='bg-0 py-2 px-0 br-none b-none input-placeholder-font-3 input-text-placeholder-neutral-800 input-text-neutral-400 input-font-3 input-p-0'
                                                                                                                                                                    style={{
                                                                                                                                                                        width: "fit-content",
                                                                                                                                                                        maxWidth: "15px",
                                                                                                                                                                    }}
                                                                                                                                                                    onChange={(e) => {
                                                                                                                                                                        handleInputChange(exercise.exercise_id, "reps", e.target.value);
                                                                                                                                                                    }}
                                                                                                                                                                    placeholder="10"
                                                                                                                                                                    readOnly={!exerciseState[exercise.exercise_id]?.checked }
                                                                                                                                                                />
                                                                                                                                                                {exerciseForm.formState.errors.reps && (
                                                                                                                                                                    <p className="text-danger">{exerciseForm.formState.errors.reps.message}</p>
                                                                                                                                                                )}
                                                                                                                                                                <p className="font-3 font-medium text-neutral-600">reps</p>
                                                                                                                                                            </>
                                                                                                                                                        ]}
                                                                                                                                                    />
                                                                                                                                                </>
                                                                                                                                            ]}
                                                                                                                                        />
                                                                                                                                    </>
                                                                                                                                ]}
                                                                                                                            />
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <Checkbox
                                                                                                        checkboxClass="b-4 outline-neutral-800 fill-neutral-1100 align-self-center"
                                                                                                        checkColor="hsl(210, 70%, 40%)"
                                                                                                        onChange={() => handleCheckbox(exercise.exercise_id)}
                                                                                                        label={[
                                                                                                            <p></p>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ))
                                                                            )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                        footer={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass="pt-6 gap-3 text-center"
                                                                    axis={true}
                                                                    fitParent={true}
                                                                    items={[
                                                                        <>
                                                                            <Container
                                                                                customClass="bg-neutral-1000 py-3 b-3 outline-neutral-700 br-sm"
                                                                                fitParent={true}
                                                                                isClickable={true}
                                                                                onClick={() => {
                                                                                    onSubmitExercises();
                                                                                    handleCloseModal();
                                                                                }}
                                                                                content={[
                                                                                    <>
                                                                                        <p className="font-semibold text-neutral-600">CONFIRM</p>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                            <Container
                                                                                customClass="bg-neutral-700 py-3 br-sm"
                                                                                fitParent={true}
                                                                                isClickable={true}
                                                                                onClick={() => {
                                                                                    handleCloseModal();
                                                                                }}
                                                                                content={[
                                                                                    <>
                                                                                        <p className="font-semibold text-neutral-1000">CANCEL</p>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                    )}
                </form>
            </Modal>
            <Modal
                id="medication"
                isOpen={activeModal === "medication"}
                onClose={handleCloseModal}
            >
                <>
                    <ItemGroup
                        customClass="px-2 pt-2 gap-5 text-start"
                        axis={true}
                        style={{
                            gridAutoColumns: "30vw"
                        }}
                        items={[
                            <form>
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={true}
                                    fitParent={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="bg-neutral-1100 p-6"
                                                fitParent={true}
                                                headerClass="py-3"
                                                header={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="p-0 align-items-center justify-content-space-between"
                                                            axis={false}
                                                            fitParent={true}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <h2 className="font-semibold text-neutral-600">
                                                                        GENERATE PRESCRIPTION
                                                                    </h2>
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="hideScroll px-0 pt-5 pb-5"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-8"
                                                            axis={true}
                                                            fitParent={true}
                                                            style={{
                                                                maxHeight: "200px"
                                                            }}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-1"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4 font-semibold text-neutral-600">MEDICATION</p>
                                                                                <InputBar
                                                                                    {...medicationForm.register('medication', { required: 'Medication is required' })}
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    onChange={(e) => medicationForm.setValue('medication', e.target.value)}
                                                                                    placeholder="e.g. Ozempic"
                                                                                />
                                                                                {medicationForm.formState.errors.medication && (
                                                                                    <p className="text-danger">{medicationForm.formState.errors.medication.message}</p>
                                                                                )}
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-1"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4 font-semibold text-neutral-600">DOSAGE</p>
                                                                                <InputBar
                                                                                    {...medicationForm.register('dosage', { required: 'Dosage is required' })}
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    onChange={(e) => medicationForm.setValue('dosage', e.target.value)}
                                                                                    placeholder="e.g. 20 mg"
                                                                                />
                                                                                {medicationForm.formState.errors.dosage && (
                                                                                    <p className="text-danger">{medicationForm.formState.errors.dosage.message}</p>
                                                                                )}
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-1"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4 font-semibold text-neutral-600">DURATION</p>
                                                                                <InputBar
                                                                                    {...medicationForm.register('duration', { required: 'Duration is required' })}
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    onChange={(e) => medicationForm.setValue('duration', e.target.value)}
                                                                                    placeholder="e.g. 14 days"
                                                                                />
                                                                                {medicationForm.formState.errors.duration && (
                                                                                    <p className="text-danger">{medicationForm.formState.errors.duration.message}</p>
                                                                                )}
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-1"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <p className="font-4 font-semibold text-neutral-600">INSTRUCTIONS</p>
                                                                                <CustomTextArea
                                                                                    {...medicationForm.register('instructions', { required: 'Instructions is required' })}
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    onChange={(e) => medicationForm.setValue('instructions', e.target.value)}
                                                                                    placeholder="Keep it short..."
                                                                                />
                                                                                {medicationForm.formState.errors.instructions && (
                                                                                    <p className="text-danger">{medicationForm.formState.errors.instructions.message}</p>
                                                                                )}
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                footer={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-neutral-1000 py-3 b-3 outline-neutral-700 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={medicationForm.handleSubmit(onSubmitOrder)}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-600">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <Container
                                                                        customClass="bg-neutral-700 py-3 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={() => {
                                                                            medicationForm.reset();
                                                                            handleCloseModal();
                                                                        }}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-1000">CANCEL</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            </form>
                        ]}
                    />
                </>
            </Modal>
            <Container
                customClass="p-5"
                fitParent={true}
                content={[
                    <>
                        <ItemGroup
                            customClass="gap-5"
                            axis={true}
                            fitParent={true}
                            style={{
                                gridAutoRows: "auto 1fr"
                            }}
                            items={[
                                <>
                                    <Container
                                        customClass="gradient-light br-sm b-3 outline-neutral-1100 py-5"
                                        fitParent={true}
                                        headerClass="px-10"
                                        header={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-0"
                                                    fitParent={true}
                                                    stretch={true}
                                                    axis={true}
                                                    items={[
                                                        <>
                                                            <ItemGroup
                                                                customClass="justify-content-center justify-items-center align-items-center text-align-center pt-2"
                                                                fitParent={true}
                                                                stretch={true}
                                                                axis={false}
                                                                style={{
                                                                    gridAutoColumns: "1fr"
                                                                }}
                                                                items={[
                                                                    <>
                                                                        {tabs.map((tab) => (
                                                                            <ItemGroup
                                                                                customClass={`text-align-center justify-content-center py-3 br-top-sm ${activeTab === tab.id ? "b-bottom-10 outline-primary-dark-600" : "text-dark-200 b-bottom-4 outline-primary-dark-600"}`}
                                                                                key={tab.id}
                                                                                axis={false}
                                                                                stretch={true}
                                                                                fitParent={true}
                                                                                isClickable={true}
                                                                                onClick={() => setActiveTab(tab.id)}
                                                                                items={[
                                                                                    <>
                                                                                        <p className={`font-4 font-semibold ${activeTab === tab.id ? "text-dark-300" : "text-dark-200"}`}>{tab.label}</p>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        ))}
                                                                    </>
                                                                ]}
                                                            />

                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                        contentClass="px-10"
                                        content={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-6 scrollable postList pr-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    style={{
                                                        maxHeight: "587px"
                                                    }}
                                                    items={[
                                                        <>
                                                            <div></div>
                                                            <div></div>
                                                            {tabContent[activeTab]}
                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                    />
                                </>
                            ]}
                        />
                    </>
                ]}
            />
        </>
    );
}

export default DDProfile;