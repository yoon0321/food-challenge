import React from 'react';
import { SignInModal } from '../modals/SignIn';

function Login({ isLogin, handleResponseSuccess }) {
  return (
    <div>
      <SignInModal
        isLogin={isLogin}
        handleResponseSuccess={handleResponseSuccess}
      />
    </div>
  );
}

export default Login;
