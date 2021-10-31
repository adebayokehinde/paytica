import "../styles/globals.css";
import "../styles/PaymentDesigns.css";
import "../styles/homePage.css";
import "../styles/nav.css";
import "../styles/AuthLayout.css";
import "../styles/ui.css";
import "../styles/adminLayout.css";
import { wrapper } from "../redux/store";
import { ToastProvider } from "react-toast-notifications";

import "../styles/modDesgins/ReactToastify.css";
import "../styles/sidebar/layout.module.css";
import "../styles/sidebar/usersidebar.css";


import { useDispatch } from "react-redux";
import {adminAuthCheckLoginState} from '../redux/actions/AdminAction/adminReduxAuth'
import {GetCryptoPrices ,GetCryptoPricesInDollar} from '../redux/actions/cryptoPrices'
import {getAirtimeProviders ,getCableProviders , getElectricityProvider , getDataProviders} from '../redux/actions/supplierActions'

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  dispatch(adminAuthCheckLoginState());
  dispatch(GetCryptoPrices())
  dispatch(GetCryptoPricesInDollar())
  dispatch(getAirtimeProviders())
  dispatch(getCableProviders())
  dispatch(getElectricityProvider())
  dispatch(getDataProviders())

  return (
    <>
      <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
        <Component {...pageProps} />
      </ToastProvider>
    </> 
  );
}

export default wrapper.withRedux(MyApp);
