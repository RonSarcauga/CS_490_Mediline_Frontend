import Logo from '../../components/General/Logo';
import BaseIcon from '../../components/General/BaseIcon';
import Card from '../../components/General/Card';

export default function LoginPage() {
    return (
        <div id="loginPage" className="background">
            <Card
                content={
                    <>
                        <Logo 
                            height={40}
                            width={40}
                            fillColor="#8CBED2"
                            text="MEDILINE"
                        >
                            <span>
                                MEDILINE
                            </span>
                        </Logo>
                    </>
                }
            >
            </Card>
        </div>
    );
}
