import { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import CircleProgressBar from '../../components/General/CircleProgressBar';
import Container, { ItemGroup } from '../../components/General/Container';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';

function PHHome() {
    const { currentUser } = useContext(UserContext);
    const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    const pharmacistData = dashboardLayoutViewModel.getPharmacistData(user.id);
    const patients = dashboardLayoutViewModel.getCustomers(pharmacistData.pharmacyAddress);

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
                                                                        customClass="gap-4"
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
                                                                                            <h1 className="font-5 font-semibold">Prescription Requests</h1>
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
                                                            contentClass="pt-4 pb-3"
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        items={[
                                                                            <>
                                                                                <Container
                                                                                    customClass="align-items-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-5"
                                                                                                axis={false}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-8 align-items-center justify-content-center pl-0 pr-4 py-4"
                                                                                                            axis={false}
                                                                                                            stretch={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <CircleProgressBar
                                                                                                                        circleWidth="150"
                                                                                                                        fraction="8"
                                                                                                                        total={`${pharmacistData.patients.length}`}
                                                                                                                        strokeColor="hsl(210, 35%, 50%)"
                                                                                                                        progressColor="hsl(200, 70%, 70%)"
                                                                                                                    />
                                                                                                                    <CircleProgressBar
                                                                                                                        fraction={pharmacistData.patients.length - 8}
                                                                                                                        total={pharmacistData.patients.length}
                                                                                                                        circleWidth="150"
                                                                                                                        strokeColor="hsl(0, 0%, 40%)"
                                                                                                                        progressColor="hsl(45, 60%, 60%)"
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
                                                                                    customClass="pt-5 justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-4 align-items-center"
                                                                                                            axis={false}
                                                                                                            stretch={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <div className="br-lg" style={{ height: "17px", width: "17px", background: "hsl(200, 70%, 70%)" }}></div>
                                                                                                                    <p className="font-4 font-semibold text-neutral-600">Fulfilled</p>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-4 align-items-center"
                                                                                                            axis={false}
                                                                                                            stretch={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <div className="br-lg" style={{ height: "17px", width: "17px", background: "hsl(45, 60%, 60%)" }}></div>
                                                                                                                    <p className="font-4 font-semibold text-neutral-600">Pending</p>
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
                                                            customClass="gradient-light br-sm b-3 outline-neutral-1100 px-6 pt-6 pb-2"
                                                            fitParent={true}
                                                            style={{
                                                                gridTemplateRows: "auto auto 1fr"
                                                            }}
                                                            header={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-4"
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
                                                                                            <h1 className="font-5 font-semibold">Inventory</h1>
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
                                                                    <ItemGroup
                                                                        customClass="gap-5"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="p-0"
                                                                                    axis={false}
                                                                                    fitParent={true}
                                                                                    style={{
                                                                                        gridAutoColumns: "175px"
                                                                                    }}
                                                                                    items={[
                                                                                        <>
                                                                                            <h5 className="font-3 text-neutral-600">MEDICATION</h5>
                                                                                            <h5 className="font-3 text-neutral-600">STOCK</h5>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <ItemGroup
                                                                                    customClass="b-bottom-3 outline-secondary-400 p-0"
                                                                                    fitParent={true}
                                                                                    axis={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                            footerClass="pt-6"
                                                            footer={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-5 hideScroll"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        style={{
                                                                            maxHeight: "110px"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                {
                                                                                    patients.map(() => (
                                                                                        <ItemGroup
                                                                                            axis={false}
                                                                                            style={{
                                                                                                gridAutoColumns: "175px"
                                                                                            }}
                                                                                            items={[
                                                                                                <>
                                                                                                    <h5 className="font-3 font-semibold text-neutral-600">Ozempic</h5>
                                                                                                    <h5 className="font-3 font-semibold text-neutral-600">100 units</h5>
                                                                                                </>
                                                                                            ]}
                                                                                        />
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
                                            <Container
                                                customClass="gradient-light br-sm b-3 outline-neutral-1100 px-8 pt-7 pb-5"
                                                fitParent={true}
                                                style={{
                                                    gridTemplateRows: "auto auto 1fr"
                                                }}
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
                                                                                <h1 className="font-6 font-semibold">Prescriptions</h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                contentClass="pt-6 align-items-center"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="p-0"
                                                            axis={false}
                                                            fitParent={true}
                                                            style={{
                                                                gridAutoColumns: "1fr"
                                                            }}
                                                            items={[
                                                                <>
                                                                    <h5 className="font-3 text-neutral-600">PATIENT</h5>
                                                                    <h5 className="font-3 text-neutral-600">DOCTOR</h5>
                                                                    <h5 className="font-3 text-neutral-600">MEDICATION</h5>
                                                                    <h5 className="font-3 text-neutral-600">DURATION</h5>
                                                                    <h5 className="font-3 text-neutral-600">DOSAGE</h5>
                                                                    <h5 className="font-3 text-neutral-600">STATUS</h5>
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                footerClass="pt-6"
                                                footer={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-5 hideScroll"
                                                            axis={true}
                                                            fitParent={true}
                                                            style={{
                                                                maxHeight: "240px"
                                                            }}
                                                            items={[
                                                                <>
                                                                    {
                                                                        patients.map((patient) => (
                                                                            <ItemGroup
                                                                                customClass="align-items-center"
                                                                                axis={false}
                                                                                fitParent={true}
                                                                                style={{
                                                                                    gridAutoColumns: "1fr"
                                                                                }}
                                                                                items={[
                                                                                    <>
                                                                                        <h5 className="font-3 font-semibold text-neutral-600">{dashboardLayoutViewModel.getUsers().find(user => user.id === patient.userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === patient.userId).lastName}</h5>
                                                                                        <h5 className="font-3 font-semibold text-neutral-600">{dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(patient.doctor).userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(patient.doctor).userId).lastName}</h5>
                                                                                        <h5 className="font-3 font-semibold text-neutral-600">Ozempic</h5>
                                                                                        <h5 className="font-3 font-semibold text-neutral-600">14 days</h5>
                                                                                        <h5 className="font-3 font-semibold text-neutral-600">1000 mg</h5>
                                                                                        <ItemGroup
                                                                                            customClass="bg-success-500 br"
                                                                                            items={[
                                                                                                <>
                                                                                                    <h3 className="text-success-100 font-semibold font-3 py-1 px-3 br">Fulfilled</h3>
                                                                                                </>
                                                                                            ]}
                                                                                        />
                                                                                    </>
                                                                                ]}
                                                                            />
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
    );
}

export default PHHome;