import { useState, useContext, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Accordion from '../../components/General/AccordionMenu';
import DropdownMenu from '../../components/General/DropdownMenu';
import Modal from '../../components/General/Modal';
import Container, { ItemGroup } from '../../components/General/Container';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
function PHPatient() {
    const { currentUser } = useContext(UserContext);
    const users = dashboardLayoutViewModel.getUsers();
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    //const pharmacistData = dashboardLayoutViewModel.getPharmacistData(user.id);

    const [accordionHeight, setAccordionHeight] = useState(0);
    const onExpand = () => {
        setAccordionHeight(150);
    };
    const onCollapse = () => {
        setAccordionHeight(0);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    console.log(`Accordion Height: ${accordionHeight}`);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <>
                    <ItemGroup
                        customClass="px-2 pt-2 gap-5"
                        axis={true}
                        items={[
                            <>
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={true}
                                    fitParent={true}
                                    items={[
                                        <>
                                            <ItemGroup
                                                axis={false}
                                                stretch={true}
                                                items={[
                                                    <>
                                                        <h3 className="font-semibold text-neutral-600 justify-self-start">
                                                            MEDICATION REQUEST
                                                        </h3>
                                                    </>
                                                ]}
                                            />
                                            <Container
                                                customClass="bg-neutral-1000 p-6"
                                                fitParent={true}
                                                headerClass="b-bottom-3 b-top-3 outline-neutral-800 py-3"
                                                header={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="p-0 align-items-center justify-content-center"
                                                            axis={false}
                                                            fitParent={true}
                                                            style={{
                                                                gridAutoColumns: "150px"
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
                                                contentClass="hideScroll px-0 pt-5 pb-5 b-bottom-3 outline-neutral-800"
                                                content={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="gap-5"
                                                            axis={true}
                                                            fitParent={true}
                                                            style={{
                                                                maxHeight: "120px"
                                                            }}
                                                            items={[
                                                                <>
                                                                    {
                                                                        users.length > 0 && (
                                                                            users.slice(0, 1).map(() => (
                                                                                <>
                                                                                    <ItemGroup
                                                                                        customClass=" py-1"
                                                                                        axis={false}
                                                                                        fitParent={true}
                                                                                        stretch={true}
                                                                                        style={{
                                                                                            gridAutoColumns: "150px"
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
                                                                    }
                                                                </>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                                footer={[
                                                    <>
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-neutral-1000 py-3 b-3 outline-neutral-700 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={handleCloseModal}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-600">APPROVE</p>
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
                                                                                <p className="font-semibold text-neutral-1000">REJECT</p>
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
            </Modal>
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
                                gridAutoColumns: "1fr auto",
                            }}
                            items={[
                                <>
                                    <ItemGroup
                                        customClass="gap-5 hideScroll"
                                        axis={true}
                                        fitParent={true}
                                        style={{
                                            maxHeight: "80vh",
                                            gridAutoRows: "auto auto 1fr"
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
                                                                                                <h1 className="font-5 font-semibold">Personal Information</h1>
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
                                                                contentClass="pt-6 pb-3"
                                                                content={[
                                                                    <>
                                                                        <ItemGroup
                                                                            axis={false}
                                                                            fitParent={true}
                                                                            stretch={true}
                                                                            evenSplit={true}
                                                                            items={[
                                                                                <>
                                                                                    {
                                                                                        users.length > 0 && (
                                                                                            <>
                                                                                                <ItemGroup
                                                                                                    customClass="gap-2"
                                                                                                    axis={true}
                                                                                                    stretch={true}
                                                                                                    fitParent={true}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <h5 className="font-3">NAME</h5>
                                                                                                            <p className="font-3 font-medium text-justify">
                                                                                                                {users[0].firstName} {users[0].lastName}
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
                                                                                                            <h5 className="font-3">DATE OF BIRTH</h5>
                                                                                                            <p className="font-3 font-medium text-justify">
                                                                                                                {users[0].dateOfBirth}
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
                                                                                                            <h5 className="font-3">HEIGHT</h5>
                                                                                                            <p className="font-3 font-medium text-justify">
                                                                                                                175 cm
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
                                                                                                            <h5 className="font-3">WEIGHT</h5>
                                                                                                            <p className="font-3 font-medium text-justify">
                                                                                                                140 lbs
                                                                                                            </p>
                                                                                                        </>
                                                                                                    ]}
                                                                                                />
                                                                                            </>
                                                                                        )
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
                                                                                                <h1 className="font-5 font-semibold">Contact Information</h1>
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
                                                                contentClass="pt-5 pb-4"
                                                                content={[
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="gap-3"
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
                                                                                            gridAutoColumns: "12vw"
                                                                                        }}
                                                                                        items={[
                                                                                            <>
                                                                                                {
                                                                                                    users.length > 0 && (
                                                                                                        <>
                                                                                                            <ItemGroup
                                                                                                                customClass="gap-7"
                                                                                                                axis={true}
                                                                                                                stretch={true}
                                                                                                                fitParent={true}
                                                                                                                items={[
                                                                                                                    <>
                                                                                                                        <ItemGroup
                                                                                                                            customClass="gap-2"
                                                                                                                            axis={true}
                                                                                                                            stretch={true}
                                                                                                                            fitParent={true}
                                                                                                                            items={[
                                                                                                                                <>
                                                                                                                                    <h5 className="font-3">EMAIL</h5>
                                                                                                                                    <p className="font-3 font-medium text-justify">
                                                                                                                                        {users[0].email}
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
                                                                                                                                    <h5 className="font-3">ADDRESS</h5>
                                                                                                                                    <ItemGroup
                                                                                                                                        axis={true}
                                                                                                                                        stretch={true}
                                                                                                                                        fitParent={true}
                                                                                                                                        items={[
                                                                                                                                            <>
                                                                                                                                                <p className="font-3 font-medium text-justify">
                                                                                                                                                    {users[0].address},
                                                                                                                                                </p>
                                                                                                                                                <p className="font-3 font-medium text-justify">
                                                                                                                                                    {users[0].city}, {users[0].state}
                                                                                                                                                </p>
                                                                                                                                                <p className="font-3 font-medium text-justify">
                                                                                                                                                    {users[0].postalCode}
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
                                                                                                            <ItemGroup
                                                                                                                customClass="gap-2"
                                                                                                                axis={true}
                                                                                                                stretch={true}
                                                                                                                fitParent={true}
                                                                                                                items={[
                                                                                                                    <>
                                                                                                                        <h5 className="font-3">PHONE</h5>
                                                                                                                        <p className="font-3 font-medium text-justify">
                                                                                                                            {users[0].phoneNumber}
                                                                                                                        </p>
                                                                                                                    </>
                                                                                                                ]}
                                                                                                            />
                                                                                                        </>
                                                                                                    )
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
                                                                style={{
                                                                    gridTemplateRows: "auto auto 1fr",
                                                                    maxHeight: "40vh"
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
                                                                                        customClass="justify-content-space-between align-items-center py-2"
                                                                                        fitParent={true}
                                                                                        stretch={true}
                                                                                        axis={false}
                                                                                        items={[
                                                                                            <>
                                                                                                <h1 className="font-5 font-semibold">Medication History</h1>
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
                                                                contentClass="pt-5"
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
                                                                footerClass="hideScroll px-0 pt-5"
                                                                footer={[
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="gap-5"
                                                                            axis={true}
                                                                            fitParent={true}
                                                                            items={[
                                                                                <>
                                                                                    {
                                                                                        users.length > 0 && (
                                                                                            users.map(() => (
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
                                    <Container
                                        customClass="gradient-light br-sm b-3 outline-neutral-1100 px-3 pb-4 overflow-y-hidden"
                                        fitParent={true}
                                        contentClass="pt-6 pb-3 align-items-center"
                                        content={[
                                            <>
                                                <Container
                                                    fitParent={true}
                                                    style={{
                                                        maxHeight: "65vh"
                                                    }}
                                                    content={[
                                                        <>
                                                            <ItemGroup
                                                                axis={true}
                                                                fitParent={true}
                                                                style={{
                                                                    gridTemplateRows: "auto 1fr"
                                                                }}
                                                                items={[
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="gap-3"
                                                                            axis={true}
                                                                            fitParent={true}
                                                                            items={[
                                                                                <>
                                                                                    <Accordion
                                                                                        onExpand={onExpand}
                                                                                        onCollapse={onCollapse}
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
                                                                                                                        <h1 className="font-5 font-semibold text-primary-neutral-100">Latest Requests</h1>
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
                                                                                        bodyClass="pt-3 pb-3"
                                                                                        body={[
                                                                                            <ItemGroup
                                                                                                customClass="gap-3 hideScroll"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                fitParent={true}
                                                                                                style={{
                                                                                                    maxHeight: "14vh"
                                                                                                }}
                                                                                                items={[
                                                                                                    <>
                                                                                                        {
                                                                                                            users.length > 0 ? (
                                                                                                                users.slice(0, 3).map((user) => (
                                                                                                                    <ItemGroup
                                                                                                                        customClass="gap-6 align-items-center"
                                                                                                                        axis={false}
                                                                                                                        fitParent={true}
                                                                                                                        style={{
                                                                                                                            gridAutoColumns: "1fr auto"
                                                                                                                        }}
                                                                                                                        items={[
                                                                                                                            <>
                                                                                                                                <Container
                                                                                                                                    customClass="b-bottom-3 outline-primary-dark-400 pt-2 pb-5"
                                                                                                                                    fitParent={true}
                                                                                                                                    style={{
                                                                                                                                        minWidth: "22vw"
                                                                                                                                    }}
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
                                                                                                                                                            customClass="align-content-center gap-5"
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
                                                                                                                                                                    <ItemGroup
                                                                                                                                                                        customClass="gap-0"
                                                                                                                                                                        axis={true}
                                                                                                                                                                        fitParent={true}
                                                                                                                                                                        items={[
                                                                                                                                                                            <>
                                                                                                                                                                                <p className="font-regular text-neutral-100 font-4">
                                                                                                                                                                                    {user.firstName} {user.lastName}
                                                                                                                                                                                </p>
                                                                                                                                                                                <p className="font-regular text-neutral-600 font-3">
                                                                                                                                                                                    Medication
                                                                                                                                                                                </p>
                                                                                                                                                                            </>
                                                                                                                                                                        ]}
                                                                                                                                                                    />
                                                                                                                                                                </>
                                                                                                                                                            ]}
                                                                                                                                                        />
                                                                                                                                                        <DropdownMenu
                                                                                                                                                            offsetY={10}
                                                                                                                                                            offsetX={-30}
                                                                                                                                                            triggerLabel={[
                                                                                                                                                                <ItemGroup
                                                                                                                                                                    customClass="gap-1 justify-self-end m-0"
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
                                                                                                                                                                { label: "View Profile" },
                                                                                                                                                                <ItemGroup
                                                                                                                                                                    axis={false}
                                                                                                                                                                    stretch={true}
                                                                                                                                                                    isClickable={true}
                                                                                                                                                                    onClick={handleOpenModal}
                                                                                                                                                                    items={[
                                                                                                                                                                        <>
                                                                                                                                                                            <p>Review Request</p>
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
                                                                                                                <p>Hello world!</p>
                                                                                                            )
                                                                                                        }
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        ]}
                                                                                    />
                                                                                    <Container
                                                                                        customClass="p-0"
                                                                                        fitParent={true}
                                                                                        style={{
                                                                                            maxHeight: "678px",
                                                                                            maxWidth: "1120px",
                                                                                        }}
                                                                                        contentClass="bg-primary-dark-600 br-sm p-5"
                                                                                        content={[
                                                                                            <>
                                                                                                <h5 className="font-5 text-dark-300 font-semibold">All Patients</h5>
                                                                                            </>
                                                                                        ]}
                                                                                    />
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        <ItemGroup
                                                                            customClass="hideScroll"
                                                                            axis={true}
                                                                            stretch={true}
                                                                            fitParent={true}
                                                                            style={{
                                                                                maxHeight: `calc(62% - ${accordionHeight}px)`,
                                                                                transition: "all 0.2s ease"
                                                                            }}
                                                                            items={[
                                                                                <>
                                                                                    {
                                                                                        users.length > 0 ? (
                                                                                            users.map((user) => (
                                                                                                <ItemGroup
                                                                                                    customClass="gap-6 align-items-center"
                                                                                                    axis={false}
                                                                                                    fitParent={true}
                                                                                                    style={{
                                                                                                        gridAutoColumns: "1fr auto"
                                                                                                    }}
                                                                                                    items={[
                                                                                                        <>
                                                                                                            <Container
                                                                                                                customClass="b-bottom-3 outline-primary-dark-400 py-5"
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
                                                                                                                                                <ItemGroup
                                                                                                                                                    customClass="gap-0 align-content-center"
                                                                                                                                                    axis={true}
                                                                                                                                                    fitParent={true}
                                                                                                                                                    items={[
                                                                                                                                                        <>
                                                                                                                                                            <p className="font-regular text-neutral-100 font-4">
                                                                                                                                                                {user.firstName} {user.lastName}
                                                                                                                                                            </p>
                                                                                                                                                        </>
                                                                                                                                                    ]}
                                                                                                                                                />
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
                                                                                                                                            { label: "View Profile" },
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
                                                                                            <p>Hello world!</p>
                                                                                        )
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
                    </>
                ]}
            />
        </>
    );
}

export default PHPatient;