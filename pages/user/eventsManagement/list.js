import HeaderComponent from "../../pageHeader";
import UserEventList from '../../../components/userDashboard/EventManagement/eventList'
import ThirdLayout from "../../../components/userDashboard/proSidebar/layout";


const UserEventDetails = ()=>{
    return(
        <>
            <HeaderComponent/>
            <ThirdLayout>
            <UserEventList />
            </ThirdLayout>
        </>
    )
}

export default UserEventDetails;
