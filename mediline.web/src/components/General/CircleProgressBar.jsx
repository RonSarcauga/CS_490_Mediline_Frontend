{/*
    This is a base component for a simple circular progress bar.
    It accepts percentage and circle width as a parameter.
*/ }
function CircleProgressBar({
    fraction = 50,
    total = 100,
    circleWidth,
    strokeColor,
    progressColor,
    text = `${fraction}`,
})
{
    const percentage = (fraction / total) * 100;
    const radius = circleWidth / 2 - 10;
    const strokeWidth = Math.max(circleWidth * 0.08, 2);
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
                    strokeWidth={strokeWidth}
                    r={radius}
                    stroke={strokeColor}
                    className="circle-background"
                />

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="15px"
                    r={radius}
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    className="circle-progress"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                />
                <text
                    x="50%"
                    y="50%"
                    dy="0.3em"
                    textAnchor="middle"
                    fontSize={Math.max(circleWidth * 0.2, 10)}
                    className="circle-text"
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

export default CircleProgressBar;