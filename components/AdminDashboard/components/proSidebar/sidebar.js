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
import { connect } from "react-redux";
import { logout } from "../../../../redux/actions/AdminAction/adminReduxAuth"
import { useRouter } from "next/router";

import { useToasts } from "react-toast-notifications";

const SidebarComponent = (props) => {
  const router = useRouter()
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
    props.logout()
    notifyEvent("Success", "Logout Successful")
    router.push("/")
  }

  return (
    <>
      <ProSidebar collapsed={false}>
        <SidebarHeader>
          <Link href="/">
            <img
              src="https://res.cloudinary.com/djhjipy7n/image/upload/v1629301901/logo_text_tkvppx.png"
              style={{ width: "150px", height: 200, objectFit: "contain" , alignItems:"center"}}
            />
          </Link>
        </SidebarHeader>
       
        <SidebarContent>
          <Menu iconShape="square" key="2">
          <MenuItem
            icon={<i class="fa fa-clone" aria-hidden="true"></i>}>
             <Link href={'/admin'}>
                  Home
                  </Link>
            </MenuItem>

          <SubMenu
              title={'Reports'}
              icon={<i className={'fa fa-clone'}></i>}
              key={22}
            >
               <MenuItem key={0}>
                 
                  <Link href={"/admin/reports/bills"}>
                  Bills Payment Reports
                    </Link>
                </MenuItem> 
                <MenuItem key={2}>
                  <Link href={'/admin'}>
                    Users Report
                  </Link>
                </MenuItem> 
            </SubMenu>
 
            <SubMenu
              title={'Access Control'}
              icon={<i className={'fa fa-clone'}></i>}
              key={22}
            >
               <MenuItem key={0}>
                  <Link href={'/admin/actions/rates'}>
                    Comission Adjust
                  </Link>
                </MenuItem> 
               
            </SubMenu>

            <MenuItem
            onClick={initLogout}
            icon={<i class="fa fa-sign-out" aria-hidden="true"></i>}>
            Logout
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
