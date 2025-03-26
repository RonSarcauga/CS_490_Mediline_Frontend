import Topbar, { TopbarItem } from '../../components/Dashboard/Topbar';
import Sidebar, { SidebarItem } from '../../components/Dashboard/Sidebar';
import BaseIcon from '../../components/General/BaseIcon';
import '../../assets/scss/default-style.scss';

{/* This is the navigation bar for the dashboards specifically.
    A separate navigation bar will be used for the landing page */}
export default function Dashboard() {
    return (
        <div className="background">
            <div className="dashboardContainer">
                <Topbar text={"MEDILINE"}>
                </Topbar>
                <Sidebar>
                    <SidebarItem
                        icon={
                            <BaseIcon width={30} height={30} fillColor="#E3E3E3">
                                <rect x="2" y="2" width="9" height="11" rx="2">
                                </rect>
                                <rect x="13" y="2" width="9" height="7" rx="2">
                                </rect>
                                <rect x="2" y="15" width="9" height="7" rx="2">
                                </rect>
                                <rect x="13" y="11" width="9" height="11" rx="2">
                                </rect>
                            </BaseIcon>
                        }
                    />
                    <SidebarItem
                        icon={
                            <BaseIcon width={30} height={28} fillColor="#E3E3E3" viewBox="-32 0 512 512">
                                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                            </BaseIcon>
                        }
                    />
                    <SidebarItem
                        icon={
                            <BaseIcon width={30} height={25} fillColor="#E3E3E3" viewBox="-32 0 512 512">
                                <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z" />
                            </BaseIcon>
                        }
                    />
                    <SidebarItem
                        icon={
                            <BaseIcon width={28.5} height={22} fillColor="#E3E3E3" viewBox="0 0 512 512">
                                <path class="st0" d="M432.469,0.01H79.531C35.61,0.01,0,35.62,0,79.541v0.232l219.118,199.838
                                           c10.505,9.572,23.592,14.271,36.872,14.29c13.301-0.02,26.368-4.718,36.873-14.29L512,79.773v-0.232
                                           C512,35.62,476.389,0.01,432.469,0.01z"/>
                                <path class="st0" d="M255.99,353.55c-27.532,0.019-55.279-10-77.064-29.863L0,160.508v271.951c0,43.92,35.61,79.531,79.531,79.531
                                           h352.938c43.92,0,79.531-35.611,79.531-79.531V160.508L333.056,323.687C311.289,343.55,283.543,353.568,255.99,353.55z"/>
                            </BaseIcon>
                        }
                    />
                </Sidebar>
                <div className="mainContent"></div>
            </div>
        </div>
    );
}