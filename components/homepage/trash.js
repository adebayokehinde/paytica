const DumpComponent = ()=>{
    return(
        <>

<Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Send Money To Nigeria Via Cryptocurrency")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Withdraw Crypto Assets Into Fiat Naira Instantly")
                    .pause(1000)
                    .deleteAll()
                    .typeString("Sell Crypto Assets For Fiat Naira Instantly")
                    .start();
                }}
              />
           <section className="row" style={{ marginLeft: "0", marginRight: "0" }}>
          <div className="col-lg-6 col-sm-12 mid-box ">
            <div className="custom-container-b">
              <div className>
                <h1 className="home-heading">
                  Buy and Sell Gift Cards from anywhere in the world.
                </h1>
                <p className="home-heading-text-c">
                  Get your sweet cash within 5mins <br />
                  Coming soon
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mid-box-b remove-content">
            <div className="gift-card">
              <img src={giftCards2} alt="" srcSet />
            </div>
          </div>
        </section> 

        </>
    )
}