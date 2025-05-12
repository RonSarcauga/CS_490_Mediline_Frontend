import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import Checkbox from '../../components/General/CheckboxRefactored';
import Modal from '../../components/General/Modal';
import ExerciseChart from '../../components/Dashboard/ExerciseChart';
import { UserContext } from '../../context/UserProvider';
import { fetchPatientExerciseList, fetchExerciseList, fetchChartData, fetchMedicationList, submitForm, submitExercise, updateExerciseStatus } from '../../viewModels/ExercisePage.js';
import { BsCircleHalf } from "react-icons/bs";
import { BsClipboard2HeartFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import ECCheckbox from '../../components/General/ECCheckbox';
import { overviewVM } from '../../viewModels/OverviewViewModel';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import Spinner from '../../components/General/Spinner';

function PDProfile() {
    const [showNewElement, setShowNewElement] = useState(false);
    const [exerciseData, setExerciseData] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [medicationList, setMedicationList] = useState([]);
    const { currentUser } = useContext(UserContext);
    const [selectedExercises, setSelectedExercises] = useState({});

    const navigate = useNavigate();

    const [activeModal, setActiveModal] = useState(null);

    const [windowStart, setWindowStart] = useState(0);
    const windowSize = 7; // Show 7 data points at a time
    const windowEnd = windowStart + windowSize;

    const handleOpenModal = (modalId) => {
        setActiveModal(modalId);
    }

    const handleCloseModal = () => {
        setActiveModal(null);
    }

    const [selectedGraph, setSelectedGraph] = useState("graph1");
    const graphs = [
        { id: "graph1", label: "Exercise" },
        { id: "graph2", label: "Weight" },
        { id: "graph3", label: "Sleep" },
        { id: "graph4", label: "Height" },
        { id: "graph5", label: "Calories" },
    ]

    //const setGraphStateEc = () => {
    //    setGraphState("exercise");
    //}
    //const setGraphStateWa = () => {
    //    setGraphState("water");
    //}
    //const setGraphStateSl = () => {
    //    setGraphState("sleep");
    //}

    useEffect(() => {
        const fetchData1 = async () => {
            const data = await fetchPatientExerciseList(currentUser.user_id);
            if (data) {
                setExerciseData(data); // Store the data in state
            }
        };

        fetchData1();
    }, []);
    useEffect(() => {
        const fetchData2 = async () => {
            const data = await fetchExerciseList();
            if (data) {
                setExerciseList(data); // Store the data in state
            }

        };

        fetchData2();
    }, []);
    useEffect(() => {
        const fetchData3 = async () => {
            const data = await fetchChartData(currentUser.user_id);
            if (data) {
                setChartData(data); // Store the data in state
            }
        };

        fetchData3();
    }, []);
    useEffect(() => {
        const fetchData4 = async () => {
            const data = await fetchMedicationList(currentUser.user_id);
            if (data) {
                setMedicationList(data); // Store the data in state
            }
        };

        fetchData4();
    }, []);
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


    const handleExerciseStatusToggle = async (exerciseId, currentStatus, reps, pEID) => {
        let newStatus;
        if (currentStatus === "COMPLETED") {
            newStatus = "IN_PROGRESS";
        } else {
            newStatus = "COMPLETED";
        }
        // Wait 1 second before updating to the real new status
        setTimeout(async () => {
            setExerciseData(prev =>
                prev.map(ex =>
                    ex.exercise_id === exerciseId ? { ...ex, status: newStatus } : ex
                )
            );
            try {
                console.log("Exercise ID:", exerciseId);
                console.log("New Status:", newStatus);
                await updateExerciseStatus(pEID, newStatus, reps);
            } catch (err) {
                // Optionally: revert UI or show error
            }
        }, 1000); // 1000ms = 1 second
    };

    const handleCheckboxChange = (exercise) => {
        const exerciseKey = exercise.exercise_id; // Use exercise_id as the unique identifier
        setSelectedExercises((prevSelected) => {
            if (prevSelected[exerciseKey] !== undefined) {
                // Remove exercise if already selected
                const { [exerciseKey]: _, ...rest } = prevSelected;
                return rest;
            } else {
                // Add exercise if not already selected
                return { ...prevSelected, [exerciseKey]: "" }; // Default reps to an empty string
            }
        });
    };

    const handleRepsChange = (exercise, reps) => {
        const exerciseKey = exercise.exercise_id; // Use exercise_id as the unique identifier
        setSelectedExercises((prevSelected) => ({
            ...prevSelected,
            [exerciseKey]: reps, // Update reps for the selected exercise
        }));
    };

    const handleSubmitExercises = async () => {
        console.log("Selected Exercises with Reps:", selectedExercises);
        await submitExercise(selectedExercises, currentUser.user_id, currentUser.doctor.doctor_id);
        setSelectedExercises({}); // Optionally clear after submit

        // Re-fetch exercise data to update the UI
        const updatedExerciseData = await fetchPatientExerciseList(currentUser.user_id);
        if (updatedExerciseData) {
            setExerciseData(updatedExerciseData);
        }

        handleCloseModal();
    };

    //useEffect(() => {
    //    const fetchEncountersData = async () => {
    //        const data = await this.fetchChartData(currentUser.user_id);
    //        if (data) {
    //            setChartData(data); // Store the data in state
    //        }
    //    };

    //    fetchEncountersData();
    //}, []);

    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        { id: "tab1", label: "Overview" },
        { id: "tab2", label: "Encounters" },
        { id: "tab3", label: "Medications" },
        { id: "tab4", label: "Regimens" },
        { id: "tab5", label: "Graphs" },
        { id: "tab6", label: "Forms" },
    ]

    useEffect(() => {
        fetchData();
    }, [])

    // Asynchronous fucntion to fetch all the data that is needed for the profile page
    const fetchData = async () => {
        const result = await overviewVM.fetchData(currentUser.user_id, currentUser.doctor);
        setData(result);
        setLoading(false);

        console.log(`Profile Data:\n${JSON.stringify(result, null, 2)}`);
    }

    // Used to manage data from API calls
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // State to track whether the form is in edit mode
    const [editingStates, setEditingStates] = useState({});

    const toggleEditingState = (formId) => {
        setEditingStates((prevStates) => ({
            ...prevStates,
            [formId]: !prevStates[formId],
        }));
    };

    // Contact Info Form
    const contactInfo = useForm();
    const onSubmitContactInfo = (data) => {
        setLoading(true);
        console.log('Contact Info:', data);
        overviewVM.updateInfo(currentUser.user_id, data);
        setLoading(false);
    };

    // Pharmacy Form
    const pharmacyInfo = useForm();
    const onSubmitPharmacyInfo = (data) => {
        setLoading(true);
        console.log('Pharmacy Info:', data);
        overviewVM.updateInfo(currentUser.user_id, data);
        setLoading(false);
    };

    function checkSubmission() {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayStr = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');

        const alreadySubmitted = chartData.dates && chartData.dates.some(dateStr => {
            const dateObj = new Date(dateStr);
            const dateOnly = dateObj.getFullYear() + '-' +
                String(dateObj.getMonth() + 1).padStart(2, '0') + '-' +
                String(dateObj.getDate()).padStart(2, '0');
            return dateOnly === todayStr;
        });

        return alreadySubmitted
    }

    // Survey Form
    const survey = useForm();
    const onSubmitSurvey = async (data) => {
        if (checkSubmission()) {
            alert("You have already submitted the form today.");
            return;
        }

        // Proceed with submission
        await overviewVM.submitSurvey(currentUser.user_id, currentUser.doctor.doctor_id, data);
        // Re-fetch chart data and update state
        const updatedChartData = await fetchChartData(currentUser.user_id);
        setChartData(updatedChartData);
    };

    useEffect(() => {
        if (!editingStates.contactInfo) {
            // Reset form values to currentUser data when exiting edit mode
            contactInfo.setValue('email', currentUser.email);
            contactInfo.setValue('phone', currentUser.phone);
            contactInfo.setValue('address', currentUser.address1);
            contactInfo.setValue('city', currentUser.city);
            contactInfo.setValue('state', currentUser.state);
            contactInfo.setValue('zipcode', currentUser.zipcode);
        }
    }, [editingStates.contactInfo, contactInfo, currentUser]);

    // Loading component
    if (loading) return (
        <Container
            customClass="align-items-center justify-content-center"
            fitParent={true}
            content={[
                <>
                    <Spinner size={64} />
                </>
            ]}
        />
    );

    if (!data) return (
        <Container
            customClass="align-items-center justify-content-center"
            fitParent={true}
            content={[
                <>
                    <p>Error loading data</p>
                </>
            ]}
        />
    );

    const tabContent = {
        tab1: (
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
                                                                            value={currentUser.firstName}
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
                                                                            value={currentUser.lastName}
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
                                                                            value={dashboardLayoutViewModel.capitalize(currentUser.sex)}
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
                                                                            value={dashboardLayoutViewModel.formatBirthDate(currentUser.dob, "MM-DD-YYYY")}
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
                                                            <Container
                                                                isClickable={true}
                                                                onClick={() => {
                                                                    toggleEditingState('contactInfo');
                                                                    console.log(`Readonly? ${editingStates.contactInfo}`);
                                                                }}
                                                                content={[
                                                                    <>
                                                                        {editingStates.contactInfo ? (
                                                                            // Edit button when editing is true
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 1024 750"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill="hsl(0, 60%, 50%)" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                                                                                    </g>
                                                                                </svg>
                                                                            </BaseIcon>
                                                                        ) : (
                                                                            // Edit button when editing is false
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier" />
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="hsl(200, 30%, 35%)" />
                                                                                </svg>
                                                                            </BaseIcon>
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
                                                                                {...contactInfo.register('email', { required: 'Email is required' })}
                                                                                customClass="bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0"
                                                                                placeholder="Enter your email"
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.email && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.email.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('phone', { required: 'Phone number is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your phone number"
                                                                                onChange={(e) => contactInfo.setValue('phone', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.phone && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.phone.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('address', { required: 'Address is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your address"
                                                                                onChange={(e) => contactInfo.setValue('address', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.address && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.address.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('city', { required: 'City is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your city"
                                                                                onChange={(e) => contactInfo.setValue('city', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.city && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.city.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('state', { required: 'State is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your state"
                                                                                onChange={(e) => contactInfo.setValue('state', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.state && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.state.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('zipcode', { required: 'Postal code is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your postal code"
                                                                                onChange={(e) => contactInfo.setValue('zipcode', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                            />
                                                                            {contactInfo.formState.errors.zipcode && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.zipcode.message}</p>
                                                                            )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                    {editingStates.contactInfo && (
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-primary-dark-700 py-3 b-3 outline-primary-neutral-200 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={contactInfo.handleSubmit(onSubmitContactInfo)}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-primary-neutral-200">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <Container
                                                                        customClass="bg-primary-neutral-300 py-3 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={() => toggleEditingState('contactInfo')}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-1000">CANCEL</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    )}
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
                                                            {/*<Container
                                                                isClickable={true}
                                                                onClick={() => {
                                                                    toggleEditingState('pharmacyInfo');
                                                                    console.log(`Readonly? ${editingStates.pharmacyInfo}`);
                                                                }}
                                                                content={[
                                                                    <>
                                                                        {editingStates.pharmacyInfo ? (
                                                                            // Edit button when editing is true
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 1024 750"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill="hsl(0, 60%, 50%)" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                                                                                    </g>
                                                                                </svg>
                                                                            </BaseIcon>
                                                                        ) : (
                                                                            // Edit button when editing is false
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="hsl(200, 30%, 35%)" />
                                                                                    </g>
                                                                                </svg>
                                                                            </BaseIcon>
                                                                        )}
                                                                    </>
                                                                ]}
                                                            />*/}
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
                                                                                {...pharmacyInfo.register('pharmacy_name', { required: 'Pharmacy name is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your address"
                                                                                onChange={(e) => pharmacyInfo.setValue('pharmacy_name', e.target.value)}
                                                                                value={data.pharmacyInfo.pharmacy_name}
                                                                                readOnly={true}
                                                                            />
                                                                            {pharmacyInfo.formState.errors.address && (
                                                                                <p className="text-danger">{pharmacyInfo.formState.errors.address.message}</p>
                                                                            )}
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
                                                                                {...pharmacyInfo.register('address', { required: 'Address is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your address"
                                                                                onChange={(e) => pharmacyInfo.setValue('address', e.target.value)}
                                                                                value={data.pharmacyInfo.address1}
                                                                                readOnly={true}
                                                                            />
                                                                            {pharmacyInfo.formState.errors.address && (
                                                                                <p className="text-danger">{pharmacyInfo.formState.errors.address.message}</p>
                                                                            )}
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
                                                                                {...pharmacyInfo.register('city', { required: 'City is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your city"
                                                                                onChange={(e) => pharmacyInfo.setValue('city', e.target.value)}
                                                                                value={data.pharmacyInfo.city}
                                                                                readOnly={true}
                                                                            />
                                                                            {pharmacyInfo.formState.errors.city && (
                                                                                <p className="text-danger">{pharmacyInfo.formState.errors.city.message}</p>
                                                                            )}
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
                                                                                {...pharmacyInfo.register('state', { required: 'State is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your state"
                                                                                onChange={(e) => pharmacyInfo.setValue('state', e.target.value)}
                                                                                value={data.pharmacyInfo.state}
                                                                                readOnly={true}
                                                                            />
                                                                            {pharmacyInfo.formState.errors.state && (
                                                                                <p className="text-danger">{pharmacyInfo.formState.errors.state.message}</p>
                                                                            )}
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
                                                                                {...pharmacyInfo.register('zipcode', { required: 'Postal code is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your postal code"
                                                                                onChange={(e) => pharmacyInfo.setValue('zipcode', e.target.value)}
                                                                                value={data.pharmacyInfo.zipcode}
                                                                                readOnly={true}
                                                                            />
                                                                            {pharmacyInfo.formState.errors.zipcode && (
                                                                                <p className="text-danger">{pharmacyInfo.formState.errors.zipcode.message}</p>
                                                                            )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                    {editingStates.pharmacyInfo && (
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-primary-dark-700 py-3 b-3 outline-primary-neutral-200 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={pharmacyInfo.handleSubmit(onSubmitPharmacyInfo)}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-primary-neutral-200">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <Container
                                                                        customClass="bg-primary-neutral-300 py-3 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={() => toggleEditingState('pharmacyInfo')}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-1000">CANCEL</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    )}
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
                                        customClass="bg-primary-dark-600 br-sm p-5"
                                        fitParent={true}
                                        content={[
                                            <>
                                                <h5 className="font-5 text-dark-300 font-semibold">Actions</h5>
                                            </>
                                        ]}
                                    />
                                    <ItemGroup
                                        customClass="gap-5 px-2"
                                        axis={true}
                                        fitParent={true}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass="align-items-center gap-6 bg-primary-dark-600 pl-8 pr-2 py-6 br-sm align-items-center justify-items-center hover-box-shadow-sm shadow-primary-neutral-400"
                                                    axis={false}
                                                    stretch={true}
                                                    isClickable={true}
                                                    onClick={() => navigate(`/dashboard/${currentUser.role}/profile/find-a-doctor`)}
                                                    items={[
                                                        <>
                                                            <BaseIcon
                                                                height="50px"
                                                                width="50px"
                                                                fill="hsl(200, 30%, 35%)"
                                                                viewBox="-32 0 512 512">
                                                                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                                                            </BaseIcon>
                                                            <ItemGroup
                                                                customClass="gap-1"
                                                                axis={true}
                                                                style={{
                                                                    maxWidth: "150px"
                                                                }}
                                                                items={[
                                                                    <>
                                                                        <p className="font-4 font-semibold text-dark-300">Find A Doctor</p>
                                                                        <p className="font-3 font-medium text-dark-300">Need a partner? Start here</p>
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
        ),
        tab2: (
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
                                        contentClass={`hideScroll ${data.upcomingAppointments.length > 0 ? "py-3 px-5" : "px-0 py-5"}`}
                                        content={[
                                            <>
                                                {
                                                    data.upcomingAppointments.length > 0 ? (
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
                                                    data.pastAppointments.length > 0 ? (
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
        ),
        tab3: (
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
                                                    fitParent={true}
                                                    stretch={true}
                                                    items={[
                                                        <>
                                                            <h5 className="font-5 text-dark-300 font-semibold">Active Medications</h5>
                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                        contentClass={`hideScroll pt-7 pb-5 ${Array.isArray(data.activeMedications) && data.activeMedications.length > 0 ? 'px-5' : ''}`}
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
                                        contentClass={`pt-7 pb-5 ${Array.isArray(data.pastMedications) && data.pastMedications.length > 0 ? 'px-5' : ''}`}
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
        ),
        tab4: (
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
                                                    fitParent={true}
                                                    stretch={true}
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
                                        contentClass="p-5 hideScroll"
                                        content={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {
                                                                //exerciseData.map((ecc1, index) => (
                                                                //    <ECCheckbox
                                                                //        label={ecc1.type_of_exercise}
                                                                //        reps={ecc1.reps}
                                                                //        personal={true}
                                                                //        id={ecc1.exercise_id}
                                                                //    />
                                                                //))

                                                                dashboardLayoutViewModel.getUsers().length > 0 && (
                                                                    exerciseData
                                                                        .filter((ecc1) => ecc1.status === "IN_PROGRESS")
                                                                        .map((ecc1) => (
                                                                            <>
                                                                                <ItemGroup
                                                                                    key={ecc1.exercise_id}
                                                                                    customClass=" pt-2 pb-6 justify-content-space-between position-relative hover-parent"
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
                                                                                                                    <h5 className="font-4 text-neutral-600 font-semibold">{ecc1.type_of_exercise}</h5>
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
                                                                                                                                            <p className="font-3 font-medium text-neutral-600">{ecc1.reps} reps</p>
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
                                                                                                onChange={() => handleExerciseStatusToggle(ecc1.exercise_id, ecc1.status, ecc1.reps, ecc1.patient_exercise_id)}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ))
                                                                )
                                                            }
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
                                        contentClass="p-5 hideScroll"
                                        content={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {dashboardLayoutViewModel.getUsers().length > 0 ? (
                                                                exerciseData
                                                                    .filter((ecc1) => ecc1.status === "COMPLETED")
                                                                    .map((ecc1) => (
                                                                        <>
                                                                            <ItemGroup
                                                                                key={ecc1.exercise_id}
                                                                                customClass=" pt-2 pb-6 justify-content-space-between position-relative hover-parent"
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
                                                                                                                <h5 className="font-4 text-neutral-600 font-semibold">{ecc1.type_of_exercise}</h5>
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
                                                                                                                                        <p className="font-3 font-medium text-neutral-600">{ecc1.reps} reps</p>
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
                                                                                            onChange={() => handleExerciseStatusToggle(ecc1.exercise_id, ecc1.status, ecc1.reps, ecc1.patient_exercise_id)}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ))
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
                                                                                <p className="font-4 font-semibold text-primary-neutral-100">Complete your first program!</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            )
                                                            /*
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map((appt) => (
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass=" pt-2 pb-6 b-bottom-3 outline-primary-dark-800"
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
                                                                                                    <h5 className="font-4 text-neutral-600 font-semibold">Sit-Up</h5>
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
                                                                                                                                height="16px"
                                                                                                                                width="16px"
                                                                                                                                viewBox="0 1 24 24"
                                                                                                                                fillColor="none">
                                                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                <g id="SVGRepo_iconCarrier">
                                                                                                                                    <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="hsl(0, 0%, 50%)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                </g>
                                                                                                                            </BaseIcon>
                                                                                                                            <p className="font-3 font-medium text-neutral-600">1 min</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
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
                                                                                                                            <p className="font-3 font-medium text-neutral-600">10 reps</p>
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
                                                                    ))
                                                                )
                                                            */}
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
        ),
        tab5: (
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
                                                                            content={[<p className="font-semibold text-primary-neutral-100">◀  Previous</p>]}
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
                                                                            content={[<p className="font-semibold text-primary-neutral-100">Next  ▶</p>]}
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
        ),
        tab6: (
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
                                                                                                                {...survey.register('height', { required: 'Height is required' })}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
                                                                                                            />
                                                                                                            {survey.formState.errors.height && <p className="text-danger">{survey.formState.errors.height.message}</p>}
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
                                                                                                                {...survey.register('weight', { required: 'Weight is required' })}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
                                                                                                            />
                                                                                                            {survey.formState.errors.weight && <p className="text-danger">{survey.formState.errors.weight.message}</p>}
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
                                                                                                            <p className="font-4">How many calories did you burn?</p>
                                                                                                            <InputBar
                                                                                                                {...survey.register('calories_intake', { required: 'Calories burned is required' })}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
                                                                                                            />
                                                                                                            {survey.formState.errors.calories && <p className="text-danger">{survey.formState.errors.calories.message}</p>}
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
                                                                                                                {...survey.register('hours_of_sleep', { required: 'Sleep hours are required' })}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
                                                                                                            />
                                                                                                            {survey.formState.errors.sleep && <p className="text-danger">{survey.formState.errors.sleep.message}</p>}
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
                                                                                                                {...survey.register('hours_of_exercise', { required: 'Exercise hours are required' })}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
                                                                                                            />
                                                                                                            {survey.formState.errors.exercise && <p className="text-danger">{survey.formState.errors.exercise.message}</p>}
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            </>
                                                                                        ]}
                                                                                    />
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        <Container
                                                                            customClass={`${checkSubmission() ? "bg-primary-neutral-500" : "bg-primary-dark-400"} py-3 br-sm text-center`}
                                                                            fitParent={true}
                                                                            isClickable={true && !(checkSubmission())}
                                                                            onClick={survey.handleSubmit(onSubmitSurvey)}
                                                                            content={[
                                                                                <>
                                                                                    {!checkSubmission() ? (
                                                                                        <p className="font-semibold text-primary-neutral-100">SUBMIT</p>
                                                                                    ) : (
                                                                                        <p className="font-semibold text-primary-neutral-100">ALREADY SUBMITTED TODAY</p>
                                                                                    )}
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
        ),
    };

    return (
        <>
            <Modal
                id="exercise"
                isOpen={activeModal === "exercise"}
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
                                                contentClass="hideScroll overflow-x-hidden px-0 pt-5 pb-5 b-bottom-3 outline-neutral-800"
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
                                                                    {
                                                                        <ExerciseList
                                                                            exerciseBank1={exerciseList}
                                                                            currentEcc={exerciseData}
                                                                            selectedExercises={selectedExercises}
                                                                            handleCheckboxChange={handleCheckboxChange}
                                                                            handleRepsChange={handleRepsChange}
                                                                        />
                                                                    /*pastAppointments.length > 0 && (
                                                                        pastAppointments.map(() => (
                                                                            <>
                                                                                <ItemGroup
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
                                                                                                                    <h5 className="font-4 text-neutral-600 font-semibold">Sit-Up</h5>
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
                                                                                                                                                height="16px"
                                                                                                                                                width="16px"
                                                                                                                                                viewBox="0 1 24 24"
                                                                                                                                                fillColor="none">
                                                                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                <g id="SVGRepo_iconCarrier">
                                                                                                                                                    <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="hsl(0, 0%, 50%)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                </g>
                                                                                                                                            </BaseIcon>
                                                                                                                                            <p className="font-3 font-medium text-neutral-600">1 min</p>
                                                                                                                                        </>
                                                                                                                                    ]}
                                                                                                                                />
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
                                                                                                                                            <p className="font-3 font-medium text-neutral-600">10 reps</p>
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
                                                                                                checkColor="hsl(0, 0%, 40%)"
                                                                                                label={[
                                                                                                    <p></p>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ))
                                                                    )*/}
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
                                                                        onClick={handleSubmitExercises}
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
                                                                        onClick={handleCloseModal}
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

function ExerciseList({
    exerciseBank1 = [],
    currentEcc = [],
    selectedExercises,
    handleCheckboxChange,
    handleRepsChange
}) {
    // Filter out exercises that already exist in currentEcc
    const filteredExercises = exerciseBank1.filter(
        (exercise) =>
            !currentEcc.some((ecc) => ecc.exercise_id === exercise.exercise_id)
    );

    return (
        <>
            {filteredExercises.map((exercise) => (
                <ItemGroup
                    key={exercise.exercise_id} // Use unique ID as key!
                    customClass="gap-5 pl-5 pr-5"
                    axis={false}
                    style={{
                        width: "30vw",
                    }}
                    items={[
                        <>
                            <ECCheckbox
                                label={exercise.type_of_exercise}
                                onChange={() => handleCheckboxChange(exercise)}
                                width="10vw"
                            />
                            {selectedExercises[exercise.exercise_id] !== undefined && (
                                <ItemGroup
                                    customClass="gap-5 bg-neutral-1100 ml-5 mt-2 mb-2 p-2 br-xs "
                                    axis={true}
                                    style={{
                                        width: "10vw",
                                    }}
                                    items={[
                                        <InputBar
                                            name={`${exercise.exercise_id}-reps`}
                                            value={selectedExercises[exercise.exercise_id]}
                                            type="number"
                                            onChange={(e) =>
                                                handleRepsChange(exercise, e.target.value)
                                            }
                                            placeholder="Enter reps"
                                            customClass="b-bottom-2 outline-dark-400 bg-0 py-2 pr-1 br-none input-text-neutral-100"
                                        />
                                    ]}
                                />
                            )}
                        </>
                    ]}
                />
            ))}
        </>
    );
}

function Medications({ name = "", duration = "", dosage = "" }) {
    return (
        <ItemGroup
            customClass="p-3 align-items-center gap-3 fit-parent"
            axis={false}
            style={{
                width: "10vw",
            }}
            items={[
                <>
                    <BsCircleHalf />
                    <ItemGroup
                        customClass="fit-parent"
                        axis={true}
                        style={{
                            width: "15vw",
                        }}
                        items={[
                            <div key="name">
                                {name}
                            </div>
                        ]}
                    />
                    <ItemGroup
                        customClass="justify-content-right pl-30"
                        axis={false}
                        style={{
                            width: "10vw",
                        }}
                        items={[
                            <div key="dosage">
                                {duration} Days
                            </div>
                        ]}
                    />
                    <ItemGroup
                        customClass="justify-content-right pl-30"
                        axis={true}
                        style={{
                            width: "10vw",
                        }}
                        items={[
                            <div key="dosage">
                                {dosage}/Day
                            </div>
                        ]}
                    />
                </>
            ]}
        />
    );
}

export default PDProfile;