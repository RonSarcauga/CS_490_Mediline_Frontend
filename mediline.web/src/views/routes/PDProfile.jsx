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
    const pastAppointments = dashboardLayoutViewModel.getPastAppointmentsSorted(user.id);

    const [activeTab, setActiveTab] = useState("tab1");
    const [isOpen, setIsOpen] = useState("false");

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
                                                <ItemGroup
                                                    customClass="gap-5"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            {
                                                                pastAppointments.length > 0 && (
                                                                    pastAppointments.map((appt) => (
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass=" pt-2 pb-6 b-bottom-3 outline-primary-dark-800"
                                                                                axis={false}
                                                                                fitParent={true}
                                                                                stretch={true}
                                                                                isClickable={true}
                                                                                onClick={() => {
                                                                                    setIsOpen(!isOpen);
                                                                                }}
                                                                                style={{
                                                                                    gridAutoColumns: "250px 250px 250px 1fr"
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
                                                                                                                                <p className="font-3 font-medium text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(pastAppointments[0].appointmentDate)}</p>
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
                                                                                                    <p className="font-3 font-medium text-neutral-600">
                                                                                                        {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).firstName} {dashboardLayoutViewModel.getUsers().find(user => user.id === dashboardLayoutViewModel.getDoctorByLicense(appt.doctorLicenseNumber).userId).lastName}
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
        <>
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

export default PDProfile;