import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BaseIcon from '../../components/General/BaseIcon';
import Container, { ItemGroup } from '../../components/General/Container';
import InputBar, { CustomTextArea } from '../../components/General/InputBar';
import { UserContext } from '../../context/UserProvider';
import { dashboardLayoutViewModel } from '../../viewModels/DashboardLayoutViewModel';
import { dpVM } from '../../viewModels/DPViewModel';
import Spinner from '../../components/General/Spinner';

function DDAccount()
{
    // Fetches data of the current user
    const { currentUser } = useContext(UserContext);

    // Used to manage data from API calls
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Used to initially load the data for the doctor profile
    useEffect(() => {
        fetchData();
    }, [])

    // Asynchronous fucntion to fetch all the data that is needed for the profile page
    const fetchData = async () => {
        const result = await dpVM.getDoctorData(currentUser.user_id);
        setData(result);
        setLoading(false);

        //console.log(`Profile Data:\n${JSON.stringify(result, null, 2)}`);
    }

    // Initializes the doctor information form
    const contactInfo = useForm();
    const onSubmitContactInfo = async (data) => {
        //console.log("Form to be submitted to backend: ", JSON.stringify(data, null, 2));

        toggleEditingState('contactInfo');
        setLoading(true);
        await dpVM.updateDoctorInfo(data, currentUser.user_id);
        fetchData();
        setLoading(false);
    }

    // State to track whether the form is in edit mode
    const [editingStates, setEditingStates] = useState({});

    const toggleEditingState = (formId) => {
        setEditingStates((prevStates) => ({
            ...prevStates,
            [formId]: !prevStates[formId],
        }));
    };

    // Handles loading the doctor page
    if (loading) return <Container fitParent={true} customClass="p-5" content={[<Spinner size={64} />]} />;
    if (!data) return <h3 className="font-semibold font-primary-neutral-300">Error: Data could not be fetched!</h3>;

    return (
        <>
            <ItemGroup
                customClass="gap-12 pl-8 pt-10 pb-5 hideScroll"
                axis={true}
                fitParent={true}
                style={{
                    maxHeight: "80dvh"
                }}
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
                                                    style={{
                                                        gridAutoColumns: "1fr 1fr auto"
                                                    }}
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
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            defaultValue={data.first_name}
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
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            defaultValue={data.last_name}
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
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            defaultValue={dashboardLayoutViewModel.capitalize(data.gender)}
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
                                                                            customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                            placeholder=""
                                                                            defaultValue={dashboardLayoutViewModel.formatBirthDate(data.dob, "MM/DD/YYYY")}
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
                                        customClass="bg-primary-dark-600 br-sm py-5 pl-5 pr-3"
                                        fitParent={true}
                                        content={[
                                            <>
                                                <ItemGroup
                                                    customClass="justify-content-space-between align-items-center"
                                                    axis={false}
                                                    fitParent={true}
                                                    stretch={true}
                                                    items={[
                                                        <>
                                                            <h5 className="font-5 text-dark-300 font-semibold">Contact Information</h5>
                                                            <Container
                                                                isClickable={true}
                                                                onClick={() => {
                                                                    toggleEditingState('contactInfo');
                                                                    console.log(`Readonly? ${editingStates.contactInfo}`);
                                                                }}
                                                                content={[
                                                                    <>
                                                                        {editingStates.contactInfo ? (
                                                                            // Edit button when editing is true
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 1024 750"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <path fill="hsl(0, 60%, 50%)" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                                                                                    </g>
                                                                                </svg>
                                                                            </BaseIcon>
                                                                        ) : (
                                                                            // Edit button when editing is false
                                                                            <BaseIcon>
                                                                                <svg
                                                                                    width="20px"
                                                                                    height="20px"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="#000000"
                                                                                    stroke-width="0.0005"
                                                                                >
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier" />
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="hsl(200, 30%, 35%)" />
                                                                                </svg>
                                                                            </BaseIcon>
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
                                    <form>
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
                                                                                {...contactInfo.register('email', { required: 'Email is required' })}
                                                                                customClass="bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0"
                                                                                placeholder="Enter your email"
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={data.email}
                                                                            />
                                                                            {contactInfo.formState.errors.email && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.email.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('phone', { required: 'Phone number is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your phone number"
                                                                                onChange={(e) => contactInfo.setValue('phone', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={dashboardLayoutViewModel.formatPhoneNumber(data.phone, "dashes")}
                                                                            />
                                                                            {contactInfo.formState.errors.phone && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.phone.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('address', { required: 'Address is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your address"
                                                                                onChange={(e) => contactInfo.setValue('address', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={data.address1}
                                                                            />
                                                                            {contactInfo.formState.errors.address && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.address.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('city', { required: 'City is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your city"
                                                                                onChange={(e) => contactInfo.setValue('city', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={data.city_id}
                                                                            />
                                                                            {contactInfo.formState.errors.city && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.city.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('state', { required: 'State is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your state"
                                                                                onChange={(e) => contactInfo.setValue('state', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={data.state}
                                                                            />
                                                                            {contactInfo.formState.errors.state && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.state.message}</p>
                                                                            )}
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
                                                                                {...contactInfo.register('zipcode', { required: 'Postal code is required' })}
                                                                                customClass='bg-primary-dark-800 py-2 pl-4 b-bottom-6 outline-primary-dark-100 br-none input-placeholder-font-4 input-text-placeholder-dark-200 input-text-dark-200 input-font-4 input-p-0'
                                                                                placeholder="Enter your postal code"
                                                                                onChange={(e) => contactInfo.setValue('zipcode', e.target.value)}
                                                                                readOnly={!editingStates.contactInfo}
                                                                                defaultValue={data.zipcode}
                                                                            />
                                                                            {contactInfo.formState.errors.zipcode && (
                                                                                <p className="text-danger">{contactInfo.formState.errors.zipcode.message}</p>
                                                                            )}
                                                                        </>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                    {editingStates.contactInfo && (
                                                        <ItemGroup
                                                            customClass="pt-6 gap-3 text-center"
                                                            axis={true}
                                                            fitParent={true}
                                                            items={[
                                                                <>
                                                                    <Container
                                                                        customClass="bg-primary-dark-700 py-3 b-3 outline-primary-neutral-200 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={contactInfo.handleSubmit(onSubmitContactInfo)}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-primary-neutral-200">CONFIRM</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <Container
                                                                        customClass="bg-primary-neutral-300 py-3 br-sm"
                                                                        fitParent={true}
                                                                        isClickable={true}
                                                                        onClick={() => toggleEditingState('contactInfo')}
                                                                        content={[
                                                                            <>
                                                                                <p className="font-semibold text-neutral-1000">CANCEL</p>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                    )}
                                                </>
                                            ]}
                                        />
                                    </form>
                                    <div></div>
                                </>
                            ]}
                        />
                    </>
                ]}
            />
        </>
    );
}

export default DDAccount;
