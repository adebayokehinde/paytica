import React, { Component } from "react";

import Toolbar from "./toolbar/toolbar";
import SideDrawer from "./sidedrawer/sidedrawer";
import { connect } from "react-redux";

import Backdrop from "./backdrop/backdrop";


class NavbarComponent extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };


  
  render() {
    let backdrop; 


    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar 
        isAuth={this.props.isAuth}
        drawerClickHandler={this.drawerToggleClickHandler}></Toolbar>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}

 
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
    isAuth: state.auth.token !== null,
    // isConsumer : sat
  };
}; 

export default connect(mapStateToProps, null)(NavbarComponent);
