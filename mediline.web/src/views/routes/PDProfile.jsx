import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
function PDProfile() {
    const { currentUser } = useContext(UserContext);
    const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    const patientData = dashboardLayoutViewModel.getPatientData(user.id);

    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        {id: "tab1", label: "Overview"},
        {id: "tab2", label: "Encounters"},
        {id: "tab3", label: "Regimens"},
        {id: "tab4", label: "Graphs"},
        {id: "tab5", label: "Forms"},
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
                                                                        <p className="font-4">First Name</p>
                                                                        <InputBar
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.firstName}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.lastName}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.sex}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.dateOfBirth}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.email}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.phoneNumber}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.address}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.city}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.state}
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
                                                                            customClass='bg-primary-dark-200 py-2 pl-4 b-bottom-4 outline-primary-dark-600 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            value={user.postalCode}
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
                                                {

                                                }
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
                customClass="gap-6"
                axis={true}
                items={[
                    <>
                        <h5 className="font-5 text-neutral-100 font-semibold">Regimens</h5>
                        <ItemGroup
                            customClass="gap-2"
                            axis={true}
                            items={[
                                <>
                                    <p className="font-3 text-neutral-100 font-medium">This is the content of the tabbed content</p>
                                </>
                            ]}
                        />
                    </>
                ]}
            />
        ),
        tab4: (
            <ItemGroup
                customClass="gap-6"
                axis={true}
                items={[
                    <>
                        <h5 className="font-5 text-neutral-100 font-semibold">Graphs</h5>
                        <ItemGroup
                            customClass="gap-2"
                            axis={true}
                            items={[
                                <>
                                    <p className="font-3 text-neutral-100 font-medium">This is the content of the tabbed content</p>
                                </>
                            ]}
                        />
                    </>
                ]}
            />
        ),
        tab5: (
            <ItemGroup
                customClass="gap-6"
                axis={true}
                items={[
                    <>
                        <h5 className="font-5 text-neutral-100 font-semibold">Forms</h5>
                        <ItemGroup
                            customClass="gap-2"
                            axis={true}
                            items={[
                                <>
                                    <p className="font-3 text-neutral-100 font-medium">This is the content of the tabbed content</p>
                                </>
                            ]}
                        />
                    </>
                ]}
            />
        ),
    };

    return (
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
                            gridAutoRows: "1fr"
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
    );
}

export default PDProfile;