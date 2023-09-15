import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import acunetix from '../assets/acunetix.jpg';
import { Toaster } from 'react-hot-toast';
import styles from '../styles/Profile.module.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () =>{
  const { user, logoutUser } = useContext(AuthContext);
  const [ file, setFile ] = useState()
    return (
      <>
        <div className="container mx-auto my-2">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex justify-center itemscenter h-screen">
          <div className={styles.glass} >

            <div className="title flex flex-col items-center">
              <h4 className='text-2xl text-gray-800 font-bold'>PROFILE</h4>
              <span className='py-4 w-2/3 text-center text-gray-500 text-xl font-bold'>
                ACTIVE : {user.name}
              </span>
            </div>

            <form className='py-1'>
              <div className="profile flex justify-center py-1">
                <label htmlFor="profile">
                  <img className={styles.profile_img} src={file || acunetix} alt="avatar" />
                </label>
                <input type="file" id='profile' name='profile'/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                {/* <div className="name flex w-3/4 gap-5"> */}
                  <input className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-gray-300 focus:ring-4" type="text" placeholder={user.email} />
                  <input className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-gray-300 focus:ring-4" type="password" placeholder="enter new password"/>
                {/* </div> */}
                  <button className="border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center {styles.btn}" type='submit'>Update</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-900'>Want to LogOut?<Link onClick={()=>{logoutUser()}} className='text-red-800 hover:underline cursor-pointer' to='/'>Log Out</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Profile;