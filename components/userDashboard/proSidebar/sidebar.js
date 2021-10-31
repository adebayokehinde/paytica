import React, { useRef } from "react";
import Link from "next/link";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { navItems } from "./menuConstant";
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { useRouter } from "next/router";

import { useToasts } from "react-toast-notifications";

const SidebarComponent = (props) => {
  const router = useRouter();
  const { addToast } = useToasts();
  const notifyEvent = (type, message) => {
    switch (type) {
      case "Success":
        addToast(message, { appearance: "success" });
        break;
      case "Error":
        addToast(message, { appearance: "error" });
        break;
      case "Info":
        addToast(message, { appearance: "info" });
        break;
      default:
        break;
    }

    return true;
  };

  const initLogout = () => {
    props.logout();
    notifyEvent("Success", "Logout Successful");
    router.push("/");
  };

  return (
    <>
      <ProSidebar collapsed={false}>
        <SidebarHeader>
          <Link href="/">
            <img
              src="https://www.logolynx.com/images/logolynx/90/90cdeb260df361a39d97540d9c75a814.png"
              style={{ width: "150px", height: 200, objectFit: "contain" }}
            />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square" key="2">
            <MenuItem icon={<i class="fa fa-clone" aria-hidden="true"></i>}>
              <Link href={"/user"}>
                Dashboard
              </Link>
            </MenuItem>

            <SubMenu
              title={"My Events"}
              icon={<i className={"fa fa-clone"}></i>}
              key={22}
            >
              <MenuItem key={0}>
                <Link href={"/user/eventsManagement/list"}>My Events</Link>
              </MenuItem>
              <MenuItem key={2}>
                <Link href={"/user/eventsManagement/createevent"}>Create Events</Link>
              </MenuItem>
            </SubMenu>
            {/* 
            <SubMenu
              title={'My Profile'}
              icon={<i className={'fa fa-clone'}></i>}
              key={22}
            >
               <MenuItem key={0}>
                  <Link href={'/userDashboard/userProfile/profilePage'}>
                    Profile Page
                  </Link>
                </MenuItem> 
                <MenuItem key={2}>
                  <Link href={'/userDashboard/userProfile/editProfilePage'}>
                    Edit Profile
                  </Link>
                </MenuItem> 
            </SubMenu> */}

            <MenuItem
              onClick={initLogout}
              icon={<i class="fa fa-sign-out" aria-hidden="true"></i>}
            >
              logout
            </MenuItem>

            <MenuItem
              icon={<i class="fa fa-sign-out" aria-hidden="true"></i>}
            >
              <Link href={'/'}>
                   Home
                  </Link>
            </MenuItem>

          </Menu>
        </SidebarContent>
        <SidebarFooter>&copy; 2021</SidebarFooter>
      </ProSidebar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    isConsumer: state.auth.isConsumer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
