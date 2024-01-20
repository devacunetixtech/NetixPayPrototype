import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ForgetPasswordReset = () => {
  const { handleResetPassword, resetTokenInfo, updateResetTokenInfo, resetError, isResetLoading } = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="text">Token:</label>
          <input
            type="text"
            id="token"
            onChange={(e) => 
              updateResetTokenInfo({...resetTokenInfo, resetToken: e.target.value})
            }
            required
          />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => 
              updateResetTokenInfo({...resetTokenInfo, newPassword: e.target.value})
            }
            required
          />
          {resetError && <p style={{ color: 'red' }}>{resetError}</p>}
          <button type="submit">{isResetLoading ? 'Changing Password' : 'Reset Password'}</button>
        </form>
    </div>
  );
};

export default ForgetPasswordReset;