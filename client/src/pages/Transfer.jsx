// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import PaymentComponent from "../components/PaymentComponent";

// const Deposit = () =>{
//     return ( 
//     <>
//       <PaymentComponent />
//     </>
//     );
//   }
  
//   export default Deposit;
import React, { useState } from 'react';
import styles from '../styles/Deposit.module.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Transfer = () => {
    const { user } = useContext(AuthContext);
    const { transferInfo, updateTransferInfo, transferUser, transferError, isTransferLoading } = useContext(AuthContext);
    return (
      <div>
        <div className="container mx-auto">
          <div className="flex justify-center items-center my-4">
            <form onSubmit={transferUser}>
              <div className={styles.glass} >
                <div className="title flex flex-col items-center">
                <h4 className='text-4xl font-bold'>PROCEED TO TRANSFER</h4>
                </div>
                <div className="textbox flex flex-col items-center gap-6">
                  <input className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                      type="text" required
                      placeholder='Input Correct Destination Account'
                      onChange={(e) => 
                        updateTransferInfo({...transferInfo, userAcctNumber: e.target.value})
                      } 
                  />
                  <input
                    className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                    type="number" required
                    placeholder='Input Transfer amount'
                    onChange={(e) => 
                      updateTransferInfo({...transferInfo, amount: e.target.value})
                    } 
                  />
                  <input
                    className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                    type="text" required
                    placeholder='Narration'
                    onChange={(e) => 
                      updateTransferInfo({...transferInfo, narration: e.target.value})
                    } 
                  />
                  <input
                    className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                    type="number" required
                    placeholder='Input Pay Pin'
                    onChange={(e) => 
                      updateTransferInfo({...transferInfo, transactionPin: e.target.value})
                    } 
                  />
                    {transferError && (
                      <p style={{ color: 'red' }}>
                        {/* {transferError.error && <span>Error: {transferError.error}</span>} */}
                        {transferError.message && <span> Message: {transferError.message}</span>}
                      </p>
                    )}
                  <button className="paystack-button border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-ce{styles.btn}">    
                    {isTransferLoading ? "Processing your transfer" : "TRANSFER"}
                  </button>
                    {/* {transferError?.error && (
                    <div className="bg-red-500 text-white p-2">
                        <p>{transferError?.message}</p>
                    </div>
                    )} */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Transfer;