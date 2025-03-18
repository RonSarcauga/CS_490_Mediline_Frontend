import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import '../../assets/css/Home.css';

export default function Home() {
    return (
        <div>
            <div className="pageHeader">
                <Topbar text="MEDILINE"
                    height={45}
                    width={45}
                    fillColor="#3F6BB3">
                    <TopbarItem text={"Services"}>
                    </TopbarItem>
                    <TopbarItem text={"Doctors"}>
                    </TopbarItem>
                    <TopbarItem text={"Discussion"}>
                    </TopbarItem>
                    <TopbarItem text={"SIGN IN"}>
                    </TopbarItem>
                </Topbar>
            </div>
            <section>
                <div className="sectionHeader"></div>
                <div className="sectionContent">
                </div>
            </section>
        </div>
    );
}