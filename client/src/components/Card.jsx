import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Card = ({ logoSrc, accountNumber, accountName }) => {
    const { user } = useContext(AuthContext);
    const newBal = user.balance;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img src={logoSrc} alt="Logo" className="mx-auto mb-2" />
      <div className="text-center">
        <div className="text-xl font-semibold mb-2">ACCT NAME: {user.name}</div>
        <div className="text-md font-semibold">PAY ID: {user.email}</div>
        <p className="text-md font-semibold">Balance: {newBal}</p>
      </div>
    </div>
  );
};

export default Card;
