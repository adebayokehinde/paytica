import React from "react";

export default function FooterC() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>Paytica.</h6>
              <p className="text-justify">Bills & P2C </p>
            </div>
            
            <div className="col-xs-6 col-md-3 ml-auto">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Contribute</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright © 2021
                <a href="#"></a>.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="#">
                    <i className="fa fa-instagram" />
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
