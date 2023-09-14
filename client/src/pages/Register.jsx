import React, { useState } from 'react';
// import '../styles/Profile.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/Register.module.css';
import acunetix from '../assets/acunetix.jpg';
import { AuthContext } from '../context/AuthContext';

const Register = () =>{
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ file, setFile ] = useState();
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    return (
      <>
            {/* HERO SECTION */}
      <div className="container mx-auto ">
        {/* <Toaster position='top-center' ></Toaster> */}
        <div className="flex justify-center items-center my-2">
          <div className={styles.glass} >
            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Register</h4>
            </div>

            <form className='py-1' onSubmit={registerUser}>
              <div className="profile flex justify-center py-1">
                <label htmlFor="profile">
                  <img className={styles.profile_img} src={file || acunetix} alt="avatar" />
                </label>
                <input type="file" id='profile' name='profile'/>
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} type="text" placeholder='Fullname*' 
                  onChange={(e) => 
                    updateRegisterInfo({...registerInfo, name: e.target.value})
                  } 
                />
                <input className={styles.textbox} type="text" placeholder='Email*'
                  onChange={(e) => 
                    updateRegisterInfo({...registerInfo, email: e.target.value})
                  } 
                />
                <input className={styles.textbox} type="text" placeholder='Password*' 
                  onChange={(e) => 
                    updateRegisterInfo({...registerInfo, password: e.target.value})
                  }
                />
                <button className="border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center" type='submit' >
                  {isRegisterLoading ? "Creating your account" : "REGISTER"}</button>
                  {registerError?.error && (
                    <div className="bg-red-500 text-white p-2">
                        <p>{registerError?.message}</p>
                    </div>
                  )}
              </div>
              <div className="text-center py-4">
                <span className='text-gray-900 font-bold'>Already Registered?<Link className='text-red-800' to='/login'>   Login Now</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
  export default Register;