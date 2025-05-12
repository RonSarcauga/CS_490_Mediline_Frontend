import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import CircleProgressBar from '../../components/General/CircleProgressBar';
import Container, { ItemGroup } from '../../components/General/Container';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import  PharmaDashboardViewModel  from '../../viewModels/PHViewModel'; 
import Spinner from '../../components/General/Spinner';

function PHHome() {
    const { currentUser } = useContext(UserContext);
    const users = dashboardLayoutViewModel.getUsers();
    const [medications, setMedications] = useState([]);
    const [prescLoading, setLoading] = useState(true);
    useEffect(() => {
        const loadMeds = async () => {
            setLoading(true);
            try {
                const result = await PharmaDashboardViewModel.fetchMedicationslist(currentUser.user_id);
                setMedications(result);
            } catch (err) {
                console.error("Failed to load medications", err);
            }
            setLoading(false);
        };

        if (currentUser?.user_id) {
            loadMeds();
        }
    }, [currentUser?.user_id]);
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    //const pharmacistData = dashboardLayoutViewModel.getPharmacistData(user.id);
    //const patients = dashboardLayoutViewModel.getCustomers(pharmacistData.pharmacyAddress);
    const { data, status, isLoading, isError, error } = PharmaDashboardViewModel.usePharmaHome(currentUser.user_id);
    if (isLoading) return <Container fitParent={true} customClass="p-5" content={[<Spinner size={64} />]} />;
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
                                                                                                                        fraction={data.countRx.collected_prescription}
                                                                                                                        total={data.countRx.collected_prescription + data.countRx.processing_prescription === 0 ? 1 : data.countRx.collected_prescription + data.countRx.processing_prescription}
                                                                                                                        strokeColor="hsl(210, 35%, 50%)"
                                                                                                                        progressColor="hsl(200, 70%, 70%)"
                                                                                                                    />
                                                                                                                    <CircleProgressBar
                                                                                                                        fraction={data.countRx.collected_prescription + data.countRx.processing_prescription - data.requestCount}
                                                                                                                        total={data.countRx.collected_prescription + data.countRx.processing_prescription === 0 ? 1 : data.countRx.collected_prescription + data.countRx.processing_prescription}
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
                                                                                                                    <p className="font-4 font-semibold text-neutral-600">Paid</p>
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
                                                                                                                    <p className="font-4 font-semibold text-neutral-600">Fulfilled</p>
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
                                                                                            <h5 className="font-3 text-neutral-600">EXPIRATION</h5>
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
                                                                                    data.inventoryStock.map((stock) => (
                                                                                        <ItemGroup
                                                                                            axis={false}
                                                                                            style={{
                                                                                                gridAutoColumns: "175px"
                                                                                            }}
                                                                                            items={[
                                                                                                <>
                                                                                                    <h5 className="font-3 font-semibold text-neutral-600">{stock.medication_name}</h5>
                                                                                                    <h5 className="font-3 font-semibold text-neutral-600">{stock.quantity} units</h5>
                                                                                                    <h5 className="font-3 font-semibold text-neutral-600">{dashboardLayoutViewModel.formatBirthDate(stock.expiration_date)}</h5>
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
                                                                    {prescLoading ? (
                                                                        <Container fitParent customClass="p-5" content={[<Spinner size={64} />]} />
                                                                        ) : medications.length === 0 ? (
                                                                        <p className="font-3 text-neutral-700">No prescriptions found.</p>
                                                                        ) : (
                                                                        medications.map((med, idx) => (
                                                                            <ItemGroup
                                                                            key={idx}
                                                                            customClass="align-items-center"
                                                                            axis={false}
                                                                            fitParent={true}
                                                                            style={{ gridAutoColumns: "1fr" }}
                                                                            items={[
                                                                                <>
                                                                                <h5 className="font-3 font-semibold text-neutral-600">{med.patientName}</h5>
                                                                                <h5 className="font-3 font-semibold text-neutral-600">Dr. {med.doctorName}</h5>
                                                                                <h5 className="font-3 font-semibold text-neutral-600">{med.medication}</h5>
                                                                                <h5 className="font-3 font-semibold text-neutral-600">{med.duration} days</h5>
                                                                                <h5 className="font-3 font-semibold text-neutral-600">{med.dosage} units</h5>
                                                                                <ItemGroup
                                                                                    customClass={`br ${med.status === 'PAID' ? 'bg-success-300' : 'bg-warning-300'}`}
                                                                                    items={[
                                                                                        <h3 className="text-white font-semibold font-3 py-1 px-3 br">{med.status}</h3>
                                                                                    ]}
                                                                                />
                                                                                </>
                                                                            ]}
                                                                            />
                                                                        ))
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

export default PHHome;