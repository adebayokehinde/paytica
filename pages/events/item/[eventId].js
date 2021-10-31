import PayticaEventDetailsComponent from '../../../components/homepage/eventDetails'
import HeaderComponent from "../../pageHeader";


const PayticaEventDetailsPage= (props)=>{
    return(
        <>
        <HeaderComponent/>
        <PayticaEventDetailsComponent eventId={props.eventId}/>
        </>
    )
}
 
export default PayticaEventDetailsPage


export const getServerSideProps = async (context) => {
    const eventId = context.params.eventId;
  
    return {
      props: { eventId: eventId },
    };
  };
  