import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarTwo from "../uiComponent/navbar/navbar";
import FooterC from "../uiComponent/footerSection/footerc";

import { host } from "../utils/constants";

export default function PayticaEventDetailsComponent(props) {
  const [eventsItem, setEventItem] = useState([]);
  const [eventItemDetail, setEventItemDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const eventId =  props.eventId

  const getEventDetail = async () => {
    const productID = props.match.params.productID;
    console.log("this is the ID for getting event Details", productID);

    const endpoint = host + `/bill/get-products-and-events/details`;
    await axios
      .get(endpoint, {
        params: {
          productID,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setEventItemDetail(res.data["EventData"]);
          setIsLoaded(true);
          console.log("this is the bill detail", res.data["EventData"]);
        } else {
        }
      });
  };

  const getEvents = async () => {
    //   const productID = props.match.params.
    const endpoint = host + `/bill/get-products-and-events/`;
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setEventItem(res.data["Products"]);
        console.log("this is bill list", res.data);
      } else {
      }
    });
  };

  const theEvents = eventsItem.slice(0, 4);

  useEffect(() => {
    getEvents();
    getEventDetail();
  }, []);

  return (
    <>
    <NavbarTwo/>
      <section className="container m-5">
        <div className="row">
          <div className="col-lg-6 col-sm-12 flex-c">
            <span className="event-img-detail">
              <img src="https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xf6793da657495ffeff9ee6350824910abc21356c:79620866622375052805449593826879326143915809581831826021747550262892660011158/62a1e1da" />
            </span>
          </div>
          <div className="col-lg-6 col-sm-12 grid-c">
            <div className="event-details">
              <h3>The Global Financial Markets: “The 21st Century Money”.</h3>
              <p>by TradelandMark</p>
              <p>Date and time</p>
              <p className="text-danger">Sat, 6 Nov 2021, 09:30 WAT</p>
              <div className="pt-3">
                <h6>About</h6>
                <p>
                  Unveiling the opportunities available in trading the global
                  financial markets
                </p>
                <p>
                  TradelandMark invites you to a value packed Mega Conference
                </p>
              </div>
            </div>

            <div className="event-details mt-2">
              <button className="ticket-button">Purchase Ticket</button>
            </div>
          </div>
        </div>
      </section>

      <FooterC />
    

    </>
  );
}
