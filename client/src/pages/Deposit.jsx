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

const Deposit = () => {
    const { user } = useContext(AuthContext);
    const { depositInfo, updateDepositInfo, depositUser, depositError, isDepositLoading } = useContext(AuthContext);

    return (
      <div>
        <div className="container mx-auto">
          <div className="flex justify-center items-center my-4">
            <form onSubmit={depositUser}>
              <div className={styles.glass} >
                <div className="title flex flex-col items-center">
                <h4 className='text-4xl font-bold'>PROCEED TO DEPOSIT</h4>
                </div>
                <div className="textbox flex flex-col items-center gap-6">
                  <input className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                      type="email"
                      defaultValue={user.email}
                      // onChange={(e) => 
                      //   updateDepositInfo({...depositInfo, email: e.target.value})
                      // } 
                  />
                  <input
                    className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg"
                    type="number"
                    onChange={(e) => 
                      updateDepositInfo({...depositInfo, amount: e.target.value})
                    } 
                  />
                  <button className="paystack-button border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-ce{styles.btn}">    
                    {isDepositLoading ? "Processing your deposit" : "DEPOSIT"}
                  </button>
                    {depositError?.error && (
                    <div className="bg-red-500 text-white p-2">
                        <p>{depositError?.message}</p>
                    </div>
                    )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Deposit;