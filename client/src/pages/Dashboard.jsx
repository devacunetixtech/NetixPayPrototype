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

  