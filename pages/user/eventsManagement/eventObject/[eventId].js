import HeaderComponent from "../../../pageHeader";
import UserEventDetailsComponent from '../../../../components/userDashboard/EventManagement/eventDetails'
import ThirdLayout from "../../../../components/userDashboard/proSidebar/layout";


const UserEventDetails = (props)=>{
    return(
        <>
            <HeaderComponent/>
            <ThirdLayout>
            <UserEventDetailsComponent eventId={props.eventId}/>
            </ThirdLayout>
        </>
    )
}

export default UserEventDetails;

export const getServerSideProps = async (context) => {
  const eventId = context.params.eventId;

  return {
    props: { evemtId: eventId },
  };
};
