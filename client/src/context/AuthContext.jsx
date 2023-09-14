import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const navigateTo = useNavigate()

    const [ registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        // balance: "",
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [ loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    useEffect(()=>{
        const user = localStorage.getItem("User")

        setUser(JSON.parse(user));
    }, []);
    console.log("registerInfo", registerInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
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
        }}>
        {children}
    </AuthContext.Provider>
    );
};