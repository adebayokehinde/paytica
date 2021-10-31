import Link from 'next/link'
export const EventCards = (props) => {
  const item = props.eventList;
  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-12 col-md-12">
            <div className="grid">
              {item.map((i) => (
                <>
                  <div className="event-card ">
                    <span className="event-card-img">
                      <Link href={`/user/eventsManagement/eventObject/${i}`}>
                      <img
                        src="https://img.rarible.com/prod/image/upload/t_preview/prod-itemImages/0xf6793da657495ffeff9ee6350824910abc21356c:79620866622375052805449593826879326143915809581831826021747550262892660011158/62a1e1da"
                        alt
                      />
                      </Link>
                    </span>
                    <div className="event-card-body">
                      <span>
                        <h4 className="text-left">
                          The Global Financial Markets: “The 21st Century
                          Money”.
                        </h4>
                        <p className="text-danger">Tue, Nov 2, 7:00 PM</p>
                        <p>1 Alfred Rewane Rd • Lagos, LA Free</p>
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
