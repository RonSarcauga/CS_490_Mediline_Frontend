import { Link } from 'react-router-dom';
import { useState } from 'react';
import Container, { ItemGroup, PictureFrame } from '../../components/General/Container';
import BaseIcon from '../../components/General/BaseIcon';
import InputBar from '../../components/General/InputBar';
import Button from '../../components/General/Button';
import SelectList from '../../components/General/SelectList';
import Checkbox from '../../components/General/Checkbox';
import { specialties, ratings } from '../../assets/js/const';

export default function FindADoctorPage() {
    const [filters, setFilters] = useState({
        specialty: null,
        rating: null,
    });

    const handleSelect = (key, item) => {
        setFilters((prev) => ({
            ...prev,
            [key]: item,
        }));
    };

    const clearFilters = () => {
        setFilters({
            specialty: null,
            rating: null,
        });
    };

    return (
        <Container
            fitScreen={true}
            customClass="bg-secondary-500 align-items-center justify-content-center px-30"
            content={[
                <>
                    <ItemGroup
                        customClass="gap-5"
                        axis={true}
                        items={[
                            <>
                                <Container
                                    customClass="bg-neutral-1100 br-sm"
                                    content={[
                                        <>
                                        </>
                                    ]}
                                />
                                <ItemGroup
                                    customClass="gap-5"
                                    axis={false}
                                    stretch={true}
                                    items={[
                                        <>
                                            <ItemGroup
                                                customClass="bg-neutral-1100 br-sm p-10 gap-7"
                                                axis={true}
                                                items={[
                                                    <>
                                                        <ItemGroup
                                                            customClass='gap-2'
                                                            axis={true}
                                                            items={[
                                                                <>
                                                                    <h1 className="font-10">Search by</h1>
                                                                    <p className="font-5 mb-3">Specialty, Expertise, or Name</p>
                                                                    <InputBar
                                                                        customClass='b-2 outline-neutral-800 bg-0 py-1 pr-1 br-lg'
                                                                        sendIcon={
                                                                            <span className="button bg-primary-500 br-full circle p-0">
                                                                                <BaseIcon height={24} width={24} viewBox="0 -960 960 960" fillColor="#FFFFFF">
                                                                                    <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                                                                                </BaseIcon>
                                                                            </span>
                                                                            
                                                                        }
                                                                        placeholder="e.g. Exercise"
                                                                    />
                                                                </>
                                                            ]}
                                                        />
                                                        <Checkbox
                                                            label={[
                                                                <p>Accepting New Patients</p>
                                                            ]}
                                                        />
                                                        <ItemGroup
                                                            customClass='gap-5'
                                                            fitParent={true}
                                                            axis={true}
                                                            items={[
                                                                <>
                                                                    <ItemGroup
                                                                        customClass="align-items-center gap-3"
                                                                        stretch={true}
                                                                        axis={false}
                                                                        items={[
                                                                            <>
                                                                                <BaseIcon
                                                                                    fill="none"
                                                                                    height="40px"
                                                                                    width="40px">
                                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <g id="SVGRepo_iconCarrier">
                                                                                        <title>Filter</title>
                                                                                        <g id="Page-1" stroke-width="0.9600000000000002" fill="none" fill-rule="evenodd">
                                                                                            <g id="Filter">
                                                                                                <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24">
                                                                                                </rect>
                                                                                                <line x1="4" y1="5" x2="16" y2="5" id="Path" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round">
                                                                                                </line>
                                                                                                <line x1="4" y1="12" x2="10" y2="12" id="Path" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round">
                                                                                                </line> <line x1="14" y1="12" x2="20" y2="12" id="Path" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round">
                                                                                                </line> <line x1="8" y1="19" x2="20" y2="19" id="Path" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round">
                                                                                                </line>
                                                                                                <circle id="Oval" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round" cx="18" cy="5" r="2">
                                                                                                </circle>
                                                                                                <circle id="Oval" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round" cx="12" cy="12" r="2">
                                                                                                </circle>
                                                                                                <circle id="Oval" stroke="#0C0310" stroke-width="1.5" stroke-linecap="round" cx="6" cy="19" r="2">
                                                                                                </circle>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </BaseIcon>
                                                                                <h1 className="font-10">Filter</h1>
                                                                            </>
                                                                        ]}
                                                                    />
                                                                    <ItemGroup
                                                                        customClass="gap-3"
                                                                        axis={true}
                                                                        fitParent={true}
                                                                        items={[
                                                                            <>
                                                                                <SelectList
                                                                                    items={specialties}
                                                                                    placeholder="Specialty"
                                                                                    onSelect={(item) => handleSelect("specialty", item)}
                                                                                />
                                                                                <SelectList
                                                                                    items={ratings}
                                                                                    placeholder="Rating"
                                                                                    onSelect={(item) => handleSelect("rating", item)}
                                                                                />
                                                                                <Button
                                                                                    customClass="br-lg bg-primary-500"
                                                                                    isClickable={true}
                                                                                    style={{
                                                                                        width: "100%"
                                                                                    }}
                                                                                    content={[
                                                                                        <p className="font-semibold py-1">Update Results</p>
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
                                            <Container
                                                customClass="bg-neutral-1100 br-sm p-10"
                                                style={{
                                                    width: "70vw"
                                                }}
                                                header={[
                                                    <ItemGroup
                                                        fitParent={true}
                                                        axis={false}
                                                        stretch={true}
                                                        items={[
                                                            <>
                                                                <h1 className="font-10">Search Results</h1>
                                                                <ItemGroup
                                                                    customClass="gap-2 justify-self-end"
                                                                    axis={false}
                                                                    items={[
                                                                        <>
                                                                            <ItemGroup
                                                                                customClass="b-3 outline-neutral-1000 br-sm align-items-center justify-items-center px-3 gap-3"
                                                                                isClickable={true}
                                                                                onClick={clearFilters}
                                                                                stretch={true}
                                                                                axis={false}
                                                                                items={[
                                                                                    <>
                                                                                        <BaseIcon
                                                                                            fill="none"
                                                                                            height="20px"
                                                                                            width="20px"
                                                                                            viewBox="0 0 1920 1920">
                                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <g id="SVGRepo_iconCarrier">
                                                                                                <path d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0" fill-rule="evenodd" />
                                                                                            </g>
                                                                                        </BaseIcon>
                                                                                        <h1 className="font-5">
                                                                                            Reset Filter
                                                                                        </h1>
                                                                                    </>
                                                                                ]}
                                                                            />
                                                                            <ItemGroup
                                                                                customClass="bg-primary-500 br-sm align-items-center justify-items-center px-4 gap-3"
                                                                                isClickable={true}
                                                                                stretch={true}
                                                                                axis={false}
                                                                                items={[
                                                                                    <>
                                                                                        <h1 className="font-5 font-medium text-neutral-1100">
                                                                                            Add Doctor
                                                                                        </h1>
                                                                                    </>
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
                                        </>
                                    ]}
                                />
                            </>
                        ]}
                    />
                </>
            ]}
        />
    );
}
