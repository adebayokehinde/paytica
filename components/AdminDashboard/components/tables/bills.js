import React ,{useState ,useEffect} from "react";
import MaterialTable from 'material-table'
import { connect } from "react-redux";
import axios from 'axios'
import {host} from '../../../utils/constants'

const BillsTable =(props)=>{

  const [recordsData , setRecordsData] = useState([])

  const getAnonymousPaymentDataRecords  = async()=>{
    const endpoint = host + "/paytica-reports/income-statement";  
    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
      Authorization: `Token ${props.token}`
    }
    await axios.get(endpoint)
    .then(res=>{
      if (res.status == 200){
        setRecordsData(res.data['data'])
        console.log(res.data['data'])
      }
    })
  }


  useEffect(()=>{
    if (props.token !== null){
      getAnonymousPaymentDataRecords()
    }
  },[props.token])

  return (
    <MaterialTable
          columns={[
            { title: "TransactionID", field: "TransactionID" },
            { title: "CoinType", field: "CoinType" },
            { title: "ProviderName", field: "ProviderName" },
            {title:"Address" , field :"PublicKey"},
            {title: "Amount",field: "Amount"},
          ]}

          data = {recordsData}
        
          title="Bills Payment Reports "
        />
  );
}


const mapStateToProps = (state) => {
  return {
    userID: state.adminAuth.userID,
    token: state.adminAuth.token,
    isAdmin: state.adminAuth.isAdmin,
    adminUsername: state.adminAuth.username,
  };
};

export default connect(mapStateToProps)(BillsTable);
