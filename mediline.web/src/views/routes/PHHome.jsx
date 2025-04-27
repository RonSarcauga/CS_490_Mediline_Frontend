import { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
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
                                                                                                        <h4 className="font-semibold font-9 text-dark-200">{pharmacistData.patients.length}</h4>
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