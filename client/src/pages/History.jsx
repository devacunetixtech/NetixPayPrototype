// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import styles from '../styles/Profile.module.css';

// const History = () => {
//   const { userHistory, transactionHistory, isHistoryLoading, historyError } = useContext(AuthContext);
//   // useEffect(() => {
//   //   // Fetch transaction history when the component mounts
//   //   userHistory();
//   // }, [userHistory, transactionHistory]);
//   return (
//     <div className="container mx-auto">
//       <div className="flex justify-center items-center">
//         <div className={styles.glass}>
//           <div className="textbox flex flex-col items-center gap-6">
//             <button
//               className={`border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center ${styles.btn}`}
//               type="button"
//               onClick={userHistory}
//             >
//               {isHistoryLoading ? 'Fetching History' : 'Get History'}
//             </button>
//             {historyError?.error && (
//               <div className="bg-red-500 text-white p-2">
//                 <p>{historyError?.message}</p>
//               </div>
//             )}
//             {transactionHistory && (
//               <div className="mt-4">
//                 <h2 className="text-xl font-semibold mb-2">Transaction History:</h2>
//                 <ul>
//                   {transactionHistory.map((transaction) => (
//                     <li key={transaction._id}>
//                       <p>
//                         #{transaction.amount} transacted between {transaction.senderName} and {transaction.recipientName} on{' '}
//                         {new Date(transaction.timestamp).toLocaleString()}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;


import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Profile.module.css';

const History = () => {
  const { userHistory, transactionHistory, isHistoryLoading, historyError } = useContext(AuthContext);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <div className={styles.glass}>
          <div className="textbox flex flex-col items-center gap-6">
            {!isHistoryLoading && (
              <button
                className={`border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center ${styles.btn}`}
                type="button"
                onClick={userHistory}
              >
                Get History
              </button>
            )}
            {historyError?.error && (
              <div className="bg-red-500 text-white p-2">
                <p>{historyError?.message}</p>
              </div>
            )}
            {transactionHistory && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Transaction History:</h2>
                <ul>
                  {transactionHistory.map((transaction) => (
                    <li key={transaction._id} className="mb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-lg">
                            <span className="font-semibold">Type:</span>{' '}
                            {transaction.tranType === 'deposit' ? 'Deposit' : 'Transfer'}
                          </p>
                          <p>
                            <span className="font-semibold">Amount:</span> #{transaction.amount}
                          </p>
                          {transaction.tranType === 'deposit' ? (
                            <>
                              <p>
                                <span className="font-semibold">Deposit Channel:</span> PAYSTACK
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                <span className="font-semibold">Sender:</span> {transaction.senderName}
                              </p>
                              <p>
                                <span className="font-semibold">Recipient:</span> {transaction.recipientName}
                              </p>
                              <p>
                                <span className="font-semibold">Narration:</span> {transaction.narration}
                              </p>
                              <p>
                                <span className="font-semibold">Timestamp:</span>{' '}
                                {new Date(transaction.timestamp).toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

