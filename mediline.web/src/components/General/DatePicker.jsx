import { useState } from 'react';
import Container, { ItemGroup } from './Container';
import BaseIcon from './BaseIcon';
import { monthNames } from '../../assets/js/const';

export default function DatePicker({
    height = 30,
    weight = 30
})
{
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getYear());

    return (
        <Container
            header={[
                <ItemGroup
                    customClass="align-items-center font-5"
                    axis={false}
                    items={[
                        <>
                            <BaseIcon
                                height={height}
                                weight={weight}
                                fillColor='none'>
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0606 11.9999L15.5303 17.4696L14.4696 18.5303L7.93928 11.9999L14.4696 5.46961L15.5303 6.53027L10.0606 11.9999Z" fill="#080341" />
                                </g>
                            </BaseIcon>
                            <p className="font-semibold">{monthNames[currentMonth]}</p>
                            <BaseIcon
                                height={30}
                                weight={30}
                                fillColor='none'>
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9394 12.0001L8.46973 6.53039L9.53039 5.46973L16.0607 12.0001L9.53039 18.5304L8.46973 17.4697L13.9394 12.0001Z" fill="#080341" />
                                </g>
                            </BaseIcon>
                        </>
                    ]}
                />
            ]}
        />
    );
}