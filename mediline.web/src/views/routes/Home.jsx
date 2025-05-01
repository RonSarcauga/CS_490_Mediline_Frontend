import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import BaseIcon from '../../components/General/BaseIcon';
import Image from '../../components/General/Image'
import InputBar from '../../components/General/InputBar';
import Button from '../../components/General/Button';
import Container, { ItemGroup, PictureFrame } from '../../components/General/Container';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const serviceRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/findADoctor?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    }

    return (
        <>
            <Container
                fitScreen={true}
                header={[
                    <Topbar
                        customClass="px-10 pt-5"
                        itemClass="hover-group-primary-400 overflow-visible"
                        header={[
                            <ItemGroup
                                customClass="col-gap-4"
                                axis={false}
                                items={[
                                    <>
                                        <BaseIcon
                                            height={50}
                                            width={50}
                                            fillColor="none">
                                            <>
                                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M12.2407 2.96432C12.0063 2.96432 11.797 3.07184 11.6595 3.24024L11.6024 3.28346C9.45801 2.63339 7.03194 3.15091 5.33598 4.83602C3.82743 6.33492 3.24863 8.40778 3.59957 10.3471L3.58455 10.3619L2.6274 11.3129C1.7951 12.1399 1.7951 13.4807 2.6274 14.3077C3.11636 14.7935 3.78381 14.9939 4.42002 14.9089C4.51377 15.2552 4.6974 15.5824 4.9709 15.8542C5.34265 16.2235 5.81755 16.4279 6.30347 16.4673C6.34307 16.9503 6.54878 17.4223 6.92061 17.7917C7.30952 18.1781 7.81134 18.384 8.32054 18.4093C8.34607 18.9151 8.55325 19.4136 8.94208 19.7999C9.70236 20.5554 10.8942 20.6207 11.7291 19.996L12.1156 20.3801C12.952 21.2111 14.3079 21.2111 15.1443 20.3801C15.5147 20.012 15.721 19.5428 15.7633 19.0621C16.2462 19.021 16.7177 18.8168 17.0874 18.4495C17.4581 18.0812 17.6636 17.6114 17.7043 17.1303C18.1809 17.0858 18.6453 16.8821 19.0104 16.5193C19.2966 16.235 19.4844 15.89 19.5738 15.526C20.2005 15.6003 20.854 15.3986 21.3349 14.9208C22.1672 14.0938 22.1672 12.753 21.3349 11.926L20.5014 11.0979L20.6727 10.4313C21.045 8.98208 20.8578 7.44693 20.1482 6.12848C19.1007 4.182 17.0615 2.96933 14.8448 2.96933L13.2381 2.96933C13.1696 2.96601 13.1008 2.96432 13.0316 2.96432H12.2407ZM15.1649 7.90945L18.6286 11.351L18.6325 11.3551L18.6458 11.3687L20.2708 12.9833C20.5155 13.2264 20.5155 13.6205 20.2708 13.8635C20.0262 14.1066 19.6296 14.1066 19.3849 13.8635L17.7599 12.2489C17.4661 11.9569 16.9897 11.9569 16.6959 12.2489L16.6796 12.2651C16.3857 12.557 16.3857 13.0304 16.6796 13.3223L17.9464 14.581C18.1912 14.8243 18.1912 15.2188 17.9464 15.4621C17.7232 15.6838 17.3724 15.7037 17.1274 15.5206C16.8267 15.2958 16.4051 15.3263 16.1403 15.592C15.8756 15.8577 15.8491 16.2769 16.0784 16.5734C16.2668 16.8171 16.2481 17.1689 16.0234 17.3922C15.7968 17.6173 15.4389 17.6344 15.1934 17.4424C14.8947 17.2087 14.4674 17.2332 14.1977 17.4995C13.9279 17.7658 13.9006 18.1902 14.1339 18.4885C14.3276 18.7361 14.3093 19.0952 14.0802 19.3228C13.8315 19.5699 13.4284 19.5699 13.1797 19.3228L12.808 18.9535L12.9132 18.8489C13.7455 18.0219 13.7455 16.6811 12.9132 15.8542C12.5243 15.4677 12.0225 15.2619 11.5133 15.2366C11.4878 14.7308 11.2806 14.2323 10.8918 13.8459C10.52 13.4766 10.0451 13.2722 9.55922 13.2328C9.51962 12.7499 9.3139 12.2779 8.94208 11.9084C8.45311 11.4226 7.78567 11.2222 7.14945 11.3072C7.0557 10.9609 6.87208 10.6337 6.59857 10.3619C6.16723 9.93332 5.597 9.72685 5.03184 9.7425C4.88504 8.36976 5.34111 6.94543 6.40004 5.89327C7.38426 4.91535 8.69207 4.45489 9.98101 4.5119L8.48356 5.64643C7.45969 6.42216 7.26245 7.87941 8.04327 8.89941C8.82232 9.91708 10.2805 10.1144 11.302 9.34048L13.1908 7.90945H15.1649ZM9.3894 6.84203L12.5277 4.46432H13.0316C13.0811 4.46432 13.1302 4.46565 13.1789 4.46826C13.1922 4.46898 13.2056 4.46933 13.219 4.46933H14.8448C16.513 4.46933 18.043 5.38193 18.8274 6.83933C19.3221 7.7586 19.4773 8.8178 19.2712 9.83451L16.0591 6.63806C15.9178 6.49195 15.7232 6.40945 15.52 6.40945L12.9388 6.40945C12.7752 6.40945 12.6162 6.4629 12.4858 6.56165L10.3962 8.14487C10.0326 8.42032 9.5116 8.3498 9.23434 7.98762C8.95886 7.62776 9.02817 7.11571 9.3894 6.84203ZM6.03496 14.7969C5.86706 14.6301 5.81439 14.3921 5.87697 14.1807C5.90557 14.084 5.95823 13.9929 6.03496 13.9167L6.99212 12.9657C7.23675 12.7226 7.63338 12.7226 7.87802 12.9657C8.11986 13.2059 8.12262 13.5938 7.8863 13.8375L7.87776 13.8459L6.92061 14.797L6.91236 14.8052C6.8374 14.877 6.74888 14.9265 6.65519 14.9539C6.44237 15.0161 6.20287 14.9637 6.03496 14.7969ZM5.54368 11.4285C5.61917 11.5066 5.67014 11.5995 5.69659 11.6976C5.75261 11.9054 5.6986 12.1364 5.53451 12.2994L4.57736 13.2504C4.33272 13.4935 3.93609 13.4935 3.69146 13.2504C3.44682 13.0073 3.44682 12.6133 3.69146 12.3702L4.64861 11.4192C4.89325 11.1761 5.28988 11.1761 5.53451 11.4192L5.54368 11.4285ZM10.892 18.7427C10.8152 18.8191 10.7233 18.8714 10.6258 18.8998C10.4132 18.9618 10.1739 18.9094 10.0061 18.7427C9.83837 18.576 9.78565 18.3383 9.84799 18.1269C9.87655 18.0301 9.92926 17.9388 10.0061 17.8625L10.9633 16.9114C11.2079 16.6683 11.6046 16.6683 11.8492 16.9114C12.0938 17.1545 12.0938 17.5486 11.8492 17.7917L10.892 18.7427ZM8.87057 16.7345C8.7939 16.8106 8.7023 16.8629 8.60513 16.8914C8.39225 16.9537 8.15263 16.9013 7.98467 16.7345C7.8167 16.5676 7.76406 16.3295 7.82675 16.118C7.85432 16.0249 7.9042 15.937 7.97639 15.8626L7.98492 15.8542L8.94208 14.9031L8.95032 14.8949C9.19556 14.6602 9.5859 14.6629 9.82772 14.9032C10.0724 15.1463 10.0724 15.5404 9.82772 15.7834L8.87057 16.7345Z" fill="hsl(210,70%,40%)" />
                                                </g>
                                            </>
                                        </BaseIcon>
                                        <div className="font-7 text-primary-400">
                                            <h1 className="font-medium">MEDILINE</h1>
                                        </div>
                                    </>
                                ]}
                            />
                        ]}
                        items={[
                            <>
                                <TopbarItem
                                    text={"Services"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("Scrolling to ", serviceRef.current);
                                        serviceRef.current.scrollIntoView({ behavior: "smooth" })
                                    }}>
                                </TopbarItem>
                                <TopbarItem
                                    to={"/findADoctor"}
                                    text={"Doctors"}>
                                </TopbarItem>
                                <TopbarItem
                                    to={"/discussionForumPage"}
                                    text={"Discussion"}>
                                </TopbarItem>
                                <TopbarItem
                                    to={"/login"}
                                    text={"SIGN IN"}
                                    customClass="button"
                                    textClass="text-neutral-1100 hover-box-shadow shadow-primary-400">
                                </TopbarItem>
                            </>
                        ]}
                    />
                ]}
                content={[
                    <>
                        <ItemGroup
                            customClass='align-items-center justify-content-center gap-30'
                            fitParent={true}
                            stretch={true}
                            axis={false}
                            items={[
                                <>
                                    <ItemGroup
                                        customClass='gap-2'
                                        axis={true}
                                        items={[
                                            <>
                                                <h1 className="font-10">Find Your Doctor</h1>
                                                <p className="font-5 mb-3">Search through hundreds of qualified doctors</p>
                                                <InputBar
                                                    customClass='box-shadow-xs bg-0 py-2'
                                                    searchIcon={
                                                        <BaseIcon height={24} width={24} viewBox="0 -960 960 960" fillColor="#E3E3E3">
                                                            <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                                                        </BaseIcon>
                                                    }
                                                    placeholder="Specialty"
                                                    value={searchQuery}
                                                    onChange={(e) => {
                                                        setSearchQuery(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSubmit(e);
                                                        }
                                                    }}
                                                />
                                            </>
                                        ]}
                                    />
                                    <Image
                                        src={'/img/LandingPage1.jpg'}
                                        alt='Find A Doctor Image'
                                        height="500px"
                                        width="630px"
                                    />
                                </>
                            ]}
                        />
                    </>
                ]}
            />
            <section ref={serviceRef}>
                <Container
                    customClass='align-items-center justify-content-center p-20'
                    fitScreen={true}
                    content={[
                        <>
                            <ItemGroup
                                customClass='gap-20 align-items-center'
                                stretch={true}
                                fitParent={true}
                                axis={false}
                                items={[
                                    <>
                                        <Container
                                            customClass='bg-secondary-500 br p-4 gap-4 box-shadow'
                                            maxWidth='45vw'
                                            header={[
                                                <Container
                                                    customClass='bg-secondary-400 br-sm align-items-center'
                                                    fitParent={true}
                                                    content={[
                                                        <ItemGroup
                                                            axis={false}
                                                            stretch={true}
                                                            customClass='gap-3 bg-secondary-400 p-4'
                                                            items={[
                                                                <>
                                                                    <BaseIcon width={30} height={30} fillColor="none">
                                                                        <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#677382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#677382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(210, 20%, 45%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </BaseIcon>
                                                                    <h1 className="font-semibold text-primary-neutral-100">JACOB CLIFFORD</h1>
                                                                </>
                                                            ]}
                                                        />
                                                    ]}
                                                />
                                            ]}
                                            content={[
                                                <>
                                                    <ItemGroup
                                                        customClass='gap-2'
                                                        fitParent={true}
                                                        axis={true}
                                                        items={[
                                                            <>
                                                                <ItemGroup
                                                                    customClass='justify-self-start'
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    maxWidth='50%'
                                                                    items={[
                                                                        <div className='bg-secondary-400 br p-3 px-4'>
                                                                            <p className='text-primary-neutral-100 font-5'>Good morning Luke. I see you are in the waiting room so we will begin our consultation shortly.</p>
                                                                        </div>
                                                                    ]}
                                                                />
                                                                <ItemGroup
                                                                    customClass='justify-self-end'
                                                                    fitParent={true}
                                                                    stretch={true}
                                                                    maxWidth='50%'
                                                                    items={[
                                                                        <div className='bg-primary-600 br p-3 px-4'>
                                                                            <p className='text-neutral-1100 font-5'>Good morning Dr. Clifford. I am ready when you are.</p>
                                                                        </div>
                                                                    ]}
                                                                />
                                                            </>
                                                        ]}
                                                    />
                                                </>
                                            ]}
                                            footer={[
                                                <InputBar
                                                    customClass="px-3 py-2"
                                                    placeholder="Type a message"
                                                    readonly={true}
                                                    sendIcon={
                                                        <BaseIcon width={30} height={30} fillColor="none">
                                                            <path d="M18.8951 3.61502C19.7248 3.37794 20.492 4.1451 20.2549 4.97489L16.2553 18.9736C15.8267 20.4736 13.823 20.7554 12.9973 19.4317L10.1999 14.947C9.87715 14.4296 9.44039 13.9928 8.92298 13.6701L4.43823 10.8726C3.11455 10.047 3.39632 8.04323 4.89636 7.61465L18.8951 3.61502Z" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M10.1924 13.6777L13.7279 10.1422" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                        </BaseIcon>
                                                    }
                                                />
                                            ]}
                                        />
                                        <ItemGroup
                                            customClass='gap-3 px-4'
                                            maxWidth='30vw'
                                            axis={true}
                                            items={[
                                                <>
                                                    <h2 className="text-primary-500 font-bold font-6">PATIENT RESOURCES</h2>
                                                    <h1 className="font-10">Instant Consultation</h1>
                                                    <p className="font-6 mb-2 text-justify">Tired of sitting in the clinic, waiting for your check-up? With our online exam rooms, you won't have to. Connect with your care team on the go.</p>
                                                    <Link
                                                        to="/findADoctor"
                                                        className="button bg-primary-500 text-decoration-none hover-box-shadow-xs shadow-primary-400">
                                                        <p className='text-neutral-1100'>FIND A DOCTOR</p>
                                                    </Link>
                                                </>
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                        </>
                    ]}
                />
            </section>
            <Container
                customClass='align-items-center justify-items-center'
                fitScreen={true}
                content={[
                    <>
                        <ItemGroup
                            customClass='align-items-center justify-items-center gap-20'
                            axis={true}
                            items={[
                                <>
                                    <ItemGroup
                                        customClass='text-center gap-2'
                                        axis={true}
                                        items={[
                                            <>
                                                <h1 className='font-8'>Get Your Doctor Instantly</h1>
                                                <p className='font-7'>Find the care you need whenever you need it</p>
                                            </>
                                        ]}
                                    />
                                    <ItemGroup
                                        customClass='gap-30'
                                        axis={false}
                                        items={[
                                            <>
                                                <ItemGroup
                                                    customClass='gap-8'
                                                    axis={true}
                                                    items={[
                                                        <>
                                                            <Image
                                                                src={'/img/LandingPage2.jpg'}
                                                                alt='Service Section Image 1'
                                                                height="375px"
                                                                width="490px"
                                                            />
                                                            <ItemGroup
                                                                customClass='gap-3 text-center px-5'
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <h1 className='font-semibold'>Find the Problem</h1>
                                                                        <p className='text-neutral-700 font-5'>Work with your doctor to find out how you can start living to your fullest</p>
                                                                    </>
                                                                ]}
                                                            />
                                                        </>
                                                    ]}
                                                />
                                                <ItemGroup
                                                    customClass='gap-8'
                                                    axis={true}
                                                    items={[
                                                        <>
                                                            <Image
                                                                src={'/img/LandingPage3.jpg'}
                                                                alt='Service Section Image 2'
                                                                height="375px"
                                                                width="490px"
                                                            />
                                                            <ItemGroup
                                                                customClass='gap-3 text-center px-5'
                                                                axis={true}
                                                                items={[
                                                                    <>
                                                                        <h1 className='font-semibold'>Get the Best Results</h1>
                                                                        <p className='text-neutral-700 font-5'>Together with your care team, tackle your goals and get the best results</p>
                                                                    </>
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
                    </>
                ]}
            />
        </>
    );
}
