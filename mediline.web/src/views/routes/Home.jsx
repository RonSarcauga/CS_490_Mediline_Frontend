import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import InputBar from '../../components/General/InputBar';
import TextBlock from '../../components/General/TextBlock';
import Image from '../../components/General/Image'
import '../../assets/css/Home.css';

export default function Home() {

    return (
        <div className="page">
            <div className="pageHeader">
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
                    <TopbarItem text={"SIGN IN"} customClass={"customBtn"}>
                    </TopbarItem>
                </Topbar>
            </div>
            <section id="findDoctorSection" className="sectionContainer">
                <div className="sectionHeader"></div>
                <div className="sectionContent">
                    <TextBlock header="Find a Doctor" description="Search through hundreds of qualified doctors" customClass="findDoctor">
                        <InputBar placeholder="Specialty"></InputBar>
                    </TextBlock>
                    <Image src={'/public/img/Services_1.jpg'} height="540px" width="630px"></Image>
                </div>
            </section>
        </div>
    );
}