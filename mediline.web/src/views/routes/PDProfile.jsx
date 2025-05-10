import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import Checkbox from '../../components/General/CheckboxRefactored';
import Modal from '../../components/General/Modal';
import ExerciseChart from '../../components/Dashboard/ExerciseChart';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import { fetchPatientExerciseList, fetchExerciseList, fetchChartData, fetchMedicationList, submitForm, submitExercise } from '../../viewModels/ExercisePage.js';
import { BsCircleHalf } from "react-icons/bs";
import { BsClipboard2HeartFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import ECCheckbox from '../../components/General/ECCheckbox';

function PDProfile() {
    const [showNewElement, setShowNewElement] = useState(false);
    const [graphState, setGraphState] = useState("exercise");
    const [exerciseData, setExerciseData] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [medicationList, setMedicationList] = useState([]);
    const { currentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        exercise: "",
        sleep: "",
        height: "",
        calories: "",
        weight: ""
    });

    const pastAppointments = dashboardLayoutViewModel.getPastAppointments(currentUser.user_id);
    const upcomingAppointments = dashboardLayoutViewModel.getUpcomingAppointments(currentUser.user_id);

    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    //const patientData = dashboardLayoutViewModel.getPatientData(user.id);
    const navigate = useNavigate();

    const [activeModal, setActiveModal] = useState(null);

    const handleOpenModal = (modalId) => {
        setActiveModal(modalId);
    }

    const handleCloseModal = () => {
        setActiveModal(null);
    }
    const setGraphStateEc = () => {
        setGraphState("exercise");
    }
    const setGraphStateWa = () => {
        setGraphState("water");
    }
    const setGraphStateSl = () => {
        setGraphState("sleep");
    }

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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Update the specific field in the state
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted with data:", formData);
        submitForm(formData)
    };


    const [activeTab, setActiveTab] = useState("tab1");

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
                                                {/*<ItemGroup
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
                                                                        <p className="font-4">MRN</p>
                                                                        <InputBar
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={patientData.mrn}
                                                                            readonly={true}
                                                                        />
                                                                    </>
                                                                ]}
                                                            />
                                                        </>
                                                    ]}
                                                />*/}
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
                                        customClass="bg-primary-dark-600 br-sm p-5"
                                        fitParent={true}
                                        content={[
                                            <>
                                                <h5 className="font-5 text-dark-300 font-semibold">Contact Information</h5>
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
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder=""
                                                                                value={currentUser.email}
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
                                                                                placeholder=""
                                                                                value={dashboardLayoutViewModel.formatPhoneNumber(currentUser.phone, "dashes")}
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
                                                                                placeholder=""
                                                                                value={currentUser.address1}
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
                                                                                placeholder=""
                                                                                value={currentUser.city}
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
                                                                                placeholder=""
                                                                                value={currentUser.state}
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
                                                                                placeholder=""
                                                                                value={currentUser.zipcode}
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
                                        customClass="p-0"
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
                                        contentClass={`scrollable postList ${upcomingAppointments.length > 0 ? "p-5" : "px-0 py-5"}`}
                                        content={upcomingAppointments.length > 0 ? (
                                            upcomingAppointments.map((appt) => {
                                                <>
                                                    <ItemGroup
                                                        customClass="gap-5"
                                                        axis={true}
                                                        fitParent={true}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass=" pt-2 pb-6 b-bottom-3 outline-primary-dark-800 justify-content-space-between"
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
                                                                                                    <p className="font-3 font-medium text-neutral-600">
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
                                                                                                                                <p className="font-3 font-medium text-neutral-600">{/*new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })*/}</p>
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
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
                                                                                                    <h5 className="font-3 text-neutral-600">DOCTOR</h5>
                                                                                                    <p className="font-3 font-medium text-neutral-600">
                                                                                                        {/*dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(patientData.doctor).userId).firstName*/} {/*dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(patientData.doctor).userId).lastName*/}
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
                                                                                                        Consultation
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
                                                                                                        {dashboardLayoutViewModel.formatBirthDate(dashboardLayoutViewModel.splitDateTime(appt.appointment.start_date).time)}
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
                                                                                    navigate(`/dashboard/${currentUser.role}/appointment`);
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
                                                </>
                                            })) : (
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
                                        )}
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
                                        contentClass={`scrollable postList ${pastAppointments.length > 0 ? "p-5" : "px-0 py-5"}`}
                                        content={pastAppointments.length > 0 ? (
                                            pastAppointments.map((appt) => {
                                                <>
                                                    <ItemGroup
                                                        customClass="gap-5"
                                                        axis={true}
                                                        fitParent={true}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass=" pt-2 pb-6 b-bottom-3 outline-primary-dark-800"
                                                                    axis={false}
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    isClickable={true}
                                                                    style={{
                                                                        gridAutoColumns: "250px 250px 250px 300px"
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
                                                                                        <p className="font-3 font-medium text-neutral-600">
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
                                                                                                                    <p className="font-3 font-medium text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(dashboardLayoutViewModel.splitDateTime(appt.created_at).date)}</p>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                    </>
                                                                                                ]}
                                                                                            />
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
                                                                                        <h5 className="font-3 text-neutral-600">TREATMENT</h5>
                                                                                        <p className="font-3 font-medium text-neutral-600">
                                                                                            {dashboardLayoutViewModel.getAppointmentData(appt.appointment.appointment_id).treatment}
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
                                                                                        <p className="font-3 font-medium text-neutral-600 text-justify">
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
                                            })) : (
                                                <Container
                                                    customClass="br align-items-center justify-content-center bg-primary-dark-800"
                                                    style={{
                                                        width: "100%",
                                                        height: "128px"
                                                    }}
                                                    content={[
                                                        <>
                                                            <p className="font-4 font-semibold text-primary-neutral-100">You have no appointments on record</p>
                                                        </>
                                                    ]}
                                                />
                                        )}
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
                                                <h5 className="font-5 text-dark-300 font-semibold">Active Medications</h5>
                                            </>
                                        ]}
                                        contentClass="px-5 pt-7 pb-5"
                                        content={[
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
                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                        footerClass="hideScroll px-5"
                                        footer={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {medicationList.map((medication, index) => (
                                                                <Medications key={index} name={medication.name} dosage={medication.dosage} />
                                                            ))

                                                            /*
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map(() => (
                                                                        <>
                                                                            <ItemGroup
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
                                                                                                    <p className="font-3 font-medium text-neutral-600">Ozempic</p>
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
                                                                                                        14 days
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
                                                                                                        4 mg
                                                                                                    </p>
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
                                        contentClass="px-5 pt-7 pb-5"
                                        content={[
                                            <>
                                                <ItemGroup
                                                    customClass=""
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
                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                        footerClass="px-5 hideScroll"
                                        footer={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {/*
                                                                dashboardLayoutViewModel.getUsers().length > 0 && (
                                                                    dashboardLayoutViewModel.getUsers().map(() => (
                                                                        <>
                                                                            <ItemGroup
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
                                                                                                    <p className="font-3 font-medium text-neutral-600">Ozempic</p>
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
                                                                                                        14 days
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
                                                                                                        4 mg
                                                                                                    </p>
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
                                                <h5 className="font-5 text-dark-300 font-semibold">Active Programs</h5>
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
                                                                exerciseData.map((ecc1, index) => (
                                                                    <ECCheckbox
                                                                        label={ecc1.type_of_exercise}
                                                                        reps={ecc1.reps}
                                                                        personal={true}
                                                                        id={ecc1.exercise_id}
                                                                    />
                                                                ))
                                                            /*
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map(() => (
                                                                        <>
                                                                            {// This is the element that wraps the entire card. When this is hovered over, the below element should be visible}
                                                                            <ItemGroup
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
                                                                                                    {// This is the element that needs to be invisible until the wrapper element is hovered over}
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
                                                                                            checkboxClass="b-4 outline-primary-dark-600 fill-primary-dark-600 align-self-center"
                                                                                            checkColor="hsl(210, 20%, 95%)"
                                                                                            label={[
                                                                                                <p></p>
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
                                                            {/*
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
                                                <Container
                                                    customClass="bg-neutral-1100 br-sm align-items-center justify-content-center"
                                                    fitParent={true}
                                                    style={{
                                                        minHeight: "400px"
                                                    }}
                                                    content={[
                                                        <>
                                                            <ItemGroup
                                                                customClass="bg-neutral-1100 br-sm pl-5 pt-5 ml-5 mt-5 fit-parent"
                                                                axis={true}

                                                                items={[
                                                                    <>
                                                                        {graphState === "exercise" && <ExerciseChart inputData={chartData.exercise} inputLabel="Exercise" pointFillColor="hsl(120, 45%, 85%)" lineColor="hsl(120, 45%, 35%)" />}
                                                                        {graphState === "water" && <ExerciseChart inputData={chartData.weight} inputLabel="Weight" pointFillColor="hsl(250, 60%, 80%)" lineColor="hsl(250, 60%, 40%)" />}
                                                                        {graphState === "sleep" && <ExerciseChart inputData={chartData.sleep} inputLabel="Sleep" />}
                                                                    </>
                                                                ]}
                                                            />
                                                            <ItemGroup
                                                                customClass="p-5 mt-5 fit-parent gap-1"
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="bg-neutral-1100 br-right-sm gap-1 p-5 fit-parent"
                                                                            axis={true}
                                                                            isClickable={true}
                                                                            onClick={setGraphStateEc}
                                                                            items={[
                                                                                <>
                                                                                    <h2>Exercise</h2>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        <ItemGroup
                                                                            customClass="bg-neutral-1100 br-right-sm gap-10 p-5 fit-parent"
                                                                            axis={true}
                                                                            isClickable={true}
                                                                            onClick={setGraphStateWa}
                                                                            items={[
                                                                                <>
                                                                                    <h2>Hydration</h2>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        <ItemGroup
                                                                            customClass="bg-neutral-1100 br-right-sm gap-10 p-5 fit-parent"
                                                                            axis={true}
                                                                            isClickable={true}
                                                                            onClick={setGraphStateSl}
                                                                            items={[
                                                                                <>
                                                                                    <h2>Sleep</h2>
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
                                                                        <h1 className="font-5 font-semibold text-primary-neutral-100">Weekly Survey</h1>
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
                                                        <form onSubmit={handleSubmit}>
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
                                                                                                                name="height"
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
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
                                                                                                                name="weight"
                                                                                                                value={formData.weight} // Controlled input
                                                                                                                onChange={handleInputChange} // Update state on input change
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
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
                                                                                                            <p className="font-4">How much calories did you burn?</p>
                                                                                                            <InputBar
                                                                                                                name="calories"
                                                                                                                value={formData.calories} // Controlled input
                                                                                                                onChange={handleInputChange} // Update state on input change
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
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
                                                                                                                name="sleep"
                                                                                                                value={formData.sleep} // Controlled input
                                                                                                                onChange={handleInputChange} // Update state on input change
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
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
                                                                                                                name="exercise"
                                                                                                                value={formData.exercise} // Controlled input
                                                                                                                onChange={handleInputChange}
                                                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                                                placeholder=""
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
                                                                        <Container
                                                                            customClass="bg-primary-dark-400 py-3 br-sm text-center"
                                                                            fitParent={true}
                                                                            isClickable={true}
                                                                            content={[
                                                                                <>
                                                                                    <p className="font-semibold text-primary-neutral-100">SUBMIT</p>
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
                                                                    {/*pastAppointments.length > 0 && (
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
    currentEcc = []
}) {
    const [selectedExercises, setSelectedExercises] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Selected Exercises with Reps:", selectedExercises);
        submitExercise(selectedExercises); // Call the submit function with selected exercises
    };

    // Filter out exercises that already exist in currentEcc
    const filteredExercises = exerciseBank1.filter(
        (exercise) =>
            !currentEcc.some((ecc) => ecc.exercise_id === exercise.exercise_id)
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ItemGroup
                    customClass="p-3 b-bottom-4 ml-2 mt-2 outline-primary-neutral-400"
                    axis={true}
                    style={{
                        width: "54vw",
                    }}
                    items={[
                        <>
                            <h1>Exercise List</h1>
                        </>
                    ]}
                />
                {filteredExercises.map((exercise, index) => (
                    <ItemGroup
                        key={index}
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
                                                value={selectedExercises[exercise.exercise_id]} // Controlled input
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
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </>
    );
}
function Medications({ name = "", dosage = "" }) {
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