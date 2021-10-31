import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { host } from "../../utils/constants";
import { EventCards } from "../components/cards";

const UserEventList = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userEvents, setUserEvents] = useState([]);

  const getEventList = async () => {
    const eventId = props.eventId;
    const endpoint = host + "/bills";
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setUserEvents(res.data);
        setisLoaded(true);
      }
    });
  };

  useEffect(() => {
    if (props.token !== null || props.token !== undefined) {
      getEventList();
    }
  }, []);

  return (
    <>
      <div className="mt-4"></div>
      <EventCards eventList={[1, 2, 4, 5]} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(UserEventList);
