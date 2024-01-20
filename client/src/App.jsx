import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";
import Transfer from "./pages/Transfer";
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest";
import ForgetPasswordReset from "./pages/ForgetPasswordReset";
import History from "./pages/History";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={user ? <Dashboard/> :<Register />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Login />}/>
        <Route path="/profile" element={user ? <Profile/> : <Login />}/>
        <Route path="/deposit" element={user ? <Deposit/> : <Login/>}/>
        <Route path="/transfer" element={user ? <Transfer/> : <Login/>}/>
        <Route path="/fetchHistory" element={user ? <History/> : <Login/>}/>
        <Route path="/requestPasswordReset" element={<ForgetPasswordRequest/>}/>
        <Route path="/resetPassword/verify" element={<ForgetPasswordReset/>}/>
        <Route path="*" element= {<Navigate to="/"/>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;