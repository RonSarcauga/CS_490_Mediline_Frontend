import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import InputBar from '../../components/General/InputBar';
import SelectList from '../../components/General/SelectList';
import Checkbox from '../../components/General/CheckboxRefactored';
import Modal from '../../components/General/Modal';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import FindDoctorViewModel from '../../viewModels/FindDoctorViewModel';

function PDFindDoctor() {
    const { currentUser } = useContext(UserContext);
    //const user = dashboardLayoutViewModel.getUsers().find(user => user.id === currentUser.user.id);
    const navigate = useNavigate();

    // Used to manage the form data
    const [formData, setFormData] = useState(FindDoctorViewModel);

    // Used to manage data from API calls
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // References for the select lists which can be used to invoke internal methods
    const specialtyDropdownRef = useRef();
    const ratingDropdownRef = useRef();

    // Used to extract parameters passed to the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");

    // The click event for the reset filters button
    //const clearFilters = () => {
    //    FindDoctorViewModel.clearFilters();
    //    console.log("servicesRef:", specialtyDropdownRef.current);

    //    // Checks that the select lists are not null before invoking the reset method
    //    if (specialtyDropdownRef.current) {
    //        specialtyDropdownRef.current.reset();
    //    }
    //    if (ratingDropdownRef.current) {
    //        ratingDropdownRef.current.reset();
    //    }

    //    // Updates the form data that is displayed on the page
    //    setFormData({ ...FindDoctorViewModel });
    //};

    useEffect(() => {// Reset filters when leaving the page
        // Check if a parameter has been passed from the Home Page
        if (!FindDoctorViewModel.filterByURL && searchQuery) {
            // Apply any queries from the Home Page
            FindDoctorViewModel.updateSearch(searchQuery);
            FindDoctorViewModel.filterByURL = true;
            FindDoctorViewModel.applyFilters();
            console.log("Applied filters: ", FindDoctorViewModel.filters);

            // Updates the form data that is displayed on the page
            setFormData({ ...FindDoctorViewModel });
        }

        return () => {
            FindDoctorViewModel.filterByURL = false;
            console.log("Did the filters get reset?\n", FindDoctorViewModel.filters);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const result = await FindDoctorViewModel.fetchDashboardData();
        setData(result);
        setLoading(false);
    }

    const addDoctor = async (userId) => {
        const request = await FindDoctorViewModel.addDoctor(userId);
    }

    console.log(`Specialties: ${JSON.stringify(data, null, 2)}`);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if (loading) return (
        <Container
            customClass="align-items-center justify-content-center"
            fitParent={true}
            content={[
                <>
                    <p>Loading data</p>
                </>
            ]}
        />
    );

    if (!data || !data.specialties) return (
        <Container
            customClass="align-items-center justify-content-center"
            fitParent={true}
            content={[
                <>
                    <p>Error loading data</p>
                </>
            ]}
        />
    );

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <>
                    <ItemGroup
                        customClass="px-2 pt-2 gap-10"
                        axis={true}
                        fitParent={true}
                        items={[
                            <>
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={true}
                                    fitParent={true}
                                    style={{
                                        minWidth: "50vw"
                                    }}
                                    items={[
                                        <>
                                            <ItemGroup
                                                customClass="align-items-center justify-content-space-between pb-3"
                                                axis={false}
                                                fitParent={true}
                                                stretch={true}
                                                items={[
                                                    <>
                                                        <h1 className="font-semibold text-neutral-200 justify-self-start">
                                                            FILTERS
                                                        </h1>
                                                        <ItemGroup
                                                            customClass="bg-neutral-1100 br-sm align-items-center justify-items-center px-3 gap-3"
                                                            isClickable={true}
                                                            onClick={async (e) => {
                                                                e.preventDefault();

                                                                // Set loading state to true
                                                                setLoading(true);

                                                                try {
                                                                    // Apply filters and fetch the filtered list of doctors
                                                                    const unfilteredDoctors = await FindDoctorViewModel.clearFilters();

                                                                    // Update the state with the filtered doctors
                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        doctors: unfilteredDoctors,
                                                                    }));

                                                                    console.log("Filters applied: ", FindDoctorViewModel.filters);
                                                                } catch (error) {
                                                                    console.error("Error applying filters: ", error);
                                                                } finally {
                                                                    // Set loading state to false and close the modal
                                                                    setLoading(false);
                                                                    handleCloseModal();
                                                                }
                                                            }}
                                                            stretch={true}
                                                            axis={false}
                                                            items={[
                                                                <>
                                                                    <BaseIcon
                                                                        fill="hsl(0, 0%, 10%)"
                                                                        height="20px"
                                                                        width="20px"
                                                                        viewBox="0 0 1920 1920">
                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <g id="SVGRepo_iconCarrier">
                                                                            <path d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0" fill-rule="evenodd" />
                                                                        </g>
                                                                    </BaseIcon>
                                                                    <h1 className="font-5 text-neutral-200">
                                                                        Reset Filter
                                                                    </h1>
                                                                </>
                                                            ]}
                                                        />
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
                                                            customClass="gap-3"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <SelectList
                                                                        ref={specialtyDropdownRef}
                                                                        triggerClass="b-2 outline-neutral-800 text-start"
                                                                        contentClass="b-2 outline-neutral-800 text-start"
                                                                        items={data.specialties}
                                                                        onSelect={(item) => {
                                                                            FindDoctorViewModel.updateFilter("specialty", item.label);
                                                                            setFormData({ ...FindDoctorViewModel });
                                                                        }}
                                                                        placeholder="Specialty"
                                                                    />
                                                                    <SelectList
                                                                        ref={ratingDropdownRef}
                                                                        items={formData.getRatings()}
                                                                        triggerClass="b-2 outline-neutral-800 text-start"
                                                                        contentClass="b-2 outline-neutral-800 text-start"
                                                                        onSelect={(item) => {
                                                                            FindDoctorViewModel.updateFilter("rating", item.value);
                                                                            setFormData({ ...FindDoctorViewModel });
                                                                        }}
                                                                        placeholder="Rating"
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass="align-items-center gap-4 px-1"
                                                            axis={false}
                                                            stretch={true}
                                                            items={[
                                                                <>
                                                                    <Checkbox
                                                                        checkboxClass="b-2 outline-neutral-700 fill-neutral-1100 align-self-center"
                                                                        checked={formData.filters.acceptingNewPatients}
                                                                        onChange={(checked) => {
                                                                            FindDoctorViewModel.updateFilter("acceptingNewPatients", checked);
                                                                            setFormData({ ...FindDoctorViewModel });
                                                                        }}
                                                                        label={[
                                                                            <p></p>
                                                                        ]}
                                                                    />
                                                                    <p className="text-neutral-300 font-medium">Accepting New Patients</p>
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
                                    customClass="gap-3"
                                    axis={true}
                                    fitParent={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="bg-neutral-1100 py-3 b-3 outline-neutral-200 br-sm"
                                                fitParent={true}
                                                isClickable={true}
                                                onClick={async (e) => {
                                                    e.preventDefault();

                                                    // Set loading state to true
                                                    setLoading(true);

                                                    try {
                                                        // Apply filters and fetch the filtered list of doctors
                                                        const filteredDoctors = await FindDoctorViewModel.applyFilters();

                                                        // Update the state with the filtered doctors
                                                        setData((prevData) => ({
                                                            ...prevData,
                                                            doctors: filteredDoctors,
                                                        }));

                                                        console.log("Filters applied: ", FindDoctorViewModel.filters);
                                                    } catch (error) {
                                                        console.error("Error applying filters: ", error);
                                                    } finally {
                                                        // Set loading state to false and close the modal
                                                        setLoading(false);
                                                        handleCloseModal();
                                                    }
                                                }}
                                                content={[
                                                    <>
                                                        <p className="font-semibold text-neutral-100">APPLY FILTERS</p>
                                                    </>
                                                ]}
                                            />
                                            <Container
                                                customClass="bg-neutral-200 py-3 br-sm"
                                                fitParent={true}
                                                isClickable={true}
                                                onClick={handleCloseModal}
                                                content={[
                                                    <>
                                                        <p className="font-semibold text-neutral-1100">CANCEL</p>
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
                        <Container
                            customClass="gradient-light br-md b-5 outline-neutral-1100 p-5"
                            fitParent={true}
                            header={[
                                <>
                                    <ItemGroup
                                        customClass="gap-5 px-3 pt-3"
                                        axis={true}
                                        fitParent={true}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass="px-1 justify-content-space-between align-items-center"
                                                    axis={false}
                                                    stretch={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            <h5 className="font-7 font-semibold">Find A Doctor</h5>
                                                            <ItemGroup
                                                                customClass="gap-2"
                                                                fitParent={true}
                                                                axis={false}
                                                                items={[
                                                                    <>
                                                                        <ItemGroup
                                                                            customClass="bg-neutral-1100 br-sm align-items-center justify-items-center px-4 gap-2"
                                                                            isClickable={true}
                                                                            onClick={handleOpenModal}
                                                                            stretch={true}
                                                                            axis={false}
                                                                            items={[
                                                                                <>
                                                                                    <BaseIcon
                                                                                        fill="none"
                                                                                        height="28px"
                                                                                        width="28px">
                                                                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        <g id="SVGRepo_iconCarrier">
                                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#000000" />
                                                                                        </g>
                                                                                    </BaseIcon>
                                                                                    <h1 className="font-5">
                                                                                        Filter
                                                                                    </h1>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                        <ItemGroup
                                                                            customClass="button bg-primary-500 br-sm align-items-center justify-items-center px-4 py-3 gap-3"
                                                                            isClickable={FindDoctorViewModel.doctorId !== null}
                                                                            dataAttributes={
                                                                                { disabled: FindDoctorViewModel.doctorId === null }
                                                                            }
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                addDoctor(currentUser.user_id, );
                                                                                navigate(`/dashboard/${currentUser.role}`);
                                                                            }}
                                                                            stretch={true}
                                                                            axis={false}
                                                                            items={[
                                                                                <>
                                                                                    <h1 className="font-5 font-medium text-neutral-1100">
                                                                                        Add Doctor
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
                                                    axis={false}
                                                    stretch={true}
                                                    fitParent={true}
                                                    evenSplit={true}
                                                    items={[
                                                        <>
                                                            <InputBar
                                                                customClass='bg-neutral-1100 py-1 pr-1 pl-6 br-lg input-placeholder-font-4 input-text-placeholder-neutral-800 input-text-neutral-100 input-font-4 input-p-0'
                                                                onChange={(e) => {
                                                                    FindDoctorViewModel.updateSearch(e.target.value);
                                                                    setFormData({ ...FindDoctorViewModel });
                                                                }}
                                                                value={formData.activeFilters.search}
                                                                placeholder="Search by name or specialty..."
                                                                sendIcon={
                                                                    <span className="button bg-primary-500 br-full circle p-0">
                                                                        <ItemGroup
                                                                            customClass="align-content-center justify-content-center"
                                                                            axis={true}
                                                                            isClickable={true}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                FindDoctorViewModel.applyFilters();
                                                                                setFormData({ ...FindDoctorViewModel });
                                                                                console.log("Filters applied: ", FindDoctorViewModel.filters);
                                                                            }}
                                                                            fitParent={true}
                                                                            items={[
                                                                                <>
                                                                                    <BaseIcon height={24} width={24} viewBox="0 -960 960 960" fillColor="#FFFFFF">
                                                                                        <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                                                                                    </BaseIcon>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                    </span>
                                                                }
                                                            />
                                                        </>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                    />
                                </>
                            ]}
                            contentClass="pt-8 px-3"
                            content={[
                                <>

                                    <ItemGroup
                                        customClass="gap-5"
                                        axis={true}
                                        fitParent={true}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass="gap-5 hideScroll"
                                                    axis={true}
                                                    fitParent={true}
                                                    style={{
                                                        maxHeight: "50vh"
                                                    }}
                                                    items={data.doctors.map((doctor) => (
                                                        <Container
                                                            key={doctor.user_id}
                                                            customClass={`p-8 bg-neutral-1100 hover-b-4 hover-outline-secondary-400 br-sm ${FindDoctorViewModel.doctorId === doctor.user_id ? 'selected' : ''}`}
                                                            isClickable={true}
                                                            onClick={() => {
                                                                if (FindDoctorViewModel.doctorId !== null && FindDoctorViewModel.doctorId === doctor.user_id) {
                                                                    FindDoctorViewModel.doctorId = null;
                                                                }
                                                                else {
                                                                    FindDoctorViewModel.doctorId = doctor.user_id;
                                                                }
                                                                FindDoctorViewModel.doctorId = doctor.user_id;
                                                                setFormData({ ...FindDoctorViewModel });
                                                                console.log("You selected ", FindDoctorViewModel.doctorId);
                                                            }}
                                                            fitParent={true}
                                                            content={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="justify-content-space-between"
                                                                        fitParent={true}
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <ItemGroup
                                                                                    customClass="gap-10 align-items-center"
                                                                                    stretch={true}
                                                                                    axis={false}
                                                                                    items={[
                                                                                        <>
                                                                                            <BaseIcon
                                                                                                height={70}
                                                                                                width={70}
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
                                                                                                customClass="gap-2"
                                                                                                axis={true}
                                                                                                stretch={true}
                                                                                                items={[
                                                                                                    <>
                                                                                                        <ItemGroup
                                                                                                            customClass="gap-1 align-items-center"
                                                                                                            axis={true}
                                                                                                            stretch={true}
                                                                                                            items={[
                                                                                                                <>
                                                                                                                    <h1 className="font-semibold font-5">{doctor.name}</h1>
                                                                                                                    <h1 className="font-semibold font-4">{doctor.specialization}</h1>
                                                                                                                </>
                                                                                                            ]}
                                                                                                        />
                                                                                                        {doctor.user.accepting_patients ? (
                                                                                                            <ItemGroup
                                                                                                                customClass="gap-3 align-items-center"
                                                                                                                stretch={true}
                                                                                                                axis={false}
                                                                                                                items={[
                                                                                                                    <>
                                                                                                                        <BaseIcon
                                                                                                                            height={15}
                                                                                                                            width={15}
                                                                                                                            viewBox="0 0 24 24"
                                                                                                                            fillColor="none">
                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            <g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="hsl(210, 70%, 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            </g>
                                                                                                                        </BaseIcon>
                                                                                                                        <p className="font-4 text-primary-500">New Patients</p>
                                                                                                                    </>
                                                                                                                ]}
                                                                                                            />
                                                                                                        ) : (
                                                                                                            <ItemGroup
                                                                                                                customClass="gap-3 align-items-center"
                                                                                                                stretch={true}
                                                                                                                axis={false}
                                                                                                                items={[
                                                                                                                    <>
                                                                                                                        <BaseIcon
                                                                                                                            height={20}
                                                                                                                            width={20}
                                                                                                                            viewBox="-3.5 0 19 19"
                                                                                                                            fillColor="hsl(0, 70%, 50%)">
                                                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                                                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
                                                                                                                            </g>
                                                                                                                        </BaseIcon>
                                                                                                                        <p className="font-4 text-warning-200">New Patients</p>
                                                                                                                    </>
                                                                                                                ]}
                                                                                                            />
                                                                                                        )}
                                                                                                    </>
                                                                                                ]}
                                                                                            />
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                                <ItemGroup
                                                                                    customClass="align-items-center gap-2 align-self-start"
                                                                                    axis={false}
                                                                                    items={[
                                                                                        <>
                                                                                            <BaseIcon
                                                                                                height={23}
                                                                                                width={25}
                                                                                                fillColor="none">
                                                                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                <g id="SVGRepo_iconCarrier">
                                                                                                    <path d="M8 12L11.5409 4.91816C11.81 4.38002 12.4136 4.09731 12.9992 4.23512V4.23512C13.5856 4.37308 14 4.8963 14 5.49867V9.64706H17.5767C18.8334 9.64706 19.7787 10.7925 19.5404 12.0264L18.1565 19.1897C18.0657 19.6601 17.6538 20 17.1747 20H8V12Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                    <path d="M4 13C4 12.4477 4.44772 12 5 12H8V20H5C4.44772 20 4 19.5523 4 19V13Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                </g>
                                                                                            </BaseIcon>
                                                                                            <p className="font-semibold font-3">{doctor.rating}%</p>
                                                                                        </>
                                                                                    ]}
                                                                                />
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    ))}
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

export default PDFindDoctor;