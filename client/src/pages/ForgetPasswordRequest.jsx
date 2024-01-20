// ForgetPasswordRequest.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const ForgetPasswordRequest = () => {
    const { handleRequestPasswordReset, resetInfo, resetError, resetSuccess, updateResetInfo, isResetLoading } = useContext(AuthContext);
  return (
    <div>
      {resetSuccess ? (
        <p>Password reset email sent successfully. Check your email for further instructions.</p>
      ) : (
        <form onSubmit={handleRequestPasswordReset}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => 
                updateResetInfo({...resetInfo, email: e.target.value})
              }
            required
          />
          {resetError && <p style={{ color: 'red' }}>{resetError}</p>}
          <button type="submit">{isResetLoading ? 'Sending reset email' : 'Request Password Reset'}</button>
        </form>
      )}
    </div>
  );
};

export default ForgetPasswordRequest;
