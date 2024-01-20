import React, { useState } from 'react';  
import acunetix from '../assets/logo2.png';
import styles from '../styles/Dashboard.module.css'
import Card from "../components/Card";

const Dashboard = () =>{
  
    return (
      <>
      <div className="flex items-center justify-center">
      <Card
        logoSrc={acunetix}
      />
    </div>
      </>
    );
  }
  
  export default Dashboard;



  // const transferUser = useCallback(async (e) => {
//     e.preventDefault(); 
//     const debitUserID = user._id;
//     const debitUserName = user.name;

//     if (transferInfo.amount > 50) {
//         // if () {
//             // Payment is successful, now send the amount and email to the backend
//             sendTransferInfoToBackend(transferInfo.amount, transferInfo.email, transferInfo.narration, debitUserID, debitUserName);
//         // } else {
//             // alert('Transfer failed.');
//         // }
//     } else {
//         alert("Input amount more than 50");
//     }
// }, [transferInfo]);

// const sendTransferInfoToBackend = async (amount, email, narration, debitUserID, debitUserName) => {
//     try {
//         const response = await postRequest(
//             `${baseUrl}/users/transfer`, 
//             JSON.stringify({ amount, email, narration, debitUserID, debitUserName })
//         );
//         setIsTransferLoading(false)
//         if (response.error) {
//             return setTransferError(response);
//         }
//         // Handle the successful response from the backend
//         // You can redirect or perform any other necessary actions
//         navigateTo('/dashboard')
//     } catch (error) {
//         console.error(error);
//         setTransferError({ error: 'Failed to initiate transfer on the server' });
//     }
// };