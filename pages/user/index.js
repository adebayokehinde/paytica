import HeaderComponent from "../pageHeader";
import UserDashboardComponent from '../../components/userDashboard/main/index'
import ThirdLayout from '../../components/userDashboard/proSidebar/layout'


const UserDashboardIndex = ()=>{
    return(
        <>
        <HeaderComponent/>
        <ThirdLayout>
        <UserDashboardComponent/>
        </ThirdLayout>
        </>
    )
}

export default UserDashboardIndex;