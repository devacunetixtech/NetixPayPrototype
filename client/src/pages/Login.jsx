import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/Login.module.css';
import acunetix from '../assets/acunetix.jpg';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () =>{
      const [ file, setFile ] = useState()
      const { loginUser, loginInfo, updateLoginInfo, loginError, isLoginLoading, } = useContext(AuthContext);
    return ( 
    <>
      {/* HERO SECTION */}
      <div className="container mx-auto">
        {/* <Toaster position='top-center' ></Toaster> */}
        <div className="flex justify-center items-center my-4">
          <div className={styles.glass} >

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Login</h4>
            </div>

            <form className='py-1' onSubmit={loginUser}>
              <div className="profile flex justify-center py-1">
                <label htmlFor="profile">
                  <img className={styles.profile_img} src={acunetix} alt="avatar" />
                </label>
                {/* <input type="file" id='profile' name='profile'/> */}
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} type="email" required placeholder='Email*'
                  onChange={(e) =>
                    updateLoginInfo({...loginInfo, email: e.target.value})
                  }
                />
                <input className={styles.textbox} type="password" required placeholder='Password*'
                  onChange={(e) => 
                    updateLoginInfo({...loginInfo, password: e.target.value})
                  }
                />
                <button className="border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center" type='submit'>{isLoginLoading ? "...logging in" : "LOGIN"}</button>
                {loginError?.error && (
                    <div className="bg-red-500 text-white p-2">
                        <p>{loginError?.message}</p>
                    </div>
                  )}
              </div>
              <div className="text-center py-4">
                <span className='text-gray-900 font-bold'>Not Registered?<Link className='text-red-800' to='/register'>   Register Now</Link></span>
              </div>
              <div className="text-center py-4">
               <Link className='text-red-800' to='/requestPasswordReset'> Forgot Password</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    );
  }
  
  export default Login;
  