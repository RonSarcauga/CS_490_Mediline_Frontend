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
    const [percentage, setPercentage] = useState(35);

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
                                                            contentClass="pt-4 pb-3 align-items-center"
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={false}
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        style={{
                                                                            gridAutoColumns: "1fr auto"
                                                                        }}
                                                                        items={[
                                                                            <>
                                                                                <Container
                                                                                    customClass="align-items-center justify-content-center"
                                                                                    fitParent={true}
                                                                                    content={[
                                                                                        <>
                                                                                            <ItemGroup
                                                                                                customClass="gap-10"
                                                                                                axis={false}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-4"
                                                                                                            axis={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-1 align-items-center justify-content-center pl-0 pr-4 py-4"
                                                                                                                        axis={false}
                                                                                                                        stretch={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <CircleProgressBar
                                                                                                                                    percentage={percentage}
                                                                                                                                    circleWidth="100"
                                                                                                                                    strokeColor="hsl(210, 35%, 50%)"
                                                                                                                                    progressColor="hsl(200, 70%, 70%)"
                                                                                                                                />
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />
                                                                                                                    <input
                                                                                                                        type="range"
                                                                                                                        min="0"
                                                                                                                        max="100"
                                                                                                                        step="1"
                                                                                                                        value={percentage}
                                                                                                                        onChange={(e) => setPercentage(e.target.value)}
                                                                                                                    />
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-4"
                                                                                                            axis={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-1 align-items-center justify-content-center pl-0 pr-4 py-4"
                                                                                                                        axis={false}
                                                                                                                        stretch={true}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <CircleProgressBar
                                                                                                                                    percentage={percentage}
                                                                                                                                    circleWidth="200"
                                                                                                                                    strokeColor="hsl(0, 0%, 40%)"
                                                                                                                                    progressColor="hsl(45, 60%, 60%)"
                                                                                                                                />
                                                                                                                            </>
                                                                                                                        ]}
                                                                                                                    />
                                                                                                                    <input
                                                                                                                        type="range"
                                                                                                                        min="0"
                                                                                                                        max="100"
                                                                                                                        step="1"
                                                                                                                        value={percentage}
                                                                                                                        onChange={(e) => setPercentage(e.target.value)}
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
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{pharmacistData.patients.length}</h4>
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
                                                            customClass="gradient-light br-sm b-3 outline-neutral-1100 px-6 pt-6 pb-2"
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
                                                                                    customClass="b-bottom-3 outline-secondary-400"
                                                                                    fitParent={true}
                                                                                    axis={true}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                            footerClass="pt-6 pb-4 align-items-center"
                                                            footer={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="gap-5 hideScroll"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        style={{
                                                                            maxHeight: "80px"
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
                                                                    <p className="font-6 font-semibold text-neutral-100">Forget It</p>
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
                                                                                            <p>What is happening?</p>
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

export default PHHome;