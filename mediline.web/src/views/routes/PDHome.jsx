import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';

function PDHome() {
    const { currentUser } = useContext(UserContext);
    const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    console.log(`User: ${user.firstName} ${user.lastName} ${user.dateOfBirth}`);

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
                                        gridAutoRows: "1fr",
                                    }}
                                    items={[
                                        <>
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-5 pb-5"
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
                                                                        customClass="justify-content-space-between align-items-center justify-content-space-between"
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <h1 className="font-6">Your Care Team</h1>
                                                                                <ItemGroup
                                                                                    customClass="gap-3"
                                                                                    axis={false}
                                                                                    stretch={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="bg-dark-100 br-sm align-items-center justify-items-center px-4 py-3"
                                                                                                isClickable={true}
                                                                                                stretch={true}
                                                                                                axis={false}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <h1 className="font-3 font-medium text-neutral-1100">
                                                                                                            Book an Appointment
                                                                                                        </h1>
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
                                                contentClass="pt-6"
                                                content={[
                                                    <>
                                                        <p>Insert Doctor Here!</p>
                                                    </>
                                                ]}
                                            />
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-8 pb-5"
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
                                                                                <h1 className="font-6">Checkout</h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="pt-5"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            axis={true}
                                                            fitParent={true}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        style={{
                                                                            gridAutoColumns: "1fr",
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
                                                                                            <p className="font-3 font-semibold text-neutral-600">APPOINTMENT</p>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-semibold text-neutral-600">Insert data here</p>
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
                                                                                            <p className="font-3 font-semibold text-neutral-600">DOCTOR</p>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-semibold text-neutral-600">Insert data here</p>
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
                                                                                            <p className="font-3 font-semibold text-neutral-600">TREATMENT</p>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-semibold text-neutral-600">Insert data here</p>
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
                                                                                            <p className="font-3 font-semibold text-neutral-600">TOTAL BILL</p>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-semibold text-neutral-600">Insert data here</p>
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
                                                                                            <p className="font-3 font-semibold text-neutral-600">STATUS</p>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <p className="font-3 font-semibold text-neutral-600">Insert data here</p>
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
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-8 pb-5"
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
                                                                                <h1 className="font-6">Upcoming Appointments</h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="pt-6"
                                                content={[
                                                    <>
                                                        <Container
                                                            customClass="gradient-white br-sm p-5"
                                                            fitParent={true}
                                                            content={[
                                                                <>
                                                                    <p>Insert appointments here!</p>
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
                                                                        customClass="justify-items-center gap-6"
                                                                        axis={true}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="justify-items-center gap-2"
                                                                                    axis={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <h3 className="font-semibold font-6">{user.firstName} {user.lastName}</h3>
                                                                                            <h3 className="font-regular font-4 text-neutral-700">MRN: 1234567</h3>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <ItemGroup
                                                                                    customClass="align-items-center gap-2"
                                                                                    axis={false}
                                                                                    stretch={true}
                                                                                    items={[
                                                                                        <>
                                                                                            <p className="font-semibold text-neutral-700" style={{ fontSize: "0.9rem" }}>Male</p>
                                                                                            <div className="bg-neutral-700 br-lg" style={{ height: "9px", width: "9px" }}></div>
                                                                                            <p className="font-semibold text-neutral-700" style={{ fontSize: "0.9rem" }}>{dashboardLayoutViewModel.formatBirthDate(user.dateOfBirth)} ({dashboardLayoutViewModel.calculateAge(user.dateOfBirth)} yrs)</p>
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
                                                                                    headerClass="px-6"
                                                                                    data={[
                                                                                        {
                                                                                            header:
                                                                                                <ItemGroup
                                                                                                    customClass="align-items-center gap-3"
                                                                                                    stretch={true}
                                                                                                    axis={false}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <BaseIcon
                                                                                                                height="20px"
                                                                                                                width="20px"
                                                                                                                fillColor="none">
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
                                                                                            ,
                                                                                            content:
                                                                                                <ItemGroup
                                                                                                    axis={true}
                                                                                                    stretch={true}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <p>Is this even working?</p>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            ,
                                                                                        }
                                                                                    ]}
                                                                                />
                                                                                <Accordion
                                                                                    headerClass="px-6"
                                                                                    data={[
                                                                                        {
                                                                                            header:
                                                                                                <ItemGroup
                                                                                                    customClass="align-items-center gap-3"
                                                                                                    stretch={true}
                                                                                                    axis={false}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <BaseIcon
                                                                                                                height="20px"
                                                                                                                width="20px"
                                                                                                                fillColor="none">
                                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                <g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                    <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                </g>
                                                                                                            </BaseIcon>
                                                                                                            <h1 className="font-5 font-semibold text-primary-neutral-100">Medications</h1>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            ,
                                                                                            content:
                                                                                                <ItemGroup
                                                                                                    axis={true}
                                                                                                    stretch={true}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <p>Is this even working?</p>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            ,
                                                                                        }
                                                                                    ]}
                                                                                />
                                                                                <Accordion
                                                                                    headerClass="px-6"
                                                                                    data={[
                                                                                        {
                                                                                            header:
                                                                                                <ItemGroup
                                                                                                    customClass="align-items-center gap-3"
                                                                                                    stretch={true}
                                                                                                    axis={false}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <BaseIcon
                                                                                                                height="20px"
                                                                                                                width="20px"
                                                                                                                fillColor="none">
                                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                <g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                    <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="hsl(210, 10%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                </g>
                                                                                                            </BaseIcon>
                                                                                                            <h1 className="font-5 font-semibold text-primary-neutral-100">Forms</h1>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            ,
                                                                                            content:
                                                                                                <ItemGroup
                                                                                                    axis={true}
                                                                                                    stretch={true}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <p>Is this even working?</p>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            ,
                                                                                        }
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

export default PDHome;