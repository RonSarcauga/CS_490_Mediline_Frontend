import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container, { ItemGroup } from '../../components/General/Container';
import BaseIcon from '../../components/General/BaseIcon';
import InputBar from '../../components/General/InputBar';
import ProgressBar from '../../components/LandingPage/ProgressBar';
import RegistrationViewModel from '../../viewModels/RegisterViewModel';
import { useRegister } from '../../hooks/useRegister';

export default function MultiStepRegistration()
{
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(RegistrationViewModel);
    const navigate = useNavigate();

    const registerMutation = useRegister();

    const steps = [
        { id: 1, label: <><span>Personal</span><br /><span>Information</span></> },
        { id: 2, label: <><span>Contact</span><br /><span>Information</span></> },
        { id: 3, label: <><span>Account</span><br /><span>Information</span></> },
        { id: 4, label: <><span>Choose</span><br /><span>Your Account</span></> },
    ]

    const stepInputs = {
        1: Object.keys(formData).filter((key) => ["firstname", "lastname", "sex", "dateOfBirth"].includes(key)),
        2: Object.keys(formData).filter((key) => ["email", "phone", "address", "city", "state", "postalCode"].includes(key)),
        3: Object.keys(formData).filter((key) => ["password", "confirmPassword"].includes(key)),
        4: Object.keys(formData).filter((key) => ["accountType"].includes(key)),
        5: Object.keys(formData).filter((key) => {
            if (formData.accountType === "doctor") {
                return ["licenseNumber", "specialty"].includes(key);
            }
            else if (formData.accountType === "pharmacist") {
                return ["pharmacyName", "pharmacyAddress"].includes(key)
            }
            else if (formData.accountType === "patient") {
                return ["pharmacyAddress"].includes(key)
            }
            return false;
        }),
    };

    const currentStepInputs = stepInputs[currentStep] || [];

    const isCurrentStepComplete = currentStepInputs.every(
        (field) => formData[field]?.trim() !== ""
    );

    const validatePasswordMatch = formData.password === formData.confirmPassword && formData.password.trim() !== "" && formData.confirmPassword.trim() !== "";

    function handleClick(role) {
        handleInput("accountType", { value: role });
    }

    const handleStepClick = (step) => {
        if (step <= currentStep || isCurrentStepComplete) {
            setCurrentStep(step);
        }
        else {
            alert("Please complete the current step before moving on!");
        }
    }

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };
    const handleInput = (field, target) => {
        setFormData({
            ...formData,
            [field]: target.value,
        });
    };

    const handleSubmit = () => {
        const withExtra = {
            ...formData,
            country: "United States of America",
        };
        console.log(formData)
        Object.assign(RegistrationViewModel, withExtra);
        RegistrationViewModel.gender = formData.sex
        const payload = RegistrationViewModel.getPayload();

        if (formData.accountType === 'doctor') {
            payload.fee   = '150';
            payload.hours = '09:00-21:00';
        }
        else if (formData.accountType === 'pharmacist') {
            payload.hours = '09:00-21:00';
            payload.account_type = 'pharmacy';
        }
        console.log(payload)
        registerMutation.mutate(
            payload,
          {
            onSuccess: (newUser) => {
              console.log('Registration success:', newUser);

              RegistrationViewModel.clearFields();
              setFormData({ ...RegistrationViewModel });
              navigate('/login');
            },
            onError: (err) => {
                if (err.response) {
                    console.error("Status:", err.response.status);
                    console.error("Headers:", err.response.headers);
                    console.error("Body:", err.response.data);
                  } else {
                    console.error("Network / CORS error:", err);
                  }
                }
            }
        );
    };

    return (
        <Container
            fitScreen={true}
            customClass="bg-secondary-500 align-items-center justify-content-center px-30"
            content={[
                <form onSubmit={(e) => e.preventDefault()}>
                    {currentStep === 1 && (
                        <Container
                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
                            fitParent={true}
                            content={[
                                <ItemGroup
                                    customClass="justify-items-center gap-10"
                                    stretch={true}
                                    axis={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="gap-10 px-10"
                                                content={[
                                                    <ProgressBar
                                                        formData={formData}
                                                        steps={steps}
                                                        stepInputs={stepInputs}
                                                        currentStep={currentStep}
                                                        onStepClick={handleStepClick}
                                                    />
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-3 px-10"
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <h1 className="font-8 font-semibold">Personal Information</h1>
                                                        <p className="font-5 text-neutral-600">Before you get started, tell us a little more about yourself.</p>
                                                    </>
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-5 px-10"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass='gap-5'
                                                            axis={false}
                                                            fitParent={true}
                                                            stretch={true}
                                                            style={{
                                                                gridAutoColumns: "1fr 1fr auto"
                                                            }}
                                                            items={[
                                                                <>
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.firstname}
                                                                        onChange={(e) => handleInput('firstname', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="First Name"
                                                                    />
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.lastname}
                                                                        onChange={(e) => handleInput('lastname', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="Last Name"
                                                                    />
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.sex}
                                                                        onChange={(e) => handleInput('sex', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="Sex"
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <InputBar
                                                            type="text"
                                                            value={formData.dateOfBirth}
                                                            onChange={(e) => handleInput("dateOfBirth", e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Date of Birth (yyyy-mm-dd)"
                                                        />
                                                        <Container
                                                            customClass="button bg-dark-100 justify-items-center align-items-center br-sm"
                                                            dataAttributes={
                                                                { disabled: !isCurrentStepComplete }
                                                            }
                                                            fitParent={true}
                                                            isClickable={isCurrentStepComplete}
                                                            onClick={handleNext}
                                                            content={[
                                                                <p className="font-regular text-neutral-1100 py-2">
                                                                    Next
                                                                </p>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            ]}
                        />
                    )}
                    {currentStep === 2 && (
                        <Container
                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
                            fitParent={true}
                            content={[
                                <ItemGroup
                                    customClass="justify-items-center gap-10"
                                    stretch={true}
                                    axis={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="gap-10 px-10"
                                                content={[
                                                    <ProgressBar
                                                        formData={formData}
                                                        steps={steps}
                                                        stepInputs={stepInputs}
                                                        currentStep={currentStep}
                                                        onStepClick={handleStepClick}
                                                    />
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-3 px-10"
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <h1 className="font-8 font-semibold">Contact Information</h1>
                                                        <p className="font-5 text-neutral-600">Nice to meet you {formData.firstname}! How can we reach you?</p>
                                                    </>
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-4 px-10"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <InputBar
                                                            type="text"
                                                            value={formData.email}
                                                            onChange={(e) => handleInput('email', e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Email"
                                                        />
                                                        <InputBar
                                                            type="text"
                                                            value={formData.phone}
                                                            onChange={(e) => handleInput('phone', e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Phone"
                                                        />
                                                        <InputBar
                                                            type="text"
                                                            value={formData.address}
                                                            onChange={(e) => handleInput('address', e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Address"
                                                        />
                                                        <ItemGroup
                                                            customClass="gap-4"
                                                            axis={false}
                                                            fitParent={true}
                                                            stretch={true}
                                                            evenSplit={true}
                                                            items={[
                                                                <>
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.city}
                                                                        onChange={(e) => handleInput('city', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="City"
                                                                    />
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.state}
                                                                        onChange={(e) => handleInput('state', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="State"
                                                                    />
                                                                    <InputBar
                                                                        type="text"
                                                                        value={formData.postalCode}
                                                                        onChange={(e) => handleInput('postalCode', e.target)}
                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                        placeholder="Postal Code"
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <Container
                                                            customClass={`button bg-dark-100 justify-items-center align-items-center br-sm`}
                                                            fitParent={true}
                                                            isClickable={isCurrentStepComplete}
                                                            onClick={handleNext}
                                                            dataAttributes={
                                                                { disabled: !isCurrentStepComplete }
                                                            }
                                                            content={[
                                                                <p className="font-regular text-neutral-1100 py-2">
                                                                    Next
                                                                </p>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            ]}
                        />
                    )}
                    {currentStep === 3 && (
                        <Container
                            customClass="bg-neutral-1100 br align-items-center justify-content-center py-15 box-shadow-sm"
                            content={[
                                <ItemGroup
                                    customClass="justify-items-center gap-10"
                                    stretch={true}
                                    axis={true}
                                    items={[
                                        <>
                                            <Container
                                                customClass="gap-10 px-10"
                                                content={[
                                                    <ProgressBar
                                                        formData={formData}
                                                        steps={steps}
                                                        stepInputs={stepInputs}
                                                        currentStep={currentStep}
                                                        onStepClick={handleStepClick}
                                                    />
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-3 px-10"
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <h1 className="font-8 font-semibold">Account Information</h1>
                                                        <p className="font-5 text-neutral-600">Please enter a password for your account.</p>
                                                    </>
                                                ]}
                                            />
                                            <ItemGroup
                                                customClass="gap-4 px-10"
                                                axis={true}
                                                fitParent={true}
                                                items={[
                                                    <>
                                                        <InputBar
                                                            type="password"
                                                            value={formData.password}
                                                            onChange={(e) => handleInput('password', e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Password"
                                                        />
                                                        <InputBar
                                                            type="password"
                                                            value={formData.confirmPassword}
                                                            onChange={(e) => handleInput('confirmPassword', e.target)}
                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                            placeholder="Confirm Password"
                                                        />
                                                        <Container
                                                            customClass={`button bg-dark-100 justify-items-center align-items-center br-sm`}
                                                            fitParent={true}
                                                            isClickable={validatePasswordMatch}
                                                            onClick={handleNext}
                                                            dataAttributes={
                                                                { disabled: !validatePasswordMatch }
                                                            }
                                                            content={[
                                                                <p className="font-regular text-neutral-1100 py-2">
                                                                    Next
                                                                </p>
                                                            ]}
                                                        />
                                                    </>
                                                ]}
                                            />
                                        </>
                                    ]}
                                />
                            ]}
                        />
                    )}
                    {currentStep === 4 && (
                        <Container
                            customClass='bg-neutral-1100 br align-items-center justify-content-center p-15 box-shadow-sm'
                            content={[
                                <>
                                    <ItemGroup
                                        customClass='gap-7'
                                        axis={true}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass='gap-2'
                                                    axis={true}
                                                    items={[
                                                        <>
                                                            <h1 className='font-semibold font-8 text-neutral-100'>Choose account type</h1>
                                                            <p className='font-4 text-neutral-700'>
                                                                This will help us determine the services you need access to.
                                                            </p>
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass='gap-10'
                                                    stretch={true}
                                                    axis={false}
                                                    items={[
                                                        <>
                                                            <ItemGroup
                                                                key='doctor'
                                                                id='doctor'
                                                                customClass={
                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-4 ${formData.accountType === 'doctor' ? 'selected' : ''}`
                                                                }
                                                                isClickable={true}
                                                                onClick={() => handleClick("doctor")}
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <BaseIcon
                                                                            height={100}
                                                                            width={100}
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
                                                                            customClass='text-center gap-1'
                                                                            maxWidth='200px'
                                                                            axis={true}
                                                                            items={[
                                                                                <>
                                                                                    <h1 className='font-4 text-neutral-100'>Doctor</h1>
                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to empower your patients</p>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                    </>
                                                                ]}
                                                            />
                                                            <ItemGroup
                                                                key='pharmacist'
                                                                id='pharmacist'
                                                                customClass={
                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-4 ${formData.accountType === 'pharmacist' ? 'selected' : ''}`
                                                                }
                                                                isClickable={true}
                                                                onClick={() => handleClick('pharmacist')}
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <BaseIcon
                                                                            height={100}
                                                                            width={100}
                                                                            fillColor='none'
                                                                            viewBox='0 0 61.7998 61.7998'>
                                                                            <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />

                                                                            <path d="M23.366 38.578l15.796.223v12.918l-15.907-.121.111-13.02z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.226 31.226 0 0 1-3.837-.237A34.069 34.069 0 0 1 15.9 57.919a31.032 31.032 0 0 1-7.856-6.225l1.283-3.1 13.925-6.212c.625 3.723 7.814 8.175 7.814 8.175s7.22-3.412 8.096-8.211l12.79 6.281z" fill="hsl(210, 40%, 80%)" fill-rule="evenodd" />

                                                                            <path d="M39.165 38.778v3.58c-.043.139-.074.324-.135.546a6.177 6.177 0 0 1-.243.687c-.17.409-1.345.063-1.568.415-5.375 4.164-11.988.868-13.855-5.245z" fill-rule="evenodd" opacity="0.11" />

                                                                            <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.974 31.974 0 0 1-1.472-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M18.7 26.997s-3.28-1.756-2.342-8.006 6.113-9.439 8.025-8.97A31.11 31.11 0 0 0 18.7 26.998z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

                                                                            <path d="M43.84 26.997s3.28-1.756 2.343-8.006-6.122-9.3-8.034-8.83a30.517 30.517 0 0 1 5.692 16.836z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

                                                                            <path d="M23.255 41.241l7.811 9.316-6.312 3.553-4.828-10.591 3.329-2.278z" fill="hsl(210, 40%, 75%)" fill-rule="evenodd" />

                                                                            <path d="M39.162 41.421l-8.096 9.136 6.524 3.553 4.782-10.719-3.21-1.97z" fill="hsl(210, 40%, 75%)" fill-rule="evenodd" />

                                                                            <path d="M31.128 35.672c-1.61 2.027-7.667 2.777-7.885-.859 1.412.65 2.595.497 4.694-1.183 2.1-1.679 3.21.305 3.21.305s1.183-1.984 3.283-.305c2.099 1.68 3.282 1.832 4.694 1.183-.218 3.636-6.386 2.886-7.996.859z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

                                                                            <circle cx="26.19927" cy="27.55705" fill="hsl(210, 20%, 50%)" r="3.18742" />

                                                                            <path d="M36.293 30.297c1.682-.548 1.382-.346 1.048-.208-1.418.208-1.773.133-2.096 0a2.746 2.746 0 0 0 1.048.208zm1.047-5.272h-2.094a2.734 2.734 0 0 1 1.047-.207 2.734 2.734 0 0 0-1.047.208h2.094zm6.478 1.21L40 26.998l-.11.025-.02-.11a3.62 3.62 0 0 0-.355-1.037 3.657 3.657 0 0 0-.653-.888l-.077-.076a3.65 3.65 0 0 0-1.103-.715 3.656 3.656 0 0 0-2.78 0 3.637 3.637 0 0 0-2.212 2.86l-.013.093h-2.865l-.012-.093a3.607 3.607 0 0 0-.346-1.116 3.653 3.653 0 0 0-.686-.953l-.076-.076a3.644 3.644 0 0 0-3.884-.715 3.637 3.637 0 0 0-2.187 2.705l-.02.111-.11-.025-3.773-.758-.038.757 3.878 1.19.06.02.012.06a3.626 3.626 0 0 0 .932 1.805l.066.066a3.658 3.658 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.181-.79l.001-.001.001-.001a3.626 3.626 0 0 0 1.023-2.018l.014-.092h2.878l.014.092a3.608 3.608 0 0 0 .348 1.09 3.652 3.652 0 0 0 .608.86l.068.069a3.657 3.657 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.18-.79l.002-.001v-.001a3.663 3.663 0 0 0 .636-.856 3.61 3.61 0 0 0 .359-.997l.012-.061.06-.02 3.91-1.195-.022-.761zm-16.571-1.21a2.745 2.745 0 0 1 .857.564h.002l.032.031a2.74 2.74 0 0 1 0 3.874l-.002.002a2.74 2.74 0 0 1-3.873 0l-.032-.032v-.002a2.745 2.745 0 0 1-.563-.858 2.741 2.741 0 0 1 0-2.094 2.743 2.743 0 0 1 1.484-1.484 2.742 2.742 0 0 1 2.095 0zm10.907.672a2.651 2.651 0 0 0-.492-.387 2.633 2.633 0 0 0-2.658-.047 2.656 2.656 0 0 0-.492.357 2.48 2.48 0 0 0-.247.26 2.64 2.64 0 0 0-.387.63 2.511 2.511 0 0 0-.098.262 2.62 2.62 0 0 0-.119.785c0 .086.005.172.013.257a2.615 2.615 0 0 0 .204.79 2.534 2.534 0 0 0 .118.239 2.64 2.64 0 0 0 .436.575v.002l.043.042.02.018.017.016a2.641 2.641 0 0 0 .26.21 2.598 2.598 0 0 0 .69.35 2.642 2.642 0 0 0 2.691-.636l.003-.002.05-.052a2.636 2.636 0 0 0-.05-3.67z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

                                                                            <circle cx="36.29302" cy="27.55707" fill="#e6e6e6" r="2.75515" />

                                                                            <circle cx="26.19942" cy="27.55707" fill="#e6e6e6" r="2.75515" />
                                                                        </BaseIcon>
                                                                        <ItemGroup
                                                                            customClass='text-center gap-1'
                                                                            maxWidth='200px'
                                                                            axis={true}
                                                                            items={[
                                                                                <>
                                                                                    <h1 className='font-4 text-neutral-100'>Pharmacist</h1>
                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to drug your patients</p>
                                                                                </>
                                                                            ]}
                                                                        />
                                                                    </>
                                                                ]}
                                                            />
                                                            <ItemGroup
                                                                key='patient'
                                                                id='patient'
                                                                customClass={
                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-12 ${formData.accountType === 'patient' ? 'selected' : ''}`
                                                                }
                                                                isClickable={true}
                                                                onClick={() => handleClick('patient')}
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <BaseIcon
                                                                            height={100}
                                                                            width={100}
                                                                            fillColor='none'
                                                                            viewBox='0 0 61.7998 61.7998'>
                                                                            <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />

                                                                            <path d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z" fill="hsl(210, 60%, 85%)" fill-rule="evenodd" />

                                                                            <path d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" fill-rule="evenodd" opacity="0.11" />

                                                                            <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

                                                                            <path d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

                                                                            <path d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z" fill="hsl(210, 60%, 83%)" fill-rule="evenodd" />

                                                                            <path d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z" fill="hsl(210, 60%, 83%)" fill-rule="evenodd" />

                                                                            <path d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z" fill="hsl(210, 50%, 70%)" fill-rule="evenodd" />

                                                                            <path d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z" fill="hsl(210, 50%, 70%)" fill-rule="evenodd" />
                                                                        </BaseIcon>
                                                                        <ItemGroup
                                                                            customClass='text-center gap-1'
                                                                            maxWidth='150px'
                                                                            axis={true}
                                                                            items={[
                                                                                <>
                                                                                    <h1 className='font-4 text-neutral-100'>Patient</h1>
                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to make a change</p>
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
                                                    customClass='button bg-dark-100 br-sm text-center'
                                                    dataAttributes={
                                                        { disabled: !formData.accountType || formData.accountType.trim() === "" }
                                                    }
                                                    isClickable={!!formData.accountType}
                                                    onClick={handleNext}
                                                    fitParent={true}
                                                    content={[
                                                        <p className='font-4 text-neutral-1100 py-2'>Next</p>
                                                    ]}
                                                />
                                            </>
                                        ]}
                                    />
                                </>
                            ]}
                        />
                    )}
                    {currentStep === 5 && formData.accountType === "doctor" && (
                        <Container
                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
                            fitParent={true}
                            content={[
                                <>
                                    <ItemGroup
                                        customClass="gap-7"
                                        axis={true}
                                        items={[
                                            <>
                                                <Container
                                                    customClass="gap-10 px-10"
                                                    content={[
                                                        <ProgressBar
                                                            formData={formData}
                                                            steps={steps}
                                                            stepInputs={stepInputs}
                                                            currentStep={currentStep}
                                                            onStepClick={handleStepClick}
                                                        />
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass='gap-3 px-15'
                                                    axis={true}
                                                    style={{
                                                        maxWidth: "50"
                                                    }}
                                                    items={[
                                                        <>
                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there Dr. {formData.firstname}!</h1>
                                                            <p className='font-5 text-neutral-700'>
                                                                We need some more information before we can get started.
                                                            </p>
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass="gap-4 px-15"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            <InputBar
                                                                type="text"
                                                                value={formData.licenseNumber}
                                                                onChange={(e) => handleInput('licenseNumber', e.target)}
                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                placeholder="License Number"
                                                            />
                                                            <InputBar
                                                                type="text"
                                                                value={formData.specialty}
                                                                onChange={(e) => handleInput('specialty', e.target)}
                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                placeholder="Specialty"
                                                            />
                                                            <Container
                                                                customClass="button bg-dark-100 justify-items-center align-items-center br-sm py-4"
                                                                fitParent={true}
                                                                isClickable={isCurrentStepComplete && !registerMutation.isLoading}
                                                                onClick={handleSubmit}
                                                                dataAttributes={{
                                                                    disabled: !isCurrentStepComplete || registerMutation.isLoading
                                                                }}
                                                                content={[
                                                                    <p className="text-decoration-none font-regular text-neutral-1100">
                                                                    {registerMutation.isLoading ? 'Submitting…' : 'Get Started'}
                                                                    </p>
                                                                ]}
                                                            />
                                                            {registerMutation.isError && (
                                                                <p className="text-error mt-2">
                                                                    {registerMutation.error.message}
                                                                </p>
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
                    )}
                    {currentStep === 5 && formData.accountType === "pharmacist" && (
                        <Container
                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
                            fitParent={true}
                            content={[
                                <>
                                    <ItemGroup
                                        customClass="gap-7"
                                        axis={true}
                                        items={[
                                            <>
                                                <Container
                                                    customClass="gap-10 px-10"
                                                    content={[
                                                        <ProgressBar
                                                            formData={formData}
                                                            steps={steps}
                                                            stepInputs={stepInputs}
                                                            currentStep={currentStep}
                                                            onStepClick={handleStepClick}
                                                        />
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass='gap-3 px-15'
                                                    axis={true}
                                                    style={{
                                                        maxWidth: "50"
                                                    }}
                                                    items={[
                                                        <>
                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there {formData.firstname}!</h1>
                                                            <p className='font-5 text-neutral-700'>
                                                                We need some more information before we can get started.
                                                            </p>
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass="gap-4 px-15"
                                                    axis={true}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            <InputBar
                                                                type="text"
                                                                value={formData.pharmacyName}
                                                                onChange={(e) => handleInput('pharmacyName', e.target)}
                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                placeholder="Pharmacy"
                                                            />
                                                            <InputBar
                                                                type="text"
                                                                value={formData.pharmacyAddress}
                                                                onChange={(e) => handleInput('pharmacyAddress', e.target)}
                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                placeholder="Pharmacy Address"
                                                            />
                                                            <Container
                                                                customClass="button bg-dark-100 justify-items-center align-items-center br-sm py-4"
                                                                fitParent={true}
                                                                isClickable={isCurrentStepComplete && !registerMutation.isLoading}
                                                                onClick={handleSubmit}
                                                                dataAttributes={{
                                                                    disabled: !isCurrentStepComplete || registerMutation.isLoading
                                                                }}
                                                                content={[
                                                                    <p className="text-decoration-none font-regular text-neutral-1100">
                                                                    {registerMutation.isLoading ? 'Submitting…' : 'Get Started'}
                                                                    </p>
                                                                ]}
                                                            />
                                                            {registerMutation.isError && (
                                                                <p className="text-error mt-2">
                                                                    {registerMutation.error.message}
                                                                </p>
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
                    )}
                    {currentStep === 5 && formData.accountType === "patient" && (
                        <Container
                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
                            fitParent={true}
                            content={[
                                <>
                                    <ItemGroup
                                        customClass="gap-7"
                                        axis={true}
                                        items={[
                                            <>
                                                <Container
                                                    customClass="gap-10 px-10"
                                                    content={[
                                                        <ProgressBar
                                                            formData={formData}
                                                            steps={steps}
                                                            stepInputs={stepInputs}
                                                            currentStep={currentStep}
                                                            onStepClick={handleStepClick}
                                                        />
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass='gap-3 px-20'
                                                    axis={true}
                                                    style={{
                                                        maxWidth: "60vw"
                                                    }}
                                                    items={[
                                                        <>
                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there {formData.firstname}!</h1>
                                                            <p className='font-5 text-neutral-700 text-justify'>
                                                                Before you log in and see your dashboard, we need to ask you a few questions.
                                                            </p>
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass="gap-4 px-20"
                                                    axis={true}
                                                    style={{
                                                        maxWidth: "60vw"
                                                    }}
                                                    fitParent={true}
                                                    items={[
                                                        <>
                                                            <InputBar
                                                                type="text"
                                                                value={formData.pharmacyAddress}
                                                                onChange={(e) => handleInput('pharmacyAddress', e.target)}
                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
                                                                placeholder="Pharmacy Address"
                                                            />
                                                            <Container
                                                                customClass="button bg-dark-100 justify-items-center align-items-center br-sm py-4"
                                                                fitParent={true}
                                                                isClickable={isCurrentStepComplete && !registerMutation.isLoading}
                                                                onClick={handleSubmit}
                                                                dataAttributes={{
                                                                    disabled: !isCurrentStepComplete || registerMutation.isLoading
                                                                }}
                                                                content={[
                                                                    <p className="text-decoration-none font-regular text-neutral-1100">
                                                                    {registerMutation.isLoading ? 'Submitting…' : 'Get Started'}
                                                                    </p>
                                                                ]}
                                                            />
                                                            {registerMutation.isError && (
                                                                <p className="text-error mt-2">
                                                                    {registerMutation.error.message}
                                                                </p>
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
                    )}
                </form>
            ]}
        />
    );
}

//import { Link, useNavigate } from 'react-router-dom';
//import { useState } from 'react';
//import Container, { ItemGroup } from '../../components/General/Container';
//import BaseIcon from '../../components/General/BaseIcon';
//import InputBar from '../../components/General/InputBar';
//import ProgressBar from '../../components/LandingPage/ProgressBar';
//import RegistrationViewModel from '../../viewModels/RegisterViewModel';

//export default function MultiStepRegistration() {
//    const [currentStep, setCurrentStep] = useState(1);
//    const [formData, setFormData] = useState(RegistrationViewModel);
//    const navigate = useNavigate();

//    const steps = [
//        { id: 1, label: <><span>Personal</span><br /><span>Information</span></> },
//        { id: 2, label: <><span>Contact</span><br /><span>Information</span></> },
//        { id: 3, label: <><span>Account</span><br /><span>Information</span></> },
//        { id: 4, label: <><span>Choose</span><br /><span>Your Account</span></> },
//    ]

//    const stepInputs = {
//        1: Object.keys(formData).filter((key) => ["firstname", "lastname", "sex", "dateOfBirth"].includes(key)),
//        2: Object.keys(formData).filter((key) => ["email", "phone", "address", "city", "state", "postalCode"].includes(key)),
//        3: Object.keys(formData).filter((key) => ["password", "confirmPassword"].includes(key)),
//        4: Object.keys(formData).filter((key) => ["accountType"].includes(key)),
//        5: Object.keys(formData).filter((key) => {
//            if (formData.accountType === "doctor") {
//                return ["licenseNumber", "specialty"].includes(key);
//            }
//            else if (formData.accountType === "pharmacist") {
//                return ["pharmacyName", "pharmacyAddress"].includes(key)
//            }
//            else if (formData.accountType === "patient") {
//                return ["pharmacyAddress"].includes(key)
//            }
//            return false;
//        }),
//    };

//    const currentStepInputs = stepInputs[currentStep] || [];

//    const isCurrentStepComplete = currentStepInputs.every(
//        (field) => formData[field]?.trim() !== ""
//    );

//    const validatePasswordMatch = formData.password === formData.confirmPassword && formData.password.trim() !== "" && formData.confirmPassword.trim() !== "";

//    function handleClick(role) {
//        handleInput("accountType", { value: role });
//    }

//    const handleStepClick = (step) => {
//        if (step <= currentStep || isCurrentStepComplete) {
//            setCurrentStep(step);
//        }
//        else {
//            alert("Please complete the current step before moving on!");
//        }
//    }

//    const handleNext = () => {
//        if (currentStep < 5) {
//            setCurrentStep((prevStep) => prevStep + 1);
//        }
//    };
//    const handleInput = (field, target) => {
//        setFormData({
//            ...formData,
//            [field]: target.value,
//        });
//    };

//    const handleSubmit = () => {
//        Object.keys(formData).forEach((key) => {
//            RegistrationViewModel[key] = formData[key];
//        });

//        RegistrationViewModel.addUser();

//        navigate('/login');
//    }

//    return (
//        <Container
//            fitScreen={true}
//            customClass="bg-secondary-500 align-items-center justify-content-center px-30"
//            content={[
//                <form onSubmit={(e) => e.preventDefault()}>
//                    {currentStep === 1 && (
//                        <Container
//                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
//                            fitParent={true}
//                            content={[
//                                <ItemGroup
//                                    customClass="justify-items-center gap-10"
//                                    stretch={true}
//                                    axis={true}
//                                    items={[
//                                        <>
//                                            <Container
//                                                customClass="gap-10 px-10"
//                                                content={[
//                                                    <ProgressBar
//                                                        formData={formData}
//                                                        steps={steps}
//                                                        stepInputs={stepInputs}
//                                                        currentStep={currentStep}
//                                                        onStepClick={handleStepClick}
//                                                    />
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-3 px-10"
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <h1 className="font-8 font-semibold">Personal Information</h1>
//                                                        <p className="font-5 text-neutral-600">Before you get started, tell us a little more about yourself.</p>
//                                                    </>
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-5 px-10"
//                                                axis={true}
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <ItemGroup
//                                                            customClass='gap-5'
//                                                            axis={false}
//                                                            fitParent={true}
//                                                            stretch={true}
//                                                            style={{
//                                                                gridAutoColumns: "1fr 1fr auto"
//                                                            }}
//                                                            items={[
//                                                                <>
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.firstname}
//                                                                        onChange={(e) => handleInput('firstname', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="First Name"
//                                                                    />
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.lastname}
//                                                                        onChange={(e) => handleInput('lastname', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="Last Name"
//                                                                    />
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.sex}
//                                                                        onChange={(e) => handleInput('sex', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="Sex"
//                                                                    />
//                                                                </>
//                                                            ]}
//                                                        />
//                                                        <InputBar
//                                                            type="text"
//                                                            value={formData.dateOfBirth}
//                                                            onChange={(e) => handleInput("dateOfBirth", e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Date of Birth (mm/dd/yyyy)"
//                                                        />
//                                                        <Container
//                                                            customClass="button bg-dark-100 justify-items-center align-items-center br-sm"
//                                                            dataAttributes={
//                                                                { disabled: !isCurrentStepComplete }
//                                                            }
//                                                            fitParent={true}
//                                                            isClickable={isCurrentStepComplete}
//                                                            onClick={handleNext}
//                                                            content={[
//                                                                <p className="font-regular text-neutral-1100 py-2">
//                                                                    Next
//                                                                </p>
//                                                            ]}
//                                                        />
//                                                    </>
//                                                ]}
//                                            />
//                                        </>
//                                    ]}
//                                />
//                            ]}
//                        />
//                    )}
//                    {currentStep === 2 && (
//                        <Container
//                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
//                            fitParent={true}
//                            content={[
//                                <ItemGroup
//                                    customClass="justify-items-center gap-10"
//                                    stretch={true}
//                                    axis={true}
//                                    items={[
//                                        <>
//                                            <Container
//                                                customClass="gap-10 px-10"
//                                                content={[
//                                                    <ProgressBar
//                                                        formData={formData}
//                                                        steps={steps}
//                                                        stepInputs={stepInputs}
//                                                        currentStep={currentStep}
//                                                        onStepClick={handleStepClick}
//                                                    />
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-3 px-10"
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <h1 className="font-8 font-semibold">Contact Information</h1>
//                                                        <p className="font-5 text-neutral-600">Nice to meet you {formData.firstname}! How can we reach you?</p>
//                                                    </>
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-4 px-10"
//                                                axis={true}
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <InputBar
//                                                            type="text"
//                                                            value={formData.email}
//                                                            onChange={(e) => handleInput('email', e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Email"
//                                                        />
//                                                        <InputBar
//                                                            type="text"
//                                                            value={formData.phone}
//                                                            onChange={(e) => handleInput('phone', e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Phone"
//                                                        />
//                                                        <InputBar
//                                                            type="text"
//                                                            value={formData.address}
//                                                            onChange={(e) => handleInput('address', e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Address"
//                                                        />
//                                                        <ItemGroup
//                                                            customClass="gap-4"
//                                                            axis={false}
//                                                            fitParent={true}
//                                                            stretch={true}
//                                                            evenSplit={true}
//                                                            items={[
//                                                                <>
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.city}
//                                                                        onChange={(e) => handleInput('city', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="City"
//                                                                    />
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.state}
//                                                                        onChange={(e) => handleInput('state', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="State"
//                                                                    />
//                                                                    <InputBar
//                                                                        type="text"
//                                                                        value={formData.postalCode}
//                                                                        onChange={(e) => handleInput('postalCode', e.target)}
//                                                                        customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                        placeholder="Postal Code"
//                                                                    />
//                                                                </>
//                                                            ]}
//                                                        />
//                                                        <Container
//                                                            customClass={`button bg-dark-100 justify-items-center align-items-center br-sm`}
//                                                            fitParent={true}
//                                                            isClickable={isCurrentStepComplete}
//                                                            onClick={handleNext}
//                                                            dataAttributes={
//                                                                { disabled: !isCurrentStepComplete }
//                                                            }
//                                                            content={[
//                                                                <p className="font-regular text-neutral-1100 py-2">
//                                                                    Next
//                                                                </p>
//                                                            ]}
//                                                        />
//                                                    </>
//                                                ]}
//                                            />
//                                        </>
//                                    ]}
//                                />
//                            ]}
//                        />
//                    )}
//                    {currentStep === 3 && (
//                        <Container
//                            customClass="bg-neutral-1100 br align-items-center justify-content-center py-15 box-shadow-sm"
//                            content={[
//                                <ItemGroup
//                                    customClass="justify-items-center gap-10"
//                                    stretch={true}
//                                    axis={true}
//                                    items={[
//                                        <>
//                                            <Container
//                                                customClass="gap-10 px-10"
//                                                content={[
//                                                    <ProgressBar
//                                                        formData={formData}
//                                                        steps={steps}
//                                                        stepInputs={stepInputs}
//                                                        currentStep={currentStep}
//                                                        onStepClick={handleStepClick}
//                                                    />
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-3 px-10"
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <h1 className="font-8 font-semibold">Account Information</h1>
//                                                        <p className="font-5 text-neutral-600">Please enter a password for your account.</p>
//                                                    </>
//                                                ]}
//                                            />
//                                            <ItemGroup
//                                                customClass="gap-4 px-10"
//                                                axis={true}
//                                                fitParent={true}
//                                                items={[
//                                                    <>
//                                                        <InputBar
//                                                            type="password"
//                                                            value={formData.password}
//                                                            onChange={(e) => handleInput('password', e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Password"
//                                                        />
//                                                        <InputBar
//                                                            type="password"
//                                                            value={formData.confirmPassword}
//                                                            onChange={(e) => handleInput('confirmPassword', e.target)}
//                                                            customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                            placeholder="Confirm Password"
//                                                        />
//                                                        <Container
//                                                            customClass={`button bg-dark-100 justify-items-center align-items-center br-sm`}
//                                                            fitParent={true}
//                                                            isClickable={validatePasswordMatch}
//                                                            onClick={handleNext}
//                                                            dataAttributes={
//                                                                { disabled: !validatePasswordMatch }
//                                                            }
//                                                            content={[
//                                                                <p className="font-regular text-neutral-1100 py-2">
//                                                                    Next
//                                                                </p>
//                                                            ]}
//                                                        />
//                                                    </>
//                                                ]}
//                                            />
//                                        </>
//                                    ]}
//                                />
//                            ]}
//                        />
//                    )}
//                    {currentStep === 4 && (
//                        <Container
//                            customClass='bg-neutral-1100 br align-items-center justify-content-center p-15 box-shadow-sm'
//                            content={[
//                                <>
//                                    <ItemGroup
//                                        customClass='gap-7'
//                                        axis={true}
//                                        items={[
//                                            <>
//                                                <ItemGroup
//                                                    customClass='gap-2'
//                                                    axis={true}
//                                                    items={[
//                                                        <>
//                                                            <h1 className='font-semibold font-8 text-neutral-100'>Choose account type</h1>
//                                                            <p className='font-4 text-neutral-700'>
//                                                                This will help us determine the services you need access to.
//                                                            </p>
//                                                        </>
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass='gap-10'
//                                                    stretch={true}
//                                                    axis={false}
//                                                    items={[
//                                                        <>
//                                                            <ItemGroup
//                                                                key='doctor'
//                                                                id='doctor'
//                                                                customClass={
//                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-4 ${formData.accountType === 'doctor' ? 'selected' : ''}`
//                                                                }
//                                                                isClickable={true}
//                                                                onClick={() => handleClick("doctor")}
//                                                                axis={true}
//                                                                items={[
//                                                                    <>
//                                                                        <BaseIcon
//                                                                            height={100}
//                                                                            width={100}
//                                                                            fillColor='none'
//                                                                            viewBox='0 0 61.7998 61.7998'>
//                                                                            <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />

//                                                                            <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />

//                                                                            <path d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" fill-rule="evenodd" opacity="0.11" />

//                                                                            <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z" fill="hsl(210, 40%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M39.162 41.98l-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />

//                                                                            <path d="M23.253 41.98l7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z" fill="hsl(210, 50%, 90%)" fill-rule="evenodd" />

//                                                                            <path d="M28.109 51.227l3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z" fill="hsl(210, 40%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />

//                                                                            <path d="M36.645 61.266c.588-.098 1.17-.234 1.747-.384.682-.177 1.36-.377 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z" fill="hsl(210, 40%, 93%)" fill-rule="evenodd" />
//                                                                        </BaseIcon>
//                                                                        <ItemGroup
//                                                                            customClass='text-center gap-1'
//                                                                            maxWidth='200px'
//                                                                            axis={true}
//                                                                            items={[
//                                                                                <>
//                                                                                    <h1 className='font-4 text-neutral-100'>Doctor</h1>
//                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to empower your patients</p>
//                                                                                </>
//                                                                            ]}
//                                                                        />
//                                                                    </>
//                                                                ]}
//                                                            />
//                                                            <ItemGroup
//                                                                key='pharmacist'
//                                                                id='pharmacist'
//                                                                customClass={
//                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-4 ${formData.accountType === 'pharmacist' ? 'selected' : ''}`
//                                                                }
//                                                                isClickable={true}
//                                                                onClick={() => handleClick('pharmacist')}
//                                                                axis={true}
//                                                                items={[
//                                                                    <>
//                                                                        <BaseIcon
//                                                                            height={100}
//                                                                            width={100}
//                                                                            fillColor='none'
//                                                                            viewBox='0 0 61.7998 61.7998'>
//                                                                            <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />

//                                                                            <path d="M23.366 38.578l15.796.223v12.918l-15.907-.121.111-13.02z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.226 31.226 0 0 1-3.837-.237A34.069 34.069 0 0 1 15.9 57.919a31.032 31.032 0 0 1-7.856-6.225l1.283-3.1 13.925-6.212c.625 3.723 7.814 8.175 7.814 8.175s7.22-3.412 8.096-8.211l12.79 6.281z" fill="hsl(210, 40%, 80%)" fill-rule="evenodd" />

//                                                                            <path d="M39.165 38.778v3.58c-.043.139-.074.324-.135.546a6.177 6.177 0 0 1-.243.687c-.17.409-1.345.063-1.568.415-5.375 4.164-11.988.868-13.855-5.245z" fill-rule="evenodd" opacity="0.11" />

//                                                                            <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.974 31.974 0 0 1-1.472-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M18.7 26.997s-3.28-1.756-2.342-8.006 6.113-9.439 8.025-8.97A31.11 31.11 0 0 0 18.7 26.998z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M43.84 26.997s3.28-1.756 2.343-8.006-6.122-9.3-8.034-8.83a30.517 30.517 0 0 1 5.692 16.836z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M23.255 41.241l7.811 9.316-6.312 3.553-4.828-10.591 3.329-2.278z" fill="hsl(210, 40%, 75%)" fill-rule="evenodd" />

//                                                                            <path d="M39.162 41.421l-8.096 9.136 6.524 3.553 4.782-10.719-3.21-1.97z" fill="hsl(210, 40%, 75%)" fill-rule="evenodd" />

//                                                                            <path d="M31.128 35.672c-1.61 2.027-7.667 2.777-7.885-.859 1.412.65 2.595.497 4.694-1.183 2.1-1.679 3.21.305 3.21.305s1.183-1.984 3.283-.305c2.099 1.68 3.282 1.832 4.694 1.183-.218 3.636-6.386 2.886-7.996.859z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <circle cx="26.19927" cy="27.55705" fill="hsl(210, 20%, 50%)" r="3.18742" />

//                                                                            <path d="M36.293 30.297c1.682-.548 1.382-.346 1.048-.208-1.418.208-1.773.133-2.096 0a2.746 2.746 0 0 0 1.048.208zm1.047-5.272h-2.094a2.734 2.734 0 0 1 1.047-.207 2.734 2.734 0 0 0-1.047.208h2.094zm6.478 1.21L40 26.998l-.11.025-.02-.11a3.62 3.62 0 0 0-.355-1.037 3.657 3.657 0 0 0-.653-.888l-.077-.076a3.65 3.65 0 0 0-1.103-.715 3.656 3.656 0 0 0-2.78 0 3.637 3.637 0 0 0-2.212 2.86l-.013.093h-2.865l-.012-.093a3.607 3.607 0 0 0-.346-1.116 3.653 3.653 0 0 0-.686-.953l-.076-.076a3.644 3.644 0 0 0-3.884-.715 3.637 3.637 0 0 0-2.187 2.705l-.02.111-.11-.025-3.773-.758-.038.757 3.878 1.19.06.02.012.06a3.626 3.626 0 0 0 .932 1.805l.066.066a3.658 3.658 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.181-.79l.001-.001.001-.001a3.626 3.626 0 0 0 1.023-2.018l.014-.092h2.878l.014.092a3.608 3.608 0 0 0 .348 1.09 3.652 3.652 0 0 0 .608.86l.068.069a3.657 3.657 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.18-.79l.002-.001v-.001a3.663 3.663 0 0 0 .636-.856 3.61 3.61 0 0 0 .359-.997l.012-.061.06-.02 3.91-1.195-.022-.761zm-16.571-1.21a2.745 2.745 0 0 1 .857.564h.002l.032.031a2.74 2.74 0 0 1 0 3.874l-.002.002a2.74 2.74 0 0 1-3.873 0l-.032-.032v-.002a2.745 2.745 0 0 1-.563-.858 2.741 2.741 0 0 1 0-2.094 2.743 2.743 0 0 1 1.484-1.484 2.742 2.742 0 0 1 2.095 0zm10.907.672a2.651 2.651 0 0 0-.492-.387 2.633 2.633 0 0 0-2.658-.047 2.656 2.656 0 0 0-.492.357 2.48 2.48 0 0 0-.247.26 2.64 2.64 0 0 0-.387.63 2.511 2.511 0 0 0-.098.262 2.62 2.62 0 0 0-.119.785c0 .086.005.172.013.257a2.615 2.615 0 0 0 .204.79 2.534 2.534 0 0 0 .118.239 2.64 2.64 0 0 0 .436.575v.002l.043.042.02.018.017.016a2.641 2.641 0 0 0 .26.21 2.598 2.598 0 0 0 .69.35 2.642 2.642 0 0 0 2.691-.636l.003-.002.05-.052a2.636 2.636 0 0 0-.05-3.67z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <circle cx="36.29302" cy="27.55707" fill="#e6e6e6" r="2.75515" />

//                                                                            <circle cx="26.19942" cy="27.55707" fill="#e6e6e6" r="2.75515" />
//                                                                        </BaseIcon>
//                                                                        <ItemGroup
//                                                                            customClass='text-center gap-1'
//                                                                            maxWidth='200px'
//                                                                            axis={true}
//                                                                            items={[
//                                                                                <>
//                                                                                    <h1 className='font-4 text-neutral-100'>Pharmacist</h1>
//                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to drug your patients</p>
//                                                                                </>
//                                                                            ]}
//                                                                        />
//                                                                    </>
//                                                                ]}
//                                                            />
//                                                            <ItemGroup
//                                                                key='patient'
//                                                                id='patient'
//                                                                customClass={
//                                                                    `gap-3 br-sm justify-items-center b-4 outline-neutral-1000 hover-outline-secondary-400 py-15 px-12 ${formData.accountType === 'patient' ? 'selected' : ''}`
//                                                                }
//                                                                isClickable={true}
//                                                                onClick={() => handleClick('patient')}
//                                                                axis={true}
//                                                                items={[
//                                                                    <>
//                                                                        <BaseIcon
//                                                                            height={100}
//                                                                            width={100}
//                                                                            fillColor='none'
//                                                                            viewBox='0 0 61.7998 61.7998'>
//                                                                            <circle cx="30.8999" cy="30.8999" fill="hsl(210, 50%, 90%)" r="30.8999" />

//                                                                            <path d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z" fill="hsl(210, 60%, 85%)" fill-rule="evenodd" />

//                                                                            <path d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" fill-rule="evenodd" opacity="0.11" />

//                                                                            <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z" fill="hsl(210, 10%, 95%)" fill-rule="evenodd" />

//                                                                            <path d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z" fill="hsl(210, 30%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z" fill="hsl(210, 60%, 83%)" fill-rule="evenodd" />

//                                                                            <path d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z" fill="hsl(210, 60%, 83%)" fill-rule="evenodd" />

//                                                                            <path d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z" fill="hsl(210, 50%, 70%)" fill-rule="evenodd" />

//                                                                            <path d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z" fill="hsl(210, 50%, 70%)" fill-rule="evenodd" />
//                                                                        </BaseIcon>
//                                                                        <ItemGroup
//                                                                            customClass='text-center gap-1'
//                                                                            maxWidth='150px'
//                                                                            axis={true}
//                                                                            items={[
//                                                                                <>
//                                                                                    <h1 className='font-4 text-neutral-100'>Patient</h1>
//                                                                                    <p className='font-3 font-medium text-neutral-700'>You are here to make a change</p>
//                                                                                </>
//                                                                            ]}
//                                                                        />
//                                                                    </>
//                                                                ]}
//                                                            />
//                                                        </>
//                                                    ]}
//                                                />
//                                                <Container
//                                                    customClass='button bg-dark-100 br-sm text-center'
//                                                    dataAttributes={
//                                                        { disabled: !formData.accountType || formData.accountType.trim() === "" }
//                                                    }
//                                                    isClickable={!!formData.accountType}
//                                                    onClick={handleNext}
//                                                    fitParent={true}
//                                                    content={[
//                                                        <p className='font-4 text-neutral-1100 py-2'>Next</p>
//                                                    ]}
//                                                />
//                                            </>
//                                        ]}
//                                    />
//                                </>
//                            ]}
//                        />
//                    )}
//                    {currentStep === 5 && formData.accountType === "doctor" && (
//                        <Container
//                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
//                            fitParent={true}
//                            content={[
//                                <>
//                                    <ItemGroup
//                                        customClass="gap-7"
//                                        axis={true}
//                                        items={[
//                                            <>
//                                                <Container
//                                                    customClass="gap-10 px-10"
//                                                    content={[
//                                                        <ProgressBar
//                                                            formData={formData}
//                                                            steps={steps}
//                                                            stepInputs={stepInputs}
//                                                            currentStep={currentStep}
//                                                            onStepClick={handleStepClick}
//                                                        />
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass='gap-3 px-15'
//                                                    axis={true}
//                                                    style={{
//                                                        maxWidth: "50"
//                                                    }}
//                                                    items={[
//                                                        <>
//                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there Dr. {formData.firstname}!</h1>
//                                                            <p className='font-5 text-neutral-700'>
//                                                                We need some more information before we can get started.
//                                                            </p>
//                                                        </>
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass="gap-4 px-15"
//                                                    axis={true}
//                                                    fitParent={true}
//                                                    items={[
//                                                        <>
//                                                            <InputBar
//                                                                type="text"
//                                                                value={formData.licenseNumber}
//                                                                onChange={(e) => handleInput('licenseNumber', e.target)}
//                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                placeholder="License Number"
//                                                            />
//                                                            <InputBar
//                                                                type="text"
//                                                                value={formData.specialty}
//                                                                onChange={(e) => handleInput('specialty', e.target)}
//                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                placeholder="Specialty"
//                                                            />
//                                                            <Container
//                                                                customClass={`button bg-dark-100 justify-items-center align-items-center br-sm py-4`}
//                                                                fitParent={true}
//                                                                isClickable={isCurrentStepComplete}
//                                                                onClick={handleSubmit}
//                                                                dataAttributes={
//                                                                    { disabled: !isCurrentStepComplete }
//                                                                }
//                                                                content={[
//                                                                    <p className=" text-decoration-none font-regular text-neutral-1100">
//                                                                        Get Started
//                                                                    </p>
//                                                                ]}
//                                                            />
//                                                        </>
//                                                    ]}
//                                                />
//                                            </>
//                                        ]}
//                                    />
//                                </>
//                            ]}
//                        />
//                    )}
//                    {currentStep === 5 && formData.accountType === "pharmacist" && (
//                        <Container
//                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
//                            fitParent={true}
//                            content={[
//                                <>
//                                    <ItemGroup
//                                        customClass="gap-7"
//                                        axis={true}
//                                        items={[
//                                            <>
//                                                <Container
//                                                    customClass="gap-10 px-10"
//                                                    content={[
//                                                        <ProgressBar
//                                                            formData={formData}
//                                                            steps={steps}
//                                                            stepInputs={stepInputs}
//                                                            currentStep={currentStep}
//                                                            onStepClick={handleStepClick}
//                                                        />
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass='gap-3 px-15'
//                                                    axis={true}
//                                                    style={{
//                                                        maxWidth: "50"
//                                                    }}
//                                                    items={[
//                                                        <>
//                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there {formData.firstname}!</h1>
//                                                            <p className='font-5 text-neutral-700'>
//                                                                We need some more information before we can get started.
//                                                            </p>
//                                                        </>
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass="gap-4 px-15"
//                                                    axis={true}
//                                                    fitParent={true}
//                                                    items={[
//                                                        <>
//                                                            <InputBar
//                                                                type="text"
//                                                                value={formData.pharmacyName}
//                                                                onChange={(e) => handleInput('pharmacyName', e.target)}
//                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                placeholder="Pharmacy"
//                                                            />
//                                                            <InputBar
//                                                                type="text"
//                                                                value={formData.pharmacyAddress}
//                                                                onChange={(e) => handleInput('pharmacyAddress', e.target)}
//                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                placeholder="Pharmacy Address"
//                                                            />
//                                                            <Container
//                                                                customClass={`button bg-dark-100 justify-items-center align-items-center br-sm py-4`}
//                                                                fitParent={true}
//                                                                isClickable={isCurrentStepComplete}
//                                                                onClick={handleSubmit}
//                                                                dataAttributes={
//                                                                    { disabled: !isCurrentStepComplete }
//                                                                }
//                                                                content={[
//                                                                    <p className=" text-decoration-none font-regular text-neutral-1100">
//                                                                        Get Started
//                                                                    </p>
//                                                                ]}
//                                                            />
//                                                        </>
//                                                    ]}
//                                                />
//                                            </>
//                                        ]}
//                                    />
//                                </>
//                            ]}
//                        />
//                    )}
//                    {currentStep === 5 && formData.accountType === "patient" && (
//                        <Container
//                            customClass="align-items-center bg-neutral-1100 br box-shadow-sm gap-15"
//                            fitParent={true}
//                            content={[
//                                <>
//                                    <ItemGroup
//                                        customClass="gap-7"
//                                        axis={true}
//                                        items={[
//                                            <>
//                                                <Container
//                                                    customClass="gap-10 px-10"
//                                                    content={[
//                                                        <ProgressBar
//                                                            formData={formData}
//                                                            steps={steps}
//                                                            stepInputs={stepInputs}
//                                                            currentStep={currentStep}
//                                                            onStepClick={handleStepClick}
//                                                        />
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass='gap-3 px-20'
//                                                    axis={true}
//                                                    style={{
//                                                        maxWidth: "60vw"
//                                                    }}
//                                                    items={[
//                                                        <>
//                                                            <h1 className='font-semibold font-8 text-neutral-100'>You're almost there {formData.firstname}!</h1>
//                                                            <p className='font-5 text-neutral-700 text-justify'>
//                                                                Before you log in and see your dashboard, we need to ask you a few questions.
//                                                            </p>
//                                                        </>
//                                                    ]}
//                                                />
//                                                <ItemGroup
//                                                    customClass="gap-4 px-20"
//                                                    axis={true}
//                                                    style={{
//                                                        maxWidth: "60vw"
//                                                    }}
//                                                    fitParent={true}
//                                                    items={[
//                                                        <>
//                                                            <InputBar
//                                                                type="text"
//                                                                value={formData.pharmacyAddress}
//                                                                onChange={(e) => handleInput('pharmacyAddress', e.target)}
//                                                                customClass="br-sm py-4 input-font-4 input-placeholder-font-4 input-text-neutral-600"
//                                                                placeholder="Pharmacy Address"
//                                                            />
//                                                            <Container
//                                                                customClass={`button bg-dark-100 justify-items-center align-items-center br-sm py-4`}
//                                                                fitParent={true}
//                                                                isClickable={true}
//                                                                onClick={handleSubmit}
//                                                                content={[
//                                                                    <p className=" text-decoration-none font-regular text-neutral-1100">
//                                                                        Get Started
//                                                                    </p>
//                                                                ]}
//                                                            />
//                                                        </>
//                                                    ]}
//                                                />
//                                            </>
//                                        ]}
//                                    />
//                                </>
//                            ]}
//                        />
//                    )}
//                </form>
//            ]}
//        />
//    );
//}
