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
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;
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

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="15px"
                    r={radius}
                    className="circle-progress"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                />
                <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="circle-text">
                    {percentage}% 
                </text>
            </svg>
        </div>
    );
};

export default CircleProgressBar;