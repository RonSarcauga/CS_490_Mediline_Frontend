import React, { useRef, useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import DropdownMenu from '../../components/General/DropdownMenu';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import  DoctorDashboardViewModel  from '../../viewModels/DDViewModel'; 


function DDHome() {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    const [patientsByDate, setPatientsByDate] = useState([]);
    const { currentUser } = useContext(UserContext);
    const isoDate = new Date(selectedDate).toISOString().split('T')[0];
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    //const doctorData = dashboardLayoutViewModel.getDoctorData(user.id);
    //const todaysAppointments = dashboardLayoutViewModel.getTodaysAppointments(user.id);
    //const selectedAppointments = dashboardLayoutViewModel.getAppointmentsByDate(user.id, selectedDate);
    //const patients = dashboardLayoutViewModel.getPatients(doctorData.licenseNumber);
    const days = dashboardLayoutViewModel.getCurrentWeekDays();
    const hours = Array.from({ length: 15 }, (_, i) => 8 + i);

    const { data, status, isLoading, isError, error } = DoctorDashboardViewModel.useDoctorHome(currentUser.user_id);
    //console.log('data:', data);
    //console.log(`isLoading: ${isLoading}`)
    //console.log(`error: ${error}`)

    const { data: patientsToday = [] } =  DoctorDashboardViewModel.usePatientsByDate(currentUser.user_id, isoDate);
    //console.log('pats:', patientsToday);
    const [onlyTodaysPatients, setInitialPatientCount] = useState(null);
    useEffect(() => {
        if (
            Array.isArray(patientsToday) &&
            onlyTodaysPatients === null
        ) {
            setInitialPatientCount(patientsToday.length);
        }
    }, [patientsToday, onlyTodaysPatients]);

    const navigate = useNavigate();

    const handleDateSelect = async (date) => {
        const formattedDate = `${date.month} ${date.date}, ${date.year}`;
 
        setSelectedDate(formattedDate);
    }

    //console.log(`Selected date: ${JSON.stringify(selectedDate, null, 2)}`);
    //console.log(`Upcoming Appointments: ${JSON.stringify(dashboardLayoutViewModel.getUpcomingAppointmentsDoctor(doctorData.licenseNumber), null, 2)}`);
    //console.log(`Appointments: ${JSON.stringify(dashboardLayoutViewModel.getTodaysAppointments(user.id), null, 2)}`);
    //console.log(`Appointments: ${JSON.stringify(dashboardLayoutViewModel.getAppointmentsByDate(user.id, selectedDate), null, 2)}`);
    //console.log(`Selected date: ${JSON.stringify(selectedDate, null, 2)}`);
    //console.log(`Patient: ${JSON.stringify(dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getPatientByMRN(todaysAppointments[0].patientMRN).userId), null, 2)}`);
    if (isLoading) return <p>Loading…</p>;
    if (isError)   return <p>Error: {error.message}</p>;
    return (
        <Container
            customClass="p-5"
            fitParent={true}
            content={[
                <>
                    <ItemGroup
                        customClass="gap-5"
                        axis={false}
                        fitParent={true}
                        stretch={true}
                        style={{
                            gridAutoColumns: "auto 1fr",
                        }}
                        items={[
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
                                            <ItemGroup
                                                customClass="gap-5"
                                                axis={false}
                                                fitParent={true}
                                                style={{
                                                    gridAutoColumns: "1fr",
                                                }}
                                                items={[
                                                    <>
                                                        <Container
                                                            customClass="gradient-light br-sm b-3 outline-neutral-1100 px-6 pt-5 pb-2"
                                                            fitParent={true}
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
                                                                                    customClass="justify-content-space-between align-items-center"
                                                                                    fitParent={true}
                                                                                    stretch={true}
                                                                                    axis={false}
                                                                                    items={[
                                                                                        <>
                                                                                            <h1 className="font-5 font-semibold">Total Patients</h1>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                            contentClass="pt-4 pb-3 align-items-center"
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        style={{
                                                                            gridAutoColumns: "1fr"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <Container
                                                                                    customClass="gradient-white br-sm b-3 outline-neutral-1100 align-items-center justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-1 align-items-center justify-content-center pl-0 pr-4 py-4"
                                                                                                axis={false}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <BaseIcon
                                                                                                            fill="hsl(200, 30%, 25%)"
                                                                                                            height="60px"
                                                                                                            width="65px"
                                                                                                            viewBox="0 0 100 100"
                                                                                                            fillColor="hsl(200, 30%, 25%)"
                                                                                                        >
                                                                                                            <ellipse cx="41.3" cy="42.3" rx="12.2" ry="13.5" />
                                                                                                            <path d="M52.6,57.4c-3.1,2.8-7,4.5-11.3,4.5c-4.3,0-8.3-1.7-11.3-4.6c-5.5,2.5-11,5.7-11,10.7v2.1 c0,2.5,2,4.5,4.5,4.5h35.7c2.5,0,4.5-2,4.5-4.5v-2.1C63.6,63,58.2,59.9,52.6,57.4z" />
                                                                                                            <path d="M68,47.4c-0.2-0.1-0.3-0.2-0.5-0.3c-0.4-0.2-0.9-0.2-1.3,0.1c-2.1,1.3-4.6,2.1-7.2,2.1c-0.3,0-0.7,0-1,0 c-0.5,1.3-1,2.6-1.7,3.7c0.4,0.2,0.9,0.3,1.4,0.6c5.7,2.5,9.7,5.6,12.5,9.8H75c2.2,0,4-1.8,4-4v-1.9C79,52.6,73.3,49.6,68,47.4z" />
                                                                                                            <path d="M66.9,34.2c0-4.9-3.6-8.9-7.9-8.9c-2.2,0-4.1,1-5.6,2.5c3.5,3.6,5.7,8.7,5.7,14.4c0,0.3,0,0.5,0,0.8 C63.4,43,66.9,39.1,66.9,34.2z" />
                                                                                                        </BaseIcon>
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{data.allPatients.doctor_patients_count}</h4>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <Container
                                                                                    customClass="gradient-white br-sm b-3 outline-neutral-1100 align-items-center justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="align-items-center justify-content-center p-3"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{onlyTodaysPatients !== null ? `${onlyTodaysPatients}` : '...'}</h4>
                                                                                                        <p className="font-3 text-neutral-600">Patients Today</p>
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
                                                            customClass="gradient-light br-sm b-3 outline-neutral-1100 px-6 pt-5 pb-2"
                                                            fitParent={true}
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
                                                                                    customClass="justify-content-space-between align-items-center"
                                                                                    fitParent={true}
                                                                                    stretch={true}
                                                                                    axis={false}
                                                                                    items={[
                                                                                        <>
                                                                                            <h1 className="font-5 font-semibold">Upcoming Appointments</h1>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                            contentClass="pt-4 pb-3 align-items-center"
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        style={{
                                                                            gridAutoColumns: "1fr"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <Container
                                                                                    customClass="gradient-white br-sm b-3 outline-neutral-1100 align-items-center justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-4 align-items-center justify-content-center p-3"
                                                                                                axis={false}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <BaseIcon
                                                                                                            height="40px"
                                                                                                            width="40px"
                                                                                                            viewBox="0 1 24 24"
                                                                                                            fillColor="none">
                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="hsl(200, 30%, 25%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                            </g>
                                                                                                        </BaseIcon>
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{data.upcomingCount}</h4>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <Container
                                                                                    customClass="gradient-white br-sm b-3 outline-neutral-1100 align-items-center justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="align-items-center justify-content-center p-3"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{data.pendingCount}</h4>
                                                                                                        <p className="font-3 text-neutral-600">Bookings Pending</p>
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
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-7 pb-5"
                                                fitParent={true}
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
                                                                        customClass="justify-content-space-between align-items-center"
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <h1 className="font-5 font-semibold">My Schedule</h1>
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
                                                contentClass="pt-6 pb-3 align-items-center"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-3"
                                                            axis={true}
                                                            stretch={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gradient-white b-5 outline-neutral-1100 br-sm py-3 justify-content-space-between"
                                                                        axis={true}
                                                                        stretch={true}
                                                                        style={{
                                                                            width: "100%",
                                                                            maxWidth: "673px",
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="item-group-row-even"
                                                                                    axis={false}
                                                                                    fitParent={true}
                                                                                    items={[
                                                                                        <>
                                                                                            {
                                                                                                days.map((day) => (
                                                                                                    <>
                                                                                                        <Container
                                                                                                            customClass="align-items-center"
                                                                                                            content={[
                                                                                                                <>
                                                                                                                    <ItemGroup
                                                                                                                        customClass={`schedule-card  ${selectedDate === `${day.month} ${day.date}, ${day.year}` ? "chosen" : "text-neutral-800"}`}
                                                                                                                        isClickable={true}
                                                                                                                        onClick={() => handleDateSelect(day)}
                                                                                                                        axis={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <p className="font-6 font-semibold text-neutral-100">{day.date}</p>
                                                                                                                                <p className={`font-3 font-semibold`}>{day.day.toUpperCase().slice(0, 3)}</p>
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
                                                                    <Container
                                                                        customClass="position-relative scrollable postList"
                                                                        fitParent={true}
                                                                        style={{
                                                                            maxHeight: "300px"
                                                                        }}
                                                                        content={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="gap-5"
                                                                                    fitParent={true}
                                                                                    axis={true}
                                                                                    items={[
                                                                                        <>
                                                                                            {
                                                                                                hours.map((hour) => (
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-5"
                                                                                                            axis={true}
                                                                                                            fitParent={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <ItemGroup
                                                                                                                        customClass="position-relative align-items-center item-group-row-odd-left gap-5"
                                                                                                                        fitParent={true}
                                                                                                                        axis={false}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <p>{hour}:00</p>
                                                                                                                                <div
                                                                                                                                    className="line outline-secondary-400"
                                                                                                                                    style={{
                                                                                                                                        height: "1.25px"
                                                                                                                                    }}
                                                                                                                                ></div>
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-2"
                                                                                                                        axis={true}
                                                                                                                        fitParent={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                {
                                                                                                                                    patientsToday.map((appt) => (
                                                                                                                                        new Date(appt.visit_time).getHours() === hour ? (
                                                                                                                                            <Container
                                                                                                                                                customClass="gradient-white b-5 outline-neutral-1100 br-sm py-3"
                                                                                                                                                fitParent={true}
                                                                                                                                                style={{
                                                                                                                                                    maxWidth: "650px",
                                                                                                                                                }}
                                                                                                                                                content={[
                                                                                                                                                    <>
                                                                                                                                                        <ItemGroup
                                                                                                                                                            customClass="gap-6"
                                                                                                                                                            fitParent={true}
                                                                                                                                                            axis={false}
                                                                                                                                                            stretch={true}
                                                                                                                                                            style={{
                                                                                                                                                                gridAutoColumns: "auto 1fr"
                                                                                                                                                            }}
                                                                                                                                                            items={[
                                                                                                                                                                <>
                                                                                                                                                                    <BaseIcon
                                                                                                                                                                        height="40px"
                                                                                                                                                                        width="40px"
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
                                                                                                                                                                        customClass="pr-2 align-items-center"
                                                                                                                                                                        axis={false}
                                                                                                                                                                        stretch={true}
                                                                                                                                                                        fitParent={true}
                                                                                                                                                                        style={{
                                                                                                                                                                            gridAutoColumns: "1fr 90px 80px 1fr 80px auto"
                                                                                                                                                                        }}
                                                                                                                                                                        items={[
                                                                                                                                                                            <>
                                                                                                                                                                                <ItemGroup
                                                                                                                                                                                    customClass="gap-1"
                                                                                                                                                                                    axis={true}
                                                                                                                                                                                    items={[
                                                                                                                                                                                        <>
                                                                                                                                                                                            <h5 className="font-3 font-medium text-neutral-600">MRN: {appt.patient_id}</h5>
                                                                                                                                                                                            <h5 className="font-3 font-medium">{appt.first_name} {appt.last_name}</h5>
                                                                                                                                                                                        </>
                                                                                                                                                                                    ]}
                                                                                                                                                                                />
                                                                                                                                                                                <ItemGroup
                                                                                                                                                                                    customClass="gap-1"
                                                                                                                                                                                    axis={true}
                                                                                                                                                                                    items={[
                                                                                                                                                                                        <>
                                                                                                                                                                                            <h5 className="font-3 font-medium text-neutral-600">Sex</h5>
                                                                                                                                                                                            <ItemGroup
                                                                                                                                                                                                customClass="gap-1 align-items-center justify-content-center"
                                                                                                                                                                                                axis={false}
                                                                                                                                                                                                stretch={true}
                                                                                                                                                                                                items={[
                                                                                                                                                                                                    <>
                                                                                                                                                                                                        <h5 className="font-3 font-semibold">{dashboardLayoutViewModel.capitalize(appt.gender)}</h5>
                                                                                                                                                                                                    </>
                                                                                                                                                                                                ]}
                                                                                                                                                                                            />
                                                                                                                                                                                        </>
                                                                                                                                                                                    ]}
                                                                                                                                                                                />
                                                                                                                                                                                <ItemGroup
                                                                                                                                                                                    customClass="gap-1"
                                                                                                                                                                                    axis={true}
                                                                                                                                                                                    items={[
                                                                                                                                                                                        <>
                                                                                                                                                                                            <h5 className="font-3 font-medium text-neutral-600">Age</h5>
                                                                                                                                                                                            <ItemGroup
                                                                                                                                                                                                customClass="gap-1 align-items-center justify-content-center"
                                                                                                                                                                                                axis={false}
                                                                                                                                                                                                stretch={true}
                                                                                                                                                                                                items={[
                                                                                                                                                                                                    <>
                                                                                                                                                                                                        <BaseIcon
                                                                                                                                                                                                            height="18px"
                                                                                                                                                                                                            width="18px"
                                                                                                                                                                                                            viewBox="0 1 24 24"
                                                                                                                                                                                                            fillColor="none">
                                                                                                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                                                                                                                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="hsl(0, 0%, 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                                                                            </g>
                                                                                                                                                                                                        </BaseIcon>
                                                                                                                                                                                                        <h5 className="font-3 font-semibold">{dashboardLayoutViewModel.calculateAge(appt.dob)}</h5>
                                                                                                                                                                                                    </>
                                                                                                                                                                                                ]}
                                                                                                                                                                                            />
                                                                                                                                                                                        </>
                                                                                                                                                                                    ]}
                                                                                                                                                                                />
                                                                                                                                                                                <ItemGroup
                                                                                                                                                                                    customClass="gap-1"
                                                                                                                                                                                    axis={true}
                                                                                                                                                                                    items={[
                                                                                                                                                                                        <>
                                                                                                                                                                                            <h5 className="font-3 font-medium text-neutral-600">Treatment</h5>
                                                                                                                                                                                            <h5 className="font-3 font-semibold">{appt.treatment}</h5>
                                                                                                                                                                                        </>
                                                                                                                                                                                    ]}
                                                                                                                                                                                />
                                                                                                                                                                                <ItemGroup
                                                                                                                                                                                    customClass="gap-1"
                                                                                                                                                                                    axis={true}
                                                                                                                                                                                    items={[
                                                                                                                                                                                        <>
                                                                                                                                                                                            <h5 className="font-3 font-medium text-neutral-600">Starts</h5>
                                                                                                                                                                                            {<h5 className="font-3 font-semibold">{appt.visit_time.split('T')[1].slice(0, 5)}</h5>}
                                                                                                                                                                                        </>
                                                                                                                                                                                    ]}
                                                                                                                                                                                />
                                                                                                                                                                                <DropdownMenu
                                                                                                                                                                                    offsetY={10}
                                                                                                                                                                                    offsetX={-30}
                                                                                                                                                                                    triggerLabel={[
                                                                                                                                                                                        <ItemGroup
                                                                                                                                                                                            customClass="gap-1 justify-self-end"
                                                                                                                                                                                            axis={true}
                                                                                                                                                                                            isClickable={true}
                                                                                                                                                                                            items={[
                                                                                                                                                                                                <>
                                                                                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                                                                                </>
                                                                                                                                                                                            ]}
                                                                                                                                                                                        />
                                                                                                                                                                                    ]}
                                                                                                                                                                                    menuItems={[
                                                                                                                                                                                        <ItemGroup
                                                                                                                                                                                            axis={false}
                                                                                                                                                                                            stretch={true}
                                                                                                                                                                                            isClickable={true}
                                                                                                                                                                                            onClick={() => {
                                                                                                                                                                                                console.log("Open the patient's profile!");
                                                                                                                                                                                                navigate(`/dashboard/doctor/profile/${appt.patient_id}`);
                                                                                                                                                                                            }}
                                                                                                                                                                                            items={[
                                                                                                                                                                                                <>
                                                                                                                                                                                                    <p>View Profile</p>
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
                                                                                                                                        ) : (
                                                                                                                                            <>
                                                                                                                                            </>
                                                                                                                                        )
                                                                                                                                    ))
                                                                                                                                }
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
                                    customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-7 pb-5"
                                    fitParent={true}
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
                                                            customClass="justify-content-space-between align-items-center"
                                                            fitParent={true}
                                                            stretch={true}
                                                            axis={false}
                                                            items={[
                                                                <>
                                                                    <h1 className="font-5 font-semibold">Your Patients</h1>
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
                                    contentClass="pt-6 pb-3 align-items-center"
                                    content={[
                                        <>
                                            <Container
                                                customClass="scrollable postList"
                                                fitParent={true}
                                                style={{
                                                    maxHeight: "65vh"
                                                }}
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-3"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    {data.allPatients.doctor_patients_count > 0 ? (
                                                                        data.allPatients.patients.map((patient) => (
                                                                            <ItemGroup
                                                                                customClass="gap-6 align-items-center"
                                                                                axis={false}
                                                                                fitParent={true}
                                                                                style={{
                                                                                    gridAutoColumns: "1fr"
                                                                                }}
                                                                                items={[
                                                                                    <>
                                                                                        <Container
                                                                                            customClass="bg-neutral-1100 b-5 br-sm p-4"
                                                                                            fitParent={true}
                                                                                            content={[
                                                                                                <>
                                                                                                    <ItemGroup
                                                                                                        customClass="align-items-center justify-content-space-between"
                                                                                                        fitParent={true}
                                                                                                        stretch={true}
                                                                                                        axis={false}
                                                                                                        items={[
                                                                                                            <>
                                                                                                                <ItemGroup
                                                                                                                    customClass="align-items-center gap-5"
                                                                                                                    fitParent={true}
                                                                                                                    stretch={true}
                                                                                                                    axis={false}
                                                                                                                    items={[
                                                                                                                        <>
                                                                                                                            <BaseIcon
                                                                                                                                height="40px"
                                                                                                                                width="40px"
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
                                                                                                                            <p className="font-regular text-neutral-100 font-4">{patient.first_name} {patient.last_name}</p>
                                                                                                                        </>
                                                                                                                    ]}
                                                                                                                />
                                                                                                                <DropdownMenu
                                                                                                                    offsetY={10}
                                                                                                                    offsetX={-30}
                                                                                                                    triggerLabel={[
                                                                                                                        <ItemGroup
                                                                                                                            customClass="gap-1 justify-self-end"
                                                                                                                            axis={true}
                                                                                                                            isClickable={true}
                                                                                                                            items={[
                                                                                                                                <>
                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                    <div className="bg-neutral-800 br-lg" style={{ height: "5px", width: "5px" }}></div>
                                                                                                                                </>
                                                                                                                            ]}
                                                                                                                        />
                                                                                                                    ]}
                                                                                                                    menuItems={[
                                                                                                                        <ItemGroup
                                                                                                                            axis={false}
                                                                                                                            stretch={true}
                                                                                                                            isClickable={true}
                                                                                                                            onClick={() => {
                                                                                                                                console.log("Open the patient's profile! ", patient.patient_id);
                                                                                                                                navigate(`/dashboard/doctor/profile/${patient.patient_id}`);
                                                                                                                            }}
                                                                                                                            items={[
                                                                                                                                <>
                                                                                                                                    <p>View Profile</p>
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
                                                                        ))
                                                                    ) : (
                                                                        <p>No Patients...</p>
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
                            </>
                        ]}
                    />
                </>
            ]}
        />
    );
}

export default DDHome;