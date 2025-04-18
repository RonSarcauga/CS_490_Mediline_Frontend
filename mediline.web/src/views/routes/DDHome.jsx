import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import DashboardLayout from './DashboardLayout';

function DDHome() {
    const { currentUser } = useContext(UserContext);
    const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    const doctorData = dashboardLayoutViewModel.getDoctorData(user.id);

    console.log(`Patients: ${dashboardLayoutViewModel.getTodaysPatients(user.id)}`);

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
                            gridAutoColumns: "50vw 1fr",
                        }}
                        items={[
                            <>
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
                                                                    <h1 className="font-5 font-semibold">Total Patients</h1>
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
                                                axis={false}
                                                stretch={true}
                                                items={[
                                                    <>
                                                        <h4 className="font-semibold">256</h4>
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
                                                                    <h1 className="font-5 font-semibold">Your Patients Today</h1>
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
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-6 align-items-center"
                                                            axis={false}
                                                            fitParent={true}
                                                            style={{
                                                                gridAutoColumns: "auto 1fr"
                                                            }}
                                                            items={[
                                                                <>
                                                                    <p>10:00</p>
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
                                                                                                        <h3 className="font-medium text-neutral-100 font-4">Mary Keitel</h3>
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                            <ItemGroup
                                                                                                customClass="gap-1"
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
    );
}

export default DDHome;