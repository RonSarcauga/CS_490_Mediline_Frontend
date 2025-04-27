{/*
    This is a base component for a simple circular progress bar.
    It accepts percentage and circle width as a parameter.
*/ }
function CircleProgressBar({
    percentage,
    circleWidth
})
{
    const radius = 85;

    return (
        <div>
            <svg
                height={circleWidth}
                width={circleWidth}
                viewBox={`0 0 ${circleWidth} ${circleWidth}`}
            >
                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="15px"
                    r={radius}
                    className="circle-background"
                />
            </svg>
        </div>
    );
};

export default CircleProgressBar;