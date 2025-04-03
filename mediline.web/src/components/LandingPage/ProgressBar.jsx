import Container, { ItemGroup } from '../General/Container';

export default function ProgressBar({
    currentStep = 1,
    formData,
    steps = [],
    stepInputs = [],
    onStepClick
})
{
    const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

    const getLastCompletedStep = () => {
        return Object.keys(stepInputs).reduce((lastStep, stepId) => {
            const inputs = stepInputs[stepId];
            const isStepComplete = inputs.length > 0 && inputs.every((field) => formData[field]?.trim() !== "");
            return isStepComplete ? parseInt(stepId) : lastStep;
        }, 0);
    }

    const lastCompletedStep = getLastCompletedStep();

    return (
        <ItemGroup
            customClass="gap-25 position-relative"
            axis={false}
            evenSplit={true}
            items={[
                <>
                    {steps.map((step, index) => (
                        <ItemGroup
                            key={index}
                            customClass="gap-4"
                            axis={true}
                            items={[
                                <>
                                    <Container
                                        customClass={`progress-indicator ${currentStep === step.id || step.id < currentStep ? "active" : ""
                                            }`}
                                        isClickable={step.id <= lastCompletedStep && currentStep !== step.id}
                                        onClick={() => {
                                            console.log(`Current step: ${step.id}`);
                                            console.log(`Last completed step: ${lastCompletedStep}`);
                                            console.log("Step Inputs: ", stepInputs);
                                            step.id <= lastCompletedStep + 1 && onStepClick(step.id);
                                        }}
                                        content={[
                                            <>
                                                <h1 className="font-semibold">{index + 1}</h1>
                                            </>
                                        ]}
                                    />
                                    <Container
                                        customClass={
                                            `progress-step ${step.id <= currentStep ? "active" : ""}`}
                                        content={[
                                            <h1 className={"font-semibold font-4 px-3"}>
                                                {step.label}
                                            </h1>
                                        ]}
                                    />
                                </>
                            ]}
                        />
                    ))}
                    <Container
                        customClass="stepbar-wrapper position-absolute"
                        maxWidth="90%"
                        content={[
                            <>
                                <Container
                                    customClass="step-bar h-25 p-0"
                                    fitParent={true}
                                />
                                <Container
                                    customClass="step-meter h-25 p-0"
                                    style={{
                                        width: `${progressPercentage}%`
                                    }}
                                />
                            </>
                        ]}
                    />
                </>
            ]}
        />
    );
}
