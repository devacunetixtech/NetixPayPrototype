import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

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
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [ loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
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
        email: "",
        amount: "",
        narration: "",
    });

    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, []);

    console.log("registerInfo", registerInfo);
    console.log("depositInfo", depositInfo);
    console.log("transferInfo", transferInfo);

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

    const depositUser = useCallback(async (e) => {
        e.preventDefault();
        const timestamp = new Date().getTime(); // Get the current timestamp
        const randomValue = Math.floor(Math.random() * 1000000)
        const paymentref = `${user.name}PAY${timestamp}-${randomValue}`;
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
                        sendDepositInfoToBackend(depositInfo.amount, user.email);
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
    
    const sendDepositInfoToBackend = async (amount, email) => {
        try {
            const response = await postRequest(
                `${baseUrl}/users/initiate-deposit`, 
                JSON.stringify({ amount, email })
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
    
    const transferUser = useCallback(async (e) => {
        e.preventDefault(); 
        const debitUserID = user._id;
        const debitUserName = user.name;

        if (transferInfo.amount > 50) {
            // if () {
                // Payment is successful, now send the amount and email to the backend
                sendTransferInfoToBackend(transferInfo.amount, transferInfo.email, transferInfo.narration, debitUserID, debitUserName);
            // } else {
                // alert('Transfer failed.');
            // }
        } else {
            alert("Input amount more than 50");
        }
    }, [transferInfo]);

    const sendTransferInfoToBackend = async (amount, email, narration, debitUserID, debitUserName) => {
        try {
            const response = await postRequest(
                `${baseUrl}/users/transfer`, 
                JSON.stringify({ amount, email, narration, debitUserID, debitUserName })
            );
            setIsTransferLoading(false)
            if (response.error) {
                return setTransferError(response);
            }
            // Handle the successful response from the backend
            // You can redirect or perform any other necessary actions
            navigateTo('/dashboard')
        } catch (error) {
            console.error(error);
            setTransferError({ error: 'Failed to initiate transfer on the server' });
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
        }}>
        {children}
    </AuthContext.Provider>
    );
};