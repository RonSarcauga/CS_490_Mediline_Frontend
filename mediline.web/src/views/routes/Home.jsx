import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import BaseIcon from '../../components/General/BaseIcon';
import InputBar from '../../components/General/InputBar';
import TextBlock from '../../components/General/TextBlock';
import Card from '../../components/General/Card';
import Image from '../../components/General/Image'
import Section from '../../components/LandingPage/Section';

export default function HomePage() {
    return (
        <div className="home-page">
            <Section
                id="findDoctorSection"
                header={
                    <Topbar text="MEDILINE"
                        height={50}
                        width={50}
                        fillColor="#3F6BB3">
                        <TopbarItem text={"Services"}>
                        </TopbarItem>
                        <TopbarItem text={"Doctors"}>
                        </TopbarItem>
                        <TopbarItem text={"Discussion"}>
                        </TopbarItem>
                        <TopbarItem to={"/login"} text={"SIGN IN"} customClass={"customBtn"}>
                        </TopbarItem>
                    </Topbar>
                }
                content={
                    <>
                        <TextBlock
                            headers={[
                                { text: "Find a Doctor", size: 'h1' },
                            ]}
                            description="Search through hundreds of qualified doctors"
                            customClass="findDoctorContainer">
                            <InputBar
                                searchIcon={
                                    <BaseIcon height={24} width={24} viewBox="0 -960 960 960" fillColor="#E3E3E3">
                                        <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                                    </BaseIcon>
                                }
                                placeholder="Specialty"></InputBar>
                        </TextBlock>
                        <Image src={'/img/LandingPage1.JPG'} height="500px" width="630px"></Image>
                    </>
                }
            >
            </Section>
            <Section
                id="resourcesSection"
                content={
                    <div className="item-group">
                        <Card
                            header={
                                <div className="customHeader">
                                    <BaseIcon width={30} height={30} fillColor="none">
                                        <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#677382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#677382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#677382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </BaseIcon>
                                    <h3>JACOB CLIFFORD</h3>
                                </div>
                            }
                            content={
                                <>
                                    <div className="message system-message">
                                        <p>Good morning Luke. I see you are in the waiting room so we will begin our consultation shortly.</p>
                                    </div>
                                    <div className="message user-message">
                                        <p>Good morning Dr. Clifford. I am ready when you are.</p>
                                    </div>
                                </>
                            }
                            footer={
                                <InputBar
                                    placeholder="Type a message"
                                    readonly={true}
                                    sendIcon={
                                        <BaseIcon width={30} height={30} fillColor="none">
                                            <path d="M18.8951 3.61502C19.7248 3.37794 20.492 4.1451 20.2549 4.97489L16.2553 18.9736C15.8267 20.4736 13.823 20.7554 12.9973 19.4317L10.1999 14.947C9.87715 14.4296 9.44039 13.9928 8.92298 13.6701L4.43823 10.8726C3.11455 10.047 3.39632 8.04323 4.89636 7.61465L18.8951 3.61502Z" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.1924 13.6777L13.7279 10.1422" stroke="#5E78A9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                        </BaseIcon>
                                    }
                                />
                            }
                        />
                        <TextBlock
                            headers={[
                                { text: 'PATIENT RESOURCES', size: 'h2' },
                                { text: 'Instant Consultation', size: 'h1' },
                            ]}
                            description="Tired of sitting in the clinic, waiting for your check-up? With our virtual exam rooms, you won't have to. Connect with your care team on the go."
                            customClass="resourceContent"
                        />
                    </div>
                }
            >
            </Section>
            <Section
                id="servicesSection"
                header={
                    <TextBlock
                        headers={[{ text: 'Get Your Doctor Instantly', size: 'h1' }]}
                        description="Find the care you need whenever you need it."
                        customClass="serviceHeader"
                    />
                }
                content={
                    <div className="item-group">
                        <TextBlock
                            icon={
                                <Image src={'/img/LandingPage2.JPG'} height="375px" width="490px"></Image>
                            }
                            headers={[{ text: 'Find the Problem', size: 'h3' }]}
                            description="Work with your doctor to find out how you can start living to your fullest"
                        />
                        <TextBlock
                            icon={
                                <Image src={'/img/LandingPage3.jpg'} height="375px" width="490px"></Image>
                            }
                            headers={[{ text: 'Get the Best Results', size: 'h3' }]}
                            description="Together with your care team, tackle your goals and get the best results"
                        />
                    </div>
                }
            />
        </div>
    );
}
