import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { host } from "../../utils/constants";

const NigeriaStates = [
  "Abuja",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const CreateEventComponent = (props) => {
  const [formInputs, setFormInputs] = useState({
    Title: "",
    Description: "",
    TicketPrice: 1,
  });

  const [isLoaded, setIsLoaded] = useState("");

  const handleFormChange = (e, field) => {
    switch (e) {
      case "Title":
        setFormInputs({
          ...formInputs,
          Title: e.target.value,
        });
        break;
      case "Description":
        setFormInputs({
          ...formInputs,
          Description: e.target.value,
        });
        break;
      case "TicketPrice":
        setFormInputs({
          ...formInputs,
          TicketPrice: e.target.value,
        });
      default:
        break;
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const endpoint = host + "/bill/create-bill/";

    axios
      .post(endpoint, {
        Service: formInputs.Service,
      })
      .then((res) => {
        if (res.status == 200) {
          const theData = res.data["data"];
          setIsLoaded(false);
          // router.push("/paymentSection/paymentDetails");
        } else {
        }
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div style={{ marginTop: 150, marginBottom: 150 }} className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="form-fitter">
              <form className="">
                <div>
                  
                  <p 
                  style={{fontSize:24}}
                  className="heading-text-2">
                    Add A New Event
                  </p>
                </div>
                <div className="form-input-flex">
                  <div className="form-input-box">
                    <p className="form-input-text">Event Title</p>
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "");
                      }}
                      className="authForm"
                      type="text"
                      name="Title"
                      required={true}
                      value={formInputs.Title}
                    />
                  </div>
                  <div className="form-input-box">
                    <p className="form-input-text">Ticket Price</p>
                    <input
                      onChange={(e) => {
                        handleFormChange(e, "TicketPrice");
                      }}
                      className="authForm"
                      type="text"
                      name=""
                      required={true}
                      value={formInputs.TicketPrice}
                    />
                  </div>

                  <div>

                    <div className="form-input-flex">
                    <p className="form-input-text">Description</p>
                        <textarea 
                           onChange={(e) => {
                            handleFormChange(e, "Description");
                          }}
                          className="authForm"
                          name=""
                          required={true}
                          placeholder="A Breif Description of the event"
                          value={formInputs.Description}/>
                      </div>
                      
                    <button
                      onClick={(e) => {
                        submitData(e);
                      }}
                      type="submit"
                      className="form-button"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
  };
};

export default connect(mapStateToProps, null)(CreateEventComponent);
