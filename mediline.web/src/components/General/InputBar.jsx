import BaseIcon from './BaseIcon'

{/* This is the base component for a search bar in our site */ }
export default function InputBar({ height = 24,
                                    weight = 24,
                                    viewBox = "0 -960 960 960",
                                    fillColor1 = "#E3E3E3",
                                    fillColor2 = "none",
                                    placeholder = '' }) {
    return (
        <div className="input-bar">
            <BaseIcon height={height} width={weight} viewBox={viewBox} fillColor={fillColor1}>
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
            </BaseIcon>
            <input type="text" placeholder={placeholder} />
            <BaseIcon height={height} width={weight} fillColor={fillColor2}>
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path d="M18.8951 3.61502C19.7248 3.37794 20.492 4.1451 20.2549 4.97489L16.2553 18.9736C15.8267 20.4736 13.823 20.7554 12.9973 19.4317L10.1999 14.947C9.87715 14.4296 9.44039 13.9928 8.92298 13.6701L4.43823 10.8726C3.11455 10.047 3.39632 8.04323 4.89636 7.61465L18.8951 3.61502Z" stroke={fillColor2} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.1924 13.6777L13.7279 10.1422" stroke={fillColor2} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </BaseIcon>
        </div>
    );
}
