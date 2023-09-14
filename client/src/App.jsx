import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/register" element={<Homepage/>}/>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Login />}/>
        <Route path="/profile" element={user ? <Profile/> : <Login />}/>
        <Route path="*" element= {<Navigate to="/"/>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;