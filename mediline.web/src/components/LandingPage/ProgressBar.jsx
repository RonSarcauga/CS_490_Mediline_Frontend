import Container, { ItemGroup } from '../General/Container';
import { useState } from 'react';

export default function ProgressBar({
    currentStep,
    totalSteps
})
{
    return (
        <Container
            customClass="gap-20 px-10"
            content={[
                <ItemGroup
                    customClass="gap-25"
                    axis={false}
                    evenSplit={true}
                    items={[
                        <>
                            <ItemGroup
                                customClass="gap-4"
                                axis={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="br-full bg-neutral-1100 b-8 outline-neutral-1000 p-0 text-center align-items-center h-450 w-450"
                                            content={[
                                                <>
                                                    <h1 className="font-medium font-8 text-neutral-1000">1</h1>
                                                </>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0 text-center align-items-center"
                                            content={[
                                                <h1 className="font-semibold font-4 text-neutral-1000">
                                                    Personal<br />
                                                    Information
                                                </h1>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <ItemGroup
                                customClass="gap-4"
                                axis={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="br-full bg-neutral-1100 b-8 outline-neutral-1000 p-0 text-center align-items-center h-450 w-450"
                                            content={[
                                                <h1 className="font-medium font-8 text-neutral-1000">2</h1>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0 text-center align-items-center"
                                            content={[
                                                <>
                                                    <h1 className="font-semibold font-4 text-neutral-1000">
                                                        Choose<br />
                                                        Your Account
                                                    </h1>
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <ItemGroup
                                customClass="gap-4"
                                axis={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="br-full bg-neutral-1100 b-8 outline-neutral-1000 p-0 text-center align-items-center h-450 w-450"
                                            content={[
                                                <h1 className="font-medium font-8 text-neutral-1000">3</h1>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0 text-center align-items-center"
                                            content={[
                                                <>
                                                    <h1 className="font-semibold font-4 text-neutral-1000">
                                                        Account<br />
                                                        Information
                                                    </h1>
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <ItemGroup
                                customClass="gap-4"
                                axis={true}
                                items={[
                                    <>
                                        <Container
                                            customClass="br-full bg-neutral-1100 b-8 outline-neutral-1000 p-0 text-center align-items-center h-450 w-450"
                                            content={[
                                                <h1 className="font-medium font-8 text-neutral-1000">4</h1>
                                            ]}
                                        />
                                        <Container
                                            customClass="p-0 text-center align-items-center"
                                            content={[
                                                <>
                                                    <h1 className="font-semibold font-4 text-neutral-1000">
                                                        Review<br />
                                                        and Submit
                                                    </h1>
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                            <Container
                                customClass="progress-bar position-absolute h-25 bg-neutral-1000"
                                fitParent={true}
                                maxWidth="680px"
                            />
                        </>
                    ]}
                />
            ]}
        />

    );
}
