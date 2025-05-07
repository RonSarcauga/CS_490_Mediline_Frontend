import { useContext } from 'react';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';

function PDAppointment() {
    const { currentUser } = useContext(UserContext);
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    //const patientData = dashboardLayoutViewModel.getPatientData(user.id);
    //const pastAppointments = dashboardLayoutViewModel.getPastAppointmentsSorted(user.id);
    //const upcomingAppointments = dashboardLayoutViewModel.getUpcomingAppointmentsSorted(user.id);
    console.log(`User ${currentUser.user_id}: ${currentUser.firstName} ${currentUser.lastName} ${currentUser.dob}`);

    return (
        <Container
            customClass="p-0"
            fitParent={true}
            content={[
                <>
                    <ItemGroup
                        customClass="p-5 gap-5"
                        axis={false}
                        stretch={true}
                        fitParent={true}
                        style={{
                            gridAutoColumns: "50vw 1fr"
                        }}
                        items={[
                            <>
                                <ItemGroup
                                    customClass="gap-5"
                                    fitParent={true}
                                    axis={true}
                                    stretch={true}
                                    style={{
                                        gridAutoRows: "auto 1fr",
                                    }}
                                    items={[
                                        <>
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 pt-6 pb-5"
                                                fitParent={true}
                                                headerClass="px-6"
                                                header={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-5"
                                                            fitParent={true}
                                                            stretch={true}
                                                            axis={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="justify-content-space-between align-items-center justify-content-space-between"
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <h1 className="font-6 font-semibold">Booking Information</h1>
                                                                                <ItemGroup
                                                                                    customClass="gap-3"
                                                                                    axis={false}
                                                                                    stretch={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h3 className={`text-neutral-1100 bg-secondary-300 font-semibold font-3 pt-2 pb-2 px-4 br`}>In Progress</h3>
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
                                                                        customClass="b-bottom-3 outline-secondary-400"
                                                                        fitParent={true}
                                                                        axis={true}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}

                                                contentClass="px-6 pt-6 pb-3 align-items-center"
                                                content={[
                                                    <>
                                                        {
                                                            currentUser.doctor !== null ? (
                                                                <>
                                                                    <ItemGroup
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        style={{
                                                                            gridAutoColumns: "300px 1fr",
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="gap-6"
                                                                                    axis={true}
                                                                                    stretch={true}
                                                                                    fitParent={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-4"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h5 className="font-3 text-neutral-600">MEETING TIME</h5>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-3"
                                                                                                            axis={true}
                                                                                                            stretch={true}
                                                                                                            fitParent={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-15 align-items-center"
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
                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">{/*dashboardLayoutViewModel.formatBirthDate(pastAppointments[0].appointmentDate)*/}</p>
                                                                                                                                        </>
                                                                                                                                    ]}
                                                                                                                                />
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
                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">{/*pastAppointments[0].startTime*/}</p>
                                                                                                                                        </>
                                                                                                                                    ]}
                                                                                                                                />
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />
                                                                                                                    <ItemGroup
                                                                                                                        customClass="align-items-center gap-2"
                                                                                                                        axis={false}
                                                                                                                        stretch={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <BaseIcon
                                                                                                                                    height="15px"
                                                                                                                                    width="15px"
                                                                                                                                    viewBox="0 0 24 24"
                                                                                                                                    fillColor="none">
                                                                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                                                                        <path d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V2.25143C12.8612 2.25311 12.9561 2.25675 13.0446 2.26458C14.8548 2.42465 16.2896 3.85953 16.4497 5.66968C16.4643 5.83512 16.4643 6.02256 16.4643 6.29785L16.4643 7.521C16.4643 11.3903 13.5202 14.5719 9.75001 14.9481V17.0001C9.75001 19.3473 11.6528 21.2501 14 21.2501H14.8824C16.2803 21.2501 17.4809 20.3981 17.9902 19.1822C18.03 19.0872 18.0578 18.9789 18.075 18.8547C16.8708 18.4647 16 17.3341 16 16C16 14.3431 17.3432 13 19 13C20.6569 13 22 14.3431 22 16C22 17.4603 20.9567 18.6768 19.5748 18.945C19.5472 19.2085 19.4887 19.4872 19.3738 19.7617C18.6391 21.5156 16.9058 22.7501 14.8824 22.7501H14C10.8244 22.7501 8.25001 20.1757 8.25001 17.0001V14.9495C4.3217 14.5722 1.25001 11.2625 1.25001 7.23529L1.25 6.29791C1.24997 6.02259 1.24995 5.83514 1.26458 5.66968C1.42465 3.85953 2.85954 2.42465 4.66969 2.26458C4.82536 2.25081 5.00051 2.25002 5.25001 2.24999V2C5.25001 1.58579 5.58579 1.25 6.00001 1.25C6.41422 1.25 6.75001 1.58579 6.75001 2V4C6.75001 4.41421 6.41422 4.75 6.00001 4.75C5.58579 4.75 5.25001 4.41421 5.25001 4V3.75002C4.9866 3.7502 4.88393 3.75148 4.80181 3.75875C3.71573 3.85479 2.85479 4.71572 2.75875 5.80181C2.75074 5.8924 2.75001 6.00802 2.75001 6.3369V7.23529C2.75001 10.6871 5.54823 13.4853 9.00001 13.4853C12.294 13.4853 14.9643 10.815 14.9643 7.521V6.3369C14.9643 6.00802 14.9636 5.8924 14.9555 5.80181C14.8595 4.71572 13.9986 3.85479 12.9125 3.75875C12.8702 3.755 12.8224 3.75285 12.75 3.75162V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25Z" stroke="hsl(0, 0%, 50%)" stroke-width="0.8" fill="hsl(0, 0%, 50%)" />
                                                                                                                                    </g>
                                                                                                                                </BaseIcon>
                                                                                                                                <p className="font-3 font-semibold text-neutral-600">Dr. {dashboardLayoutViewModel/*.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).firstName*/} {/*dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).lastName*/}</p>
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
                                                                                                customClass="gap-3"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h5 className="font-3 text-neutral-600">TREATMENT</h5>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-3"
                                                                                                            axis={true}
                                                                                                            stretch={true}
                                                                                                            fitParent={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <p className="font-3 font-semibold text-neutral-600">{/*pastAppointments[0].treatment*/}</p>
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
                                                                                    stretch={true}
                                                                                    fitParent={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-4"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h5 className="font-3 text-neutral-600">PRE-APPOINTMENT CHECKLIST</h5>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-3"
                                                                                                            axis={true}
                                                                                                            stretch={true}
                                                                                                            fitParent={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    {/*<ItemGroup
                                                                                                                        customClass="gap-6 align-items-center"
                                                                                                                        fitParent={true}
                                                                                                                        axis={false}
                                                                                                                        stretch={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <div className="bg-neutral-1100 b-5 outline-primary-neutral-300 br-lg" style={{ height: "11px", width: "11px" }}></div>
                                                                                                                                <ItemGroup
                                                                                                                                    customClass="align-items-center gap-6"
                                                                                                                                    axis={false}
                                                                                                                                    stretch={true}
                                                                                                                                    items={[
                                                                                                                                        <>
                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">Check-In Form</p>
                                                                                                                                            <ItemGroup
                                                                                                                                                items={[
                                                                                                                                                    <>
                                                                                                                                                        <h3 className={`text-success-100 bg-success-500 font-semibold font-3 py-1 px-3 br`}>Completed</h3>
                                                                                                                                                    </>
                                                                                                                                                ]}
                                                                                                                                            />
                                                                                                                                        </>
                                                                                                                                    ]}
                                                                                                                                />
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />*/}
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-6 align-items-center"
                                                                                                                        fitParent={true}
                                                                                                                        axis={false}
                                                                                                                        stretch={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <div className="bg-neutral-1100 b-5 outline-primary-neutral-300 br-lg" style={{ height: "11px", width: "11px" }}></div>
                                                                                                                                <ItemGroup
                                                                                                                                    customClass="align-items-center gap-6"
                                                                                                                                    axis={false}
                                                                                                                                    stretch={true}
                                                                                                                                    items={[
                                                                                                                                        <>
                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">Weekly Survey</p>
                                                                                                                                            <ItemGroup
                                                                                                                                                items={[
                                                                                                                                                    <>
                                                                                                                                                        <h3 className={`text-success-100 bg-success-500 font-semibold font-3 py-1 px-3 br`}>Completed</h3>
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
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <Container
                                                                    customClass="br-sm align-items-center justify-content-center bg-primary-dark-400"
                                                                    fitParent={true}
                                                                    content={[
                                                                        <>
                                                                            <p className="font-4 font-semibold text-primary-neutral-100">It's a bit empty here...</p>
                                                                        </>
                                                                    ]}
                                                                />
                                                            )
                                                        }
                                                    </>
                                                ]}
                                            />
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 p-5"
                                                fitParent={true}
                                                header={[
                                                    <>
                                                        <Container
                                                            customClass="bg-primary-dark-800 p-4 br-sm"
                                                            fitParent={true}
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-4 px-1 align-items-center"
                                                                        axis={false}
                                                                        stretch={true}
                                                                        items={[
                                                                            <>
                                                                                <Container
                                                                                    customClass="align-items-center justify-content-center p-0"
                                                                                    content={[
                                                                                        <>
                                                                                            <BaseIcon
                                                                                                height="30px"
                                                                                                width="30px"
                                                                                                viewBox="0 0 24 24"
                                                                                                fillColor="none">
                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                <g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                    <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                </g>
                                                                                            </BaseIcon>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <h5 className="font-semibold font-5 text-primary-neutral-100">{/*dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).firstName.toUpperCase()} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).lastName.toUpperCase()*/}</h5>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="pt-4"
                                                content={[
                                                    <>
                                                        {/*
                                                            upcomingAppointments.length > 0 ? (
                                                                upcomingAppointments.map((appt) => (
                                                                    <Container
                                                                        customClass="gradient-white br-sm p-5 align-items-center"
                                                                        fitParent={true}
                                                                        content={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="px-4 gap-10"
                                                                                    axis={false}
                                                                                    fitParent={true}
                                                                                    stretch={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <BaseIcon
                                                                                                height="70px"
                                                                                                width="70px"
                                                                                                fillColor='none'
                                                                                                viewBox='0 0 61.7998 61.7998'>
                                                                                                <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />
                                                                                                <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                                <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />
                                                                                                <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />
                                                                                                <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                                <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                                <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                                <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                                <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                            </BaseIcon>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h5 className="font-3 font-semibold">Dr. {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).lastName}</h5>
                                                                                                        <p className="font-3 font-medium">{dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).specialty}</p>
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
                                                                                                        <h5 className="font-3 font-semibold">MEETING TIME</h5>
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
                                                                                                                            <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="hsl(0, 0%, 0%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <p className="font-3 font-medium">{dashboardLayoutViewModel.formatBirthDate(pastAppointments[0].appointmentDate)}</p>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
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
                                                                                                                            <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="hsl(0, 0%, 0%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <p className="font-3 font-medium">{appt.startTime} - {appt.endTime}</p>
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
                                                                                                        <h5 className="font-3 font-semibold">APPOINTMENT TYPE</h5>
                                                                                                        <ItemGroup
                                                                                                            customClass="align-items-center gap-2"
                                                                                                            axis={false}
                                                                                                            stretch={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <BaseIcon
                                                                                                                        height="20px"
                                                                                                                        width="20px"
                                                                                                                        viewBox="0 0.5 24 24"
                                                                                                                        fillColor="none">
                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                            <g stroke="#000000" stroke-width="1.5">
                                                                                                                                <path d="M16 16V8a1 1 0 00-1-1H5a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1z" /> <path stroke-linejoin="round" d="M20 7l-4 3v4l4 3V7z" />
                                                                                                                            </g>
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <p className="font-3 font-medium">{appt.appointmentType}</p>
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
                                                                    customClass="br-sm py-1 px-0 hideScroll"
                                                                    fitParent={true}
                                                                    style={{
                                                                        maxHeight: "300px",
                                                                        gridAutoColumns: "1fr"
                                                                    }}
                                                                    content={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="gap-2"
                                                                                axis={true}
                                                                                fitParent={true}
                                                                                style={{
                                                                                    gridAutoColumns: "1fr"
                                                                                }}
                                                                                items={[
                                                                                    <>
                                                                                        {
                                                                                            dashboardLayoutViewModel.getUsers().map(() => (
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={false}
                                                                                                        fitParent={true}
                                                                                                        evenSplit={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <Container
                                                                                                                    customClass="p-0 justify-content-start"
                                                                                                                    fitParent={true}
                                                                                                                    content={[
                                                                                                                        <>
                                                                                                                            <p className="font-4 font-regular text-dark-300 py-3 px-4 bg-primary-dark-800 br text-justify">Hey, let me tell you something about me and myself</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                                <div></div>
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-2"
                                                                                                        axis={false}
                                                                                                        fitParent={true}
                                                                                                        evenSplit={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <div></div>
                                                                                                                <Container
                                                                                                                    customClass="p-0 justify-content-end"
                                                                                                                    fitParent={true}
                                                                                                                    content={[
                                                                                                                        <>
                                                                                                                            <p className="font-4 font-regular text-neutral-1100 py-3 px-4 bg-primary-600 br text-justify">Have you heard about anything else?</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                </>
                                                                                            ))
                                                                                        }
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                        </>
                                                                    ]}
                                                                />
                                                            )
                                                        */}
                                                    </>
                                                ]}
                                                footerClass="pt-5"
                                                footer={[
                                                    <>
                                                        <InputBar
                                                            customClass="px-3 py-2 input-text-placeholder-neutral-800 input-text-neutral-100"
                                                            placeholder="Type a message"
                                                            sendIcon={
                                                                <BaseIcon width={30} height={30} fillColor="none">
                                                                    <path d="M18.8951 3.61502C19.7248 3.37794 20.492 4.1451 20.2549 4.97489L16.2553 18.9736C15.8267 20.4736 13.823 20.7554 12.9973 19.4317L10.1999 14.947C9.87715 14.4296 9.44039 13.9928 8.92298 13.6701L4.43823 10.8726C3.11455 10.047 3.39632 8.04323 4.89636 7.61465L18.8951 3.61502Z" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M10.1924 13.6777L13.7279 10.1422" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                                </BaseIcon>
                                                            }
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                                <Container
                                    customClass="gradient-light br-sm b-3 outline-neutral-1100 px-10 pt-14 pb-10"
                                    fitParent={true}
                                    content={[
                                        <>
                                            <ItemGroup
                                                customClass="gap-10"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="justify-items-center gap-8"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="justify-items-center gap-8"
                                                                        axis={true}
                                                                        items={[
                                                                            <>
                                                                                <BaseIcon
                                                                                    height="125px"
                                                                                    width="125px"
                                                                                    fillColor='none'
                                                                                    viewBox='0 0 61.7998 61.7998'>
                                                                                    <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />
                                                                                    <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                    <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                    <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />
                                                                                    <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />
                                                                                    <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />
                                                                                    <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                    <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />
                                                                                    <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />
                                                                                    <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                    <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
                                                                                </BaseIcon>
                                                                                <ItemGroup
                                                                                    customClass="justify-items-center gap-4"
                                                                                    axis={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="justify-items-center gap-2"
                                                                                                axis={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h3 className="font-semibold font-6">{currentUser.firstName} {currentUser.lastName}</h3>
                                                                                                        {/*<h3 className="font-regular font-4 text-neutral-600">MRN: {patientData.mrn}</h3>*/}
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="align-items-center gap-2"
                                                                                                axis={false}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-semibold text-neutral-600" style={{ fontSize: "0.9rem" }}>{ dashboardLayoutViewModel.capitalize(currentUser.sex)}</p>
                                                                                                        <div className="bg-neutral-600 br-lg" style={{ height: "9px", width: "9px" }}></div>
                                                                                                        <p className="font-semibold text-neutral-600" style={{ fontSize: "0.9rem" }}>{dashboardLayoutViewModel.formatBirthDate(currentUser.dob)} ({dashboardLayoutViewModel.calculateAge(currentUser.dob)} yrs)</p>
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
                                                                                <Accordion
                                                                                    headerClass="py-4 px-5 br-sm bg-primary-dark-700"
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
                                                                                                                    <BaseIcon
                                                                                                                        height="24px"
                                                                                                                        width="24x"
                                                                                                                        fillColor="none"
                                                                                                                        viewBox="0 0 25 25"
                                                                                                                    >
                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        <g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <h1 className="font-5 font-semibold text-primary-neutral-100">Basic Info</h1>
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
                                                                                    bodyClass="pt-5 pb-3"
                                                                                    body={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <ItemGroup
                                                                                                        customClass="gap-4"
                                                                                                        fitParent={true}
                                                                                                        axis={true}
                                                                                                        stretch={true}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="gap-3"
                                                                                                                    axis={true}
                                                                                                                    stretch={true}
                                                                                                                    fitParent={true}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <h5 className="font-3 text-neutral-600">LAST APPOINTMENT</h5>
                                                                                                                            <ItemGroup
                                                                                                                                customClass="gap-2"
                                                                                                                                axis={true}
                                                                                                                                stretch={true}
                                                                                                                                fitParent={true}
                                                                                                                                items={[
                                                                                                                                    <>
                                                                                                                                        {/*
                                                                                                                                            pastAppointments.length > 0 ? (
                                                                                                                                                <>
                                                                                                                                                    <ItemGroup
                                                                                                                                                        customClass="gap-5"
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
                                                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(pastAppointments[0].appointmentDate)}</p>
                                                                                                                                                                        </>
                                                                                                                                                                    ]}
                                                                                                                                                                />
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
                                                                                                                                                                            <p className="font-3 font-semibold text-neutral-600">{pastAppointments[0].startTime}</p>
                                                                                                                                                                        </>
                                                                                                                                                                    ]}
                                                                                                                                                                />
                                                                                                                                                            </>
                                                                                                                                                        ]}
                                                                                                                                                    />
                                                                                                                                                    <ItemGroup
                                                                                                                                                        customClass="align-items-center gap-2"
                                                                                                                                                        axis={false}
                                                                                                                                                        stretch={true}
                                                                                                                                                        items={[
                                                                                                                                                            <>
                                                                                                                                                                <BaseIcon
                                                                                                                                                                    height="15px"
                                                                                                                                                                    width="15px"
                                                                                                                                                                    viewBox="0 0 24 24"
                                                                                                                                                                    fillColor="none">
                                                                                                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                                                                                                        <path d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V2.25143C12.8612 2.25311 12.9561 2.25675 13.0446 2.26458C14.8548 2.42465 16.2896 3.85953 16.4497 5.66968C16.4643 5.83512 16.4643 6.02256 16.4643 6.29785L16.4643 7.521C16.4643 11.3903 13.5202 14.5719 9.75001 14.9481V17.0001C9.75001 19.3473 11.6528 21.2501 14 21.2501H14.8824C16.2803 21.2501 17.4809 20.3981 17.9902 19.1822C18.03 19.0872 18.0578 18.9789 18.075 18.8547C16.8708 18.4647 16 17.3341 16 16C16 14.3431 17.3432 13 19 13C20.6569 13 22 14.3431 22 16C22 17.4603 20.9567 18.6768 19.5748 18.945C19.5472 19.2085 19.4887 19.4872 19.3738 19.7617C18.6391 21.5156 16.9058 22.7501 14.8824 22.7501H14C10.8244 22.7501 8.25001 20.1757 8.25001 17.0001V14.9495C4.3217 14.5722 1.25001 11.2625 1.25001 7.23529L1.25 6.29791C1.24997 6.02259 1.24995 5.83514 1.26458 5.66968C1.42465 3.85953 2.85954 2.42465 4.66969 2.26458C4.82536 2.25081 5.00051 2.25002 5.25001 2.24999V2C5.25001 1.58579 5.58579 1.25 6.00001 1.25C6.41422 1.25 6.75001 1.58579 6.75001 2V4C6.75001 4.41421 6.41422 4.75 6.00001 4.75C5.58579 4.75 5.25001 4.41421 5.25001 4V3.75002C4.9866 3.7502 4.88393 3.75148 4.80181 3.75875C3.71573 3.85479 2.85479 4.71572 2.75875 5.80181C2.75074 5.8924 2.75001 6.00802 2.75001 6.3369V7.23529C2.75001 10.6871 5.54823 13.4853 9.00001 13.4853C12.294 13.4853 14.9643 10.815 14.9643 7.521V6.3369C14.9643 6.00802 14.9636 5.8924 14.9555 5.80181C14.8595 4.71572 13.9986 3.85479 12.9125 3.75875C12.8702 3.755 12.8224 3.75285 12.75 3.75162V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25Z" stroke="hsl(0, 0%, 50%)" stroke-width="0.8" fill="hsl(0, 0%, 50%)" />
                                                                                                                                                                    </g>
                                                                                                                                                                </BaseIcon>
                                                                                                                                                                <p className="font-3 font-semibold text-neutral-600">Dr. {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(pastAppointments[0].doctorLicenseNumber).userId).lastName}</p>
                                                                                                                                                            </>
                                                                                                                                                        ]}
                                                                                                                                                    />
                                                                                                                                                </>
                                                                                                                                            ) : (
                                                                                                                                                <p className="font-3 font-semibold text-neutral-600">There are no appointments on record</p>
                                                                                                                                            )
                                                                                                                                        */}
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
                                                                                                                            <h5 className="font-3 text-neutral-600">ADDRESS</h5>
                                                                                                                            <p className="font-3 font-semibold text-neutral-600">{currentUser.address1}, {currentUser.city}, {currentUser.state}</p>
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
                                                                                                                            <h5 className="font-3 text-neutral-600">PHONE</h5>
                                                                                                                            <p className="font-3 font-semibold text-neutral-600">+1 {dashboardLayoutViewModel.formatPhoneNumber(currentUser.phone)}</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                            </>
                                                                                                        ]}
                                                                                                    />
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <Accordion
                                                                                    headerClass="py-4 px-5 br-sm bg-primary-dark-700"
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
                                                                                                                    <BaseIcon
                                                                                                                        height="20px"
                                                                                                                        width="20px"
                                                                                                                        viewBox="0 0 24 24"
                                                                                                                        fillColor="none">
                                                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6569 2.75736C15 0.414213 18.799 0.414214 21.1421 2.75736C23.4853 5.1005 23.4853 8.8995 21.1421 11.2426L11.2426 21.1421C8.89949 23.4853 5.1005 23.4853 2.75736 21.1421C0.414214 18.799 0.414213 15 2.75736 12.6569L12.6569 2.75736ZM19.7279 9.82843L15.4853 14.0711L9.82843 8.41421L14.0711 4.17157C15.6332 2.60948 18.1658 2.60948 19.7279 4.17157C21.29 5.73367 21.29 8.26633 19.7279 9.82843Z" fill="hsl(210, 20%, 45%)" />
                                                                                                                            </g>
                                                                                                                        </g>
                                                                                                                    </BaseIcon>
                                                                                                                    <h1 className="font-5 font-semibold text-primary-neutral-100">Medications</h1>
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
                                                                                    bodyClass="pt-5 pb-3"
                                                                                    body={[
                                                                                        <ItemGroup
                                                                                            axis={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <p className="font-3 font-semibold text-neutral-600">You do not have active prescriptions</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    ]}
                                                                                />
                                                                                <Accordion
                                                                                    headerClass="py-4 px-5 br-sm bg-primary-dark-700"
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
                                                                                                                    <BaseIcon
                                                                                                                        height="23px"
                                                                                                                        width="23px"
                                                                                                                        viewBox="0 -2 24 24"
                                                                                                                        fillColor="none">
                                                                                                                        <path d="M14 5.69232H17.2615C17.3185 5.69391 17.3752 5.68386 17.4282 5.66277C17.4812 5.64169 17.5293 5.61001 17.5697 5.56969C17.61 5.52937 17.6417 5.48125 17.6627 5.42826C17.6838 5.37528 17.6939 5.31855 17.6923 5.26155C17.696 5.20433 17.6869 5.14701 17.6656 5.09377C17.6443 5.04053 17.6114 4.99273 17.5692 4.95386L13.5077 0.892319C13.4688 0.850166 13.421 0.817237 13.3678 0.795942C13.3145 0.774647 13.2572 0.765524 13.2 0.769242C13.143 0.76765 13.0862 0.777704 13.0333 0.798789C12.9803 0.819874 12.9322 0.851546 12.8918 0.891869C12.8515 0.932191 12.8198 0.980315 12.7988 1.0333C12.7777 1.08628 12.7676 1.14301 12.7692 1.20001V4.46155C12.7702 4.78766 12.9002 5.10012 13.1308 5.33071C13.3614 5.56131 13.6739 5.6913 14 5.69232Z" fill="#677382" />
                                                                                                                        <path d="M17.0768 7.53846H12.7692C12.2798 7.53744 11.8109 7.34261 11.4648 6.99661C11.1188 6.65061 10.924 6.18162 10.923 5.6923V1.38461C10.923 1.2214 10.8582 1.06488 10.7428 0.949468C10.6274 0.834061 10.4708 0.769226 10.3076 0.769226H4.15377C3.66445 0.770242 3.19547 0.965074 2.84947 1.31107C2.50346 1.65708 2.30863 2.12606 2.30762 2.61538V17.3846C2.30863 17.8739 2.50346 18.3429 2.84947 18.6889C3.19547 19.0349 3.66445 19.2297 4.15377 19.2308H15.8461C16.3354 19.2297 16.8044 19.0349 17.1504 18.6889C17.4964 18.3429 17.6912 17.8739 17.6922 17.3846V8.15384C17.6922 8.07303 17.6763 7.99301 17.6454 7.91834C17.6145 7.84368 17.5691 7.77584 17.512 7.7187C17.4548 7.66155 17.387 7.61623 17.3123 7.5853C17.2377 7.55437 17.1577 7.53846 17.0768 7.53846ZM4.76916 6.92307C4.77603 6.76385 4.84365 6.61332 4.95812 6.50244C5.07258 6.39155 5.22518 6.32874 5.38454 6.32692H7.90377C7.98256 6.32641 8.06069 6.34143 8.13368 6.37112C8.20667 6.4008 8.27309 6.44457 8.32916 6.49993C8.38524 6.55529 8.42986 6.62115 8.46048 6.69375C8.4911 6.76636 8.50711 6.84428 8.50762 6.92307V7.53461C8.50274 7.6949 8.43663 7.84723 8.32288 7.96026C8.20913 8.07329 8.05639 8.13844 7.89608 8.1423H5.38454C5.30431 8.14387 5.22458 8.12923 5.15014 8.09924C5.07571 8.06926 5.00809 8.02455 4.95134 7.96781C4.8946 7.91106 4.84989 7.84345 4.81991 7.76901C4.78993 7.69457 4.77528 7.61485 4.77685 7.53461L4.76916 6.92307ZM13.9999 14.9115C13.9999 15.0747 13.9351 15.2313 13.8197 15.3467C13.7043 15.4621 13.5477 15.5269 13.3845 15.5269H5.38454C5.22133 15.5269 5.0648 15.4621 4.9494 15.3467C4.83399 15.2313 4.76916 15.0747 4.76916 14.9115V14.3077C4.76916 14.1445 4.83399 13.988 4.9494 13.8725C5.0648 13.7571 5.22133 13.6923 5.38454 13.6923H13.3845C13.5477 13.6923 13.7043 13.7571 13.8197 13.8725C13.9351 13.988 13.9999 14.1445 13.9999 14.3077V14.9115ZM15.2307 11.2192C15.2322 11.301 15.2174 11.3823 15.1872 11.4583C15.157 11.5343 15.1119 11.6035 15.0546 11.6618C14.9973 11.7202 14.9289 11.7666 14.8535 11.7982C14.7781 11.8299 14.6971 11.8462 14.6153 11.8461H5.38454C5.22133 11.8461 5.0648 11.7813 4.9494 11.6659C4.83399 11.5505 4.76916 11.394 4.76916 11.2308V10.6154C4.76916 10.4522 4.83399 10.2956 4.9494 10.1802C5.0648 10.0648 5.22133 10 5.38454 10H14.6153C14.7785 10 14.935 10.0648 15.0505 10.1802C15.1659 10.2956 15.2307 10.4522 15.2307 10.6154V11.2192Z" fill="hsl(210, 20%, 45%)" />
                                                                                                                    </BaseIcon>
                                                                                                                    <h1 className="font-5 font-semibold text-primary-neutral-100">Forms</h1>
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
                                                                                    bodyClass="pt-5 pb-3"
                                                                                    body={[
                                                                                        <ItemGroup
                                                                                            axis={true}
                                                                                            stretch={true}
                                                                                            items={[
                                                                                                <>
                                                                                                    <p className="font-3 font-semibold text-neutral-600">You do not have any forms</p>
                                                                                                </>
                                                                                            ]}
                                                                                        />
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
                        ]}
                    />
                </>
            ]}
        />
    );
}

export default PDAppointment;