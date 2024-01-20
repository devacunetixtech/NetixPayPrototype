// import React from 'react';
// import { useContext, useState, useRef, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from 'react-router-dom'; 

// const Card = ({ logoSrc, accountNumber, accountName }) => {
//     const { user } = useContext(AuthContext);
//     const [isCopied, setIsCopied] = useState(false);
//     const textToCopy = user.userAcctNumber;
//     const textAreaRef = useRef(null);
  
//     const copyToClipboard = () => {
//       textAreaRef.current.select();
//       document.execCommand('copy');
//       setIsCopied(true);
  
//       // Reset the "Copied" status after a short delay
//       setTimeout(() => {
//         setIsCopied(false);
//       }, 2000);
//     };
//   return (
    // <div className="bg-white rounded-lg shadow-md p-4 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
    //   <img src={logoSrc} alt="Logo" className="mx-auto mb-2" />
    //   <div className="text-center">
    //     <div className="text-xl font-semibold mb-2">ACCT NAME: {user.name}</div>
    //     <div className="text-md font-semibold">PAY EMAIL: {user.email}</div>
    //     <div className="text-md font-semibold">PAY ID: {user.userAcctNumber}</div>
    //       {/* Copy-to-clipboard functionality */}
    //       <div className="flex items-center justify-center mt-2">
    //         <button
    //           onClick={copyToClipboard}
    //           className="cursor-pointer focus:outline-none"
    //           title="Copy PAY ID to Clipboard"
    //         >   COPY
    //         </button>
    //         {isCopied && <span className="ml-2 text-green-500">Copied!</span>}
    //       </div>
    //       <textarea
    //         ref={textAreaRef}
    //         readOnly
    //         value={textToCopy}
    //         className="absolute opacity-0"
    //       />
    //     <p className="text-md font-semibold">Balance: #{user.balance}</p>
    //     <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
    //       <Link to="/deposit" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-900 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">DEPOSIT
    //         <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0l4-4m-4 4l4 4"/>
    //         </svg>
    //       </Link>
    //       <Link to="/" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white bg-red-900 hover:bg-red-700 focus:ring-4 focus:ring-gray-400">WITHDRAW
    //         <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    //         </svg>
    //        </Link>
    //     </div>
    //     <div className="py-2 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
    //       <Link to="/transfer" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">TRANSFER
    //       <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    //       </svg>
    //       </Link>
    //       <Link to="/fetchHistory" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">HISTORY
    //       <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    //       </svg>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default Card;

import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';  

const Card = ({ logoSrc, accountNumber, accountName }) => {
  const { getUserDetails } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

    const [isCopied, setIsCopied] = useState(false);
    const textToCopy = userDetails.userAcctNumber;
    const textAreaRef = useRef(null);
  
    const copyToClipboard = () => {
      textAreaRef.current.select();
      document.execCommand('copy');
      setIsCopied(true);
  
      // Reset the "Copied" status after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

  const fetchUserDetails = async () => {
    try {
      const updatedUserDetails = await getUserDetails(); // Implement this function
      setUserDetails(updatedUserDetails);
      // Update local storage if needed
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    // Fetch user details on component mount
    fetchUserDetails();

    // Polling interval (e.g., every 5 minutes)
    const intervalId = setInterval(fetchUserDetails, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
      <div className="bg-white rounded-lg shadow-md p-4 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img src={logoSrc} alt="Logo" className="mx-auto mb-2" />
      <div className="text-center">
        <div className="text-xl font-semibold mb-2">ACCT NAME: {userDetails.name}</div>
        <div className="text-md font-semibold">PAY EMAIL: {userDetails.email}</div>
        <div className="text-md font-semibold">PAY ID: {userDetails.userAcctNumber}</div>
          {/* Copy-to-clipboard functionality */}
          <div className="flex items-center justify-center mt-2">
            <button
              onClick={copyToClipboard}
              className="cursor-pointer focus:outline-none"
              title="Copy PAY ID to Clipboard"
            >   COPY
            </button>
            {isCopied && <span className="ml-2 text-green-500">Copied!</span>}
          </div>
          <textarea
            ref={textAreaRef}
            readOnly
            value={textToCopy}
            className="absolute opacity-0"
          />
        <p className="text-md font-semibold">Balance: #{userDetails.balance}</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link to="/deposit" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-900 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">DEPOSIT
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0l4-4m-4 4l4 4"/>
            </svg>
          </Link>
          <Link to="/" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white bg-red-900 hover:bg-red-700 focus:ring-4 focus:ring-gray-400">WITHDRAW
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </div>
        <div className="py-2 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link to="/transfer" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">TRANSFER
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </Link>
          <Link to="/fetchHistory" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">HISTORY
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
