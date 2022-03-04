import React, { useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import authHelperFunc from '../helper/authHelperFunc';
import Profile from '../pages/Profile';
import Account from '../UI/Account';
import MethodUI from '../UI/MethodUI';
import Input from './Input';

const Signin = ({ setType }) => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const authState = useAuthCheck();

  const { signinHandler } = authHelperFunc();

  return (
    <>
      {authState ? (
        <Profile />
      ) : (
        <Account loading={loading} error={error} type="SIGN IN">
          <form
            onSubmit={(e) => {
              signinHandler(e, setloading, seterror);
            }}
            className="flex flex-col w-full gap-4">
            <Input
              label="Email"
              type="email"
              name="email"
              required={true}
              placeholder="test@test.com"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="* * * * * *"
              required={true}
            />
            <MethodUI
              msg="Wanna Sign Up? Click On Me!"
              method="signup"
              setType={setType}
            />
            <button className="bg-purple-700 rounded-md w-max m-auto py-2 px-4">
              SIGN IN!!!
            </button>
          </form>
        </Account>
      )}
    </>
  );
};

export default Signin;
