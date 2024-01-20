import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const navigateTo = useNavigate();

    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);    
    const [ registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        transactionPin: "",
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [ loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const [resetError, setResetError] = useState(null);
    const [isResetLoading, setIsResetLoading] = useState(false);
    const [ resetInfo, setResetInfo] = useState({
        email: "",
    });

    const [ resetTokenInfo, setResetTokenInfo] = useState({
        token: "",
        newPassword: "",
    });

    const [depositError, setDepositError] = useState(null);
    const [isDepositLoading, setIsDepositLoading] = useState(false);
    const [ depositInfo, setDepositInfo] = useState({
        // email: "",
        amount: "",
    });

    const [transferError, setTransferError] = useState(null);
    const [isTransferLoading, setIsTransferLoading] = useState(false);
    const [ transferInfo, setTransferInfo] = useState({
        userAcctNumber: "",
        amount: "",
        narration: "",
        transactionPin: "",
    });
    const [historyError, setHistoryError] = useState(null);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, []);
    // const idHistory = user.userAcctNumber;
    console.log("registerInfo", registerInfo);
    console.log("depositInfo", depositInfo);
    console.log("transferInfo", transferInfo);
    console.log("resetInfo", resetInfo);
    console.log("resetTokenInfo", resetTokenInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, [])
    const updateDepositInfo = useCallback((info) => {
        setDepositInfo(info);
    }, [])
    const updateTransferInfo = useCallback((info) => {
        setTransferInfo(info);
    }, [])
    const updateResetInfo = useCallback((info) => {
        setResetInfo(info);
    }, [])
    const updateResetTokenInfo = useCallback((info) => {
        setResetTokenInfo(info);
    }, [])
     
    const registerUser = useCallback(async(e)=> {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseUrl}/users/register`, JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false)
        if(response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))    
        setUser(response)
        navigateTo('/login')
    }, [registerInfo]);

    const loginUser = useCallback(async(e) =>{
        e.preventDefault();
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`, JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false)
        if(response.error){
            return setLoginError(response);
        }
        
        localStorage.setItem("User", JSON.stringify(response))    
        setUser(response)
        navigateTo('/dashboard')
    }, [loginInfo]);

    const getUserDetails = async () => {
        const userId = user._id;
        try {
            const response = await fetch(`${baseUrl}/users/find/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // You may need to include an authorization header if your route requires authentication
                // 'Authorization': `Bearer ${yourAuthToken}`,
            },
            // You can include credentials: 'include' if you're using cookies or other credentials
            // credentials: 'include',
            });

            if (!response.ok) {
            throw new Error('Failed to fetch user details');
            }

            const userDetails = await response.json();
            return userDetails;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };

    const depositUser = useCallback(async (e) => {
        e.preventDefault();
        const timestamp = new Date().getTime(); // Get the current timestamp
        const randomValue = Math.random().toString(36).substring(2, 8);
        const paymentref = `${timestamp}${randomValue}`;
        if (depositInfo.amount > 20) {
            // Initialize the Paystack payment
            const handler = PaystackPop.setup({
                key: 'pk_test_33816fc66c34d3a0a2f736438965eaa1fc5a49d6',
                email: user.email,
                amount: depositInfo.amount * 100, // Amount in kobo
                ref: paymentref,
                onClose: function () {
                    alert('Payment window closed.');
                },
                callback: function (response) {
                    if (response.status === 'success') {
                        // Payment is successful, now send the amount and email to the backend
                        sendDepositInfoToBackend(depositInfo.amount, user.email, user.userAcctNumber);
                    } else {
                        alert('Payment failed.');
                    }
                },
            });
    
            handler.openIframe();
        } else {
            alert("Input amount more than 50");
        }
    }, [depositInfo]);
    
    const sendDepositInfoToBackend = async (amount, email, acctNo) => {
        try {
            const response = await postRequest(
                `${baseUrl}/users/initiate-deposit`, 
                JSON.stringify({ amount, email, acctNo })
            );
            setIsDepositLoading(false)
            if (response.error) {
                return setDepositError(response);
            }
            navigateTo('/dashboard')
            // Handle the successful response from the backend
            // You can redirect or perform any other necessary actions
        } catch (error) {
            console.error(error);
            setDepositError({ error: 'Failed to initiate payment on the backend' });
        }
    };
    
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
    // const clearTransferError = () => {
    //     setTransferError(null);
    // };
    // const transferUser = useCallback(async (e) => {
    //     e.preventDefault();
    //     // ... existing code ...
    //     const debitUserID = user._id;
    //     const debitUserName = user.name;
    
    //     if (transferInfo.amount > 50) {
    //         try {
    //             const response = await postRequest(
    //                 `${baseUrl}/users/transfer`,
    //                 JSON.stringify({ amount:transferInfo.amount, email:transferInfo.email, narration:transferInfo.narration, debitUserID, debitUserName })
    //             );
    
    //             setIsTransferLoading(false);
    
    //             if (response.error) {
    //                 // Handle the error received from the backend
    //                 setTransferError(response);
    //                 return;
    //             }
    
    //             // Handle the successful response from the backend
    //             navigateTo('/dashboard');
    //             clearTransferError(); // Clear error after a successful transfer
    //         } catch (error) {
    //             console.error(error);
    //             setTransferError({ error: 'Failed to initiate transfer on the server' });
    //         }
    //     } else {
    //         alert("Input amount more than 50");
    //     }
    // }, [transferInfo]);

    const clearTransferError = () => {
        setTransferError(null);
    };
    const transferUser = useCallback(async (e) => {
        e.preventDefault();
        setIsTransferLoading(true)
        setTransferError(null)
        // ... existing code ...
        const debitUserID = user._id;
        const debitUserName = user.name;
        if (transferInfo.amount > 50) {
            try {
                const response = await postRequest(
                    `${baseUrl}/users/transfer`,
                    JSON.stringify({ userAcctNumber:transferInfo.userAcctNumber, amount:transferInfo.amount, narration:transferInfo.narration, transactionPin:transferInfo.transactionPin, debitUserID, debitUserName })
                );

                setIsTransferLoading(false);

                if (response.error) {
                    // Handle the error received from the backend
                    setTransferError(response);
                    console.log(response.message);
                    return;
                }

                // Handle the successful response from the backend
                alert("Transfer Successful");
                navigateTo('/dashboard');
                clearTransferError();
            } catch (error) {
                console.error(error);
                setTransferError({ error: 'Failed to initiate transfer on the server' });
            }
        } else {
            alert("Amount must be greater than 50");
        }
    }, [transferInfo]);

    const [transactionHistory, setTransactionHistory] = useState(null);
    
    const userHistory = useCallback(async (e) => {
        // ... existing code ...
        e.preventDefault();
        setIsHistoryLoading(true)
        setHistoryError(null);
        const idHistory = user.userAcctNumber;
        try {
          // Send a request to the backend to initiate the password reset
          const response = await postRequest(
            `${baseUrl}/users/fetchHistory`, JSON.stringify({ idHistory })
          );
          setIsHistoryLoading(false)
          if(response.error){
              return setHistoryError(response);
          }
          setTransactionHistory(response.transactionHistory);
          console.log(response.transactionHistory);
        } catch (error) {
          console.error(error);
          setHistoryError('Something went wrong. Please try again.');
        }
    }, [user]);
  
    const handleRequestPasswordReset = async (e) => {
      e.preventDefault();
      setIsResetLoading(true)
      try {
        // Send a request to the backend to initiate password reset
        const response = await postRequest(
            `${baseUrl}/users/reset-password/request`, JSON.stringify({ resetInfo })
          );
        setIsResetLoading(false)
        if (response.error) {
          // Handle reset error
          setResetError(response.error);
        }
        navigateTo('resetPassword/verify')
      } catch (error) {
        console.error('Failed to initiate password reset', error);
        setResetError('Failed to initiate password reset. Please try again.');
      }
    };

    const handleResetPassword = async (e) => {
      e.preventDefault();   
      try {
        // Send a request to the backend to reset the password
        const response = await postRequest(
            `${baseUrl}/users/reset-password/verifyToken`, JSON.stringify({ resetTokenInfo })
          );
            console.log(token)
        if (response.error) {
          // Handle reset error
          setResetError(response.error);
        }
        navigateTo('/login')
      } catch (error) {
        console.error('Failed to reset password', error);
        setResetError('Failed to reset password. Please try again.');
      }
    };

    const logoutUser = useCallback(() =>{
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    return (
    <AuthContext.Provider 
        value ={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginUser,
            loginInfo,
            updateLoginInfo,
            loginError,
            isLoginLoading,
            getUserDetails,
            depositUser,
            depositInfo,
            updateDepositInfo,
            depositError,
            isDepositLoading,
            transferUser,
            transferInfo,
            updateTransferInfo,
            transferError,
            isTransferLoading,
            userHistory,
            historyError,
            isHistoryLoading,
            transactionHistory,
            handleRequestPasswordReset,
            resetInfo,
            updateResetInfo,
            resetTokenInfo,
            updateResetTokenInfo,
            resetError,
            isResetLoading,
            handleResetPassword,
        }}>
        {children}
    </AuthContext.Provider>
    );
};