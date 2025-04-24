import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import Accordion from '../../components/General/AccordionMenu';
import InputBar from '../../components/General/InputBar';
import { UserContext } from '../../context/UserProvider';
import { discussionForumViewModel } from '../../viewModels/DiscussionForumViewModel';
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
                customClass="gap-6"
                axis={true}
                items={[
                    <>
                        <h5 className="font-5 text-neutral-100 font-semibold">Overview</h5>
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
        tab2: (
            <ItemGroup
                customClass="gap-6"
                axis={true}
                items={[
                    <>
                        <h5 className="font-5 text-neutral-100 font-semibold">Encounters</h5>
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
                                    headerClass="px-5"
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
                                                                            customClass={`text-align-center justify-content-center py-3 br-top-sm ${activeTab === tab.id ? "b-bottom-10 outline-secondary-400" : "text-dark-200 b-bottom-4 outline-secondary-400"}`}
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
                                                customClass="gap-6"
                                                axis={true}
                                                fitParent={true}
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