import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../utils/constants";
import FooterC from "../uiComponent/footerSection/footerc";
import Link from 'next/link'
import NavbarTwo from "../uiComponent/navbar/navbar";


export default function PayticaEventListings() {
  const [eventsItem, setEventItem] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchItem, setSearchedEventItem] = useState([]);

  const item = [2,3,5,6,6,6,6]

  const getEvents = async () => {
    const endpoint = host + `/bill/get-products-and-events/`;
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setEventItem(res.data["Products"]);
        console.log("this is", res.data);
      } else {
      }
    });
  }; 
  
 async function  getSearchData(e) {
    const endpoint = host + "/bill/search-event/";
    e.preventDefault();
    const name = e.target.elements.eventName.value;
    const location = e.target.elements.eventLocation.value;

    axios
      .get(endpoint, {
        params: {
          name,
          location,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.table(res.data);
          setSearchedEventItem(res.data['events']);
          setIsSearched(true)
          console.log('This is the EVent Item' ,searchItem)
          
        } else {
        }
      });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
    <NavbarTwo/>
      <section className="container mt-5">
        <div className="grid">
        {
          item.map(i=>(
            <>
  <div className="event-card ">
            <span className="event-card-img">
            <Link href={`/events/item/${i}`}>
                      <img
                        src="https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xf6793da657495ffeff9ee6350824910abc21356c:79620866622375052805449593826879326143915809581831826021747550262892660011158/62a1e1da"
                        alt
                      />
                      </Link>
            </span>
            <div className="event-card-body">
              <span>
                <h4 className="text-left">
                  The Global Financial Markets: “The 21st Century Money”.
                </h4>
                <p className="text-danger">Tue, Nov 2, 7:00 PM</p>
                <p>1 Alfred Rewane Rd • Lagos, LA Free</p>
              </span>
            </div>
          </div>
            </>
          ))
        }
        </div>
      </section>
      <FooterC/>
    </>
  );
}
