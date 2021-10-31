import React from "react";

export default function DetailPage() {
  return (
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
              <p>TradelandMark invites you to a value packed Mega Conference</p>
            </div>
          </div>

          <div className="event-details mt-2">
            <button className="ticket-button">Pay Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
