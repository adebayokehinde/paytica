import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SemipolarLoading } from "react-loadingg";
import router, { useRouter } from "next/router";
import { host } from "../utils/constants";

const coinList = [
  { CoinName: "Select Asset" },
  { CoinName: "Bitcoin" },
  { CoinName: "Lumen" },
  { CoinName: "BinanceCoin" },
  { CoinName: "Ethereum" },
];

function AirtimePaymentForm(props) {
  const history = useRouter();

  const [Providers, setProviders] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const [coinToken, setCoinToken] = useState("");

  const [theTransactionID, setTransactionID] = useState("");
  const [paymentinitState, setPaymentInitState] = useState(false);

  const [formInputs, setFormInputs] = useState({
    Amount: "",
    Service: "",
    thePhoneNumber: "",
    CoinType: "",
  });

  const handleFormChange = (e, field) => {
    switch (field) {
      case "Amount":
        // This function processes and Validates the cost
        setFormInputs({ ...formInputs, Amount: e.target.value });
        break;
      case "thePhoneNumber":
        console.log("I am the REICOCO");
        setFormInputs({ ...formInputs, thePhoneNumber: e.target.value });
        break;
      case "CoinType":
        console.log(e.target.value);
        setFormInputs({ ...formInputs, CoinType: e.target.value });
        break;
      case "Service":
        console.log(e.target.value);
        setFormInputs({ ...formInputs, Service: e.target.value });

    }
    console.log("Final Form", formInputs);
  };

  const StartPayment = async (e) => {
    e.preventDefault();
    const payDetails = {
      Service: formInputs.Service,
      Amount: formInputs.Amount,
      thePhoneNumber: formInputs.thePhoneNumber,
      CoinType: formInputs.CoinType,
    };

    setIsLoading(true);
    const endpoint = host + "/AnonymousPayRoute/initialize-newPayment";
    axios
      .post(endpoint, {
        Service: formInputs.Service,
        Amount: formInputs.Amount,
        PhoneNumber: formInputs.thePhoneNumber,
        CoinType: formInputs.CoinType,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setIsLoading(false);
          setTransactionID(res.data.thePaymentDetails["theOrderID"]);

          setPaymentInitState(true);
          localStorage.setItem("airtimeDetails", JSON.stringify(payDetails));
          console.log("This is the is transaction ID", theTransactionID);

          if (typeof window !== "undefined") {
            localStorage.setItem("transactionData", payDetails["orderID"]);
          }

          //   history.push(
          //     `/payment-channel/${payDetails['Amount']}/${payDetails['thePhoneNumber']}/${payDetails['Service']}/${res.data.thePaymentDetails["orderID"]}/${res.data.thePaymentDetails["PublicKey"]}/${payDetails['CoinType']}`
          //   );
          router.push("/paymentSection/paymentDetails");
        }
      });
    //   if (paymentinitState === true){

    //   }
  };

  //   const initPaymentSocket = async () => {
  //     console.log("...init socket");

  //     socket.emit("newCon", { name: "nene" });

  //     socket.on("sendee", (data) => {
  //       console.log(data);
  //     });
  //   };

  const getAirtimeProvider = async () => {
    const endpoint = host + "/baxiRoutes/fetch-aritime-providers/";

    axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        setProviders(res.data.providers);
        console.log(res.data.provider);
      }
    });
  };

  const coinTypeHandler = (type) => {
    switch (type) {
      case "Etheruem":
        setCoinToken("Etheruem");
        break;
      case "Bitcoin":
        setCoinToken("Bitcoinn");
        break;
      case "Lumen":
        setCoinToken("Lumen");
        break;
      case "Ripple":
        setCoinToken("Ripple");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getAirtimeProvider();
  }, [props.userID]);

  return (
    <>
      <div>
        {isLoading ? (
          <>
            <SemipolarLoading color={"#5a1d65"} />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="paymentForm-content mtop">
        <p
          style={{ color: "#F5A623", fontWeight: "600" }}
          className="centerHeading"
        >
          Buy Airtime Now
        </p>

        <p style={{ color: "#5a1d65", fontSize: 16 }} className="centerHeading">
          Just <b>select</b> and <b>scan!</b>
        </p>
        <div style={{ marginTop: 5 }} className="">
          <form>
            <div className="form-input-box">
              <select
                onChange={(e) => {
                  handleFormChange(e, "Service");
                }}
                value={formInputs.Service}
                className="authForm"
              >
                <option name="Select Default" value="">
                  Select Network
                </option>
                {Providers.map((i) => (
                  <option name="Service" value={i.service_type}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-input-box">
              <select
                onChange={(e) => {
                  handleFormChange(e, "CoinType");
                }}
                value={formInputs.CoinType}
                className="authForm"
              >
                {coinList.map((i) => (
                  <option name="NetworkCarriers" value={i.CoinName}>
                    {i.CoinName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-input-box">
              {/* <p className="form-input-text">Username</p> */}
              <input
                onChange={(e) => {
                  handleFormChange(e, "Amount");
                }}
                className="authForm"
                type="text"
                name="Amount"
                value={formInputs.Amount}
                placeholder="Airtime Amount"
              />
            </div>

            <div className="form-input-box">
              {/* <p className="form-input-text">Username</p> */}
              <input
                onChange={(e) => {
                  handleFormChange(e, "thePhoneNumber");
                }}
                className="authForm"
                type="text"
                name="thePhoneNumber"
                value={formInputs.thePhoneNumber}
                placeholder="Recipient Phone"
              />
            </div>

            <div>
              <button
                onClick={(e) => {
                  StartPayment(e);
                }}
                className="form-button2"
                htmlType="submit"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    // userID: state.auth.userID,
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(AirtimePaymentForm);
