{/* 
    A base component that can be used to render SVG icons.
    Enter the unique children e.g. <path> or <rect> as props to the base icon
*/}
export default function BaseIcon({
    width = 30,
    height = 30,
    fillColor = "#1B2B32",
    viewBox = "0 0 24 24",
    children,
    ...attributes
})
{
    return (
        <svg
            fill={fillColor}
            width={width}
            height={height}
            viewBox={viewBox}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attributes}
        >
            <g>
                {children}
            </g>
        </svg>
    )
}
