import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import Checkbox from '../../components/General/CheckboxRefactored';
import Modal from '../../components/General/Modal';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import  DoctorDashboardViewModel  from '../../viewModels/DDViewModel'; 

function DDProfile() {
    const { currentUser } = useContext(UserContext);
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    const navigate = useNavigate();
    
    const { patientId } = useParams();
    const defaultPatientId = 1;
    const currentPatientId = patientId ? parseInt(patientId, 10) : defaultPatientId;

    console.log('patientID:', currentPatientId);
    const { data, status, isLoading, isError, error } = DoctorDashboardViewModel.useDoctorPatient(currentPatientId);
    console.log('data:', data);
    console.log(`isLoading: ${isLoading}`)
    console.log(`error: ${error}`)

    //const pastAppointments = dashboardLayoutViewModel.getPastAppointmentsSorted(currentPatientId);

    console.log('patient data:', data);

    if (isLoading) return <p>Loading…</p>;
    if (isError)   return <p>Error: {error.message}</p>;

    const nextAppt = dashboardLayoutViewModel.getNextUpcomingAppointment(data.nextAppointment);

    const [activeModal, setActiveModal] = useState(null);

    const handleOpenModal = (modalId) => {
        setActiveModal(modalId);
    }

    const handleCloseModal = () => {
        setActiveModal(null);
    }

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
                                                                        <p className="font-4">MRN</p>
                                                                        <InputBar
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={data.patientInfo.user_id}
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
                                                                            value={data.patientInfo.gender}
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
                                                                            value={data.patientInfo.dob}
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
                                                                                placeholder=""
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
                                                                                placeholder=""
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
                                                                                placeholder=""
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
                                                                                placeholder=""
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
                                                                                placeholder=""
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
                                        contentClass="p-5 scrollable postList"
                                        content={[
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
                                                                                                                            <p className="font-3 font-medium text-neutral-600">
                                                                                                                                {dashboardLayoutViewModel.splitDateTime(nextAppt.start_date).date}
                                                                                                                            </p>
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
                                                                                                    {nextAppt.doctor_name}
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
                                                                                                    {nextAppt.treatment}
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
                                                                                                {dashboardLayoutViewModel.splitDateTime(nextAppt.start_date).time}
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
                                        contentClass="p-5 scrollable postList"
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
                                                                                                                                <p className="font-3 font-medium text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(appt.appointmentDate)}</p>
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
                                                                                                        {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).lastName}
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
                                                                                                    <h5 className="font-3 text-neutral-600">NOTES</h5>
                                                                                                    <p className="font-3 font-medium text-neutral-600 text-justify">
                                                                                                        {appt.notes}
                                                                                                    </p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ))
                                                                )*/
                                                            }
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
                                        contentClass="px-5 pt-7 pb-3"
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
                                                    customClass="gap-0"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {/*
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map(() => (
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass=" py-5 position-relative hover-parent"
                                                                                axis={false}
                                                                                fitParent={true}
                                                                                stretch={true}
                                                                                style={{
                                                                                    gridAutoColumns: "250px"
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
                                                                )*/
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
                                                <h5 className="font-5 text-dark-300 font-semibold">Medication History</h5>
                                            </>
                                        ]}
                                        contentClass="px-5 pt-7 pb-3"
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
                                                    customClass="gap-0"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {/*
                                                                dashboardLayoutViewModel.getUsers().length > 0 && (
                                                                    dashboardLayoutViewModel.getUsers().map(() => (
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass=" py-5"
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
                                                                )*/
                                                            }
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
                                                            {/*
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map(() => (
                                                                        <>
                                                                            {// This is the element that wraps the entire card. When this is hovered over, the below element should be visible }
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
                                                                                                    {// This is the element that needs to be invisible until the wrapper element is hovered over }
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
                                                                    pastAppointments.map(() => (
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
                                                            <h5 className="font-semibold font-5 text-neutral-700">INSERT GRAPH HERE</h5>
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
                                                                                                <p className="font-4">What is your height in centimeters?</p>
                                                                                                <InputBar
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
                                                                                                <p className="font-4">How many cups of water did you drink?</p>
                                                                                                <InputBar
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
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    placeholder="e.g. Ozempic"
                                                                                />
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
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    placeholder="e.g. 20 mg"
                                                                                />
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
                                                                                    customClass='bg-neutral-expanded-1100 py-2 px-0 br-none b-bottom-5 outline-neutral-600 input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-200 input-font-4 input-p-0'
                                                                                    placeholder="e.g. 14 days"
                                                                                />
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

export default DDProfile;