import React, { useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import authHelperFunc from '../helper/authHelperFunc';
import Profile from '../pages/Profile';
import Account from '../UI/Account';
import MethodUI from '../UI/MethodUI';

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
        <Account loading={loading} error={error}>
          <form
            onSubmit={(e) => {
              signinHandler(e, setloading, seterror);
            }}
            className="flex flex-col w-full gap-4">
            <label>
              Email:
              <br />
              <input
                className="rounded-sm text-black outline-none px-4 py-2 w-full"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                name="email"
                required
              />
            </label>

            <label>
              Password:
              <br />
              <input
                className="rounded-sm text-black outline-none px-4 py-2 w-full"
                type="password"
                name="password"
                required
              />
            </label>
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
