import HeaderComponent from "../../pageHeader";
import CreateEventComponent from '../../../components/userDashboard/EventManagement/createEvent'
import ThirdLayout from "../../../components/userDashboard/proSidebar/layout";


const EventCreationPage= (props)=>{
    return(
        <>
        <HeaderComponent/>
        <ThirdLayout>
        <CreateEventComponent/>
        </ThirdLayout>
        </>
    )
}
 
export default EventCreationPage

