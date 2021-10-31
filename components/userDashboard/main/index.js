import React, { useState, useEffect } from "react";
import Link from 'next/link'
import axios from "axios";
import { connect } from "react-redux";
import {EventCards} from '../components/cards'

import {host} from '../../utils/constants'
 
const UserDashboardComponent = ()=>{

    const [isLoaded,setIsLoaded] = useState(false)
    const [vendorEvents , setVendorEvents] = useState([])

    const getUserWallet =()=>{
      const endpoint = host + "/bills/"
    }

    const getVendorEvents = async ()=>{
      const endpoint = host + "/bills/"
     await axios.get(endpoint).then((res) => {
        if (res.status == 200) {
          setVendorEvents(res.data['data']);
        }
      });

    }

    useEffect(async()=>{
        await getVendorEvents()
    },[])

    return(
      <>

      </>
    )

} 


const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
  };
};

export default connect(mapStateToProps, null)(UserDashboardComponent);
