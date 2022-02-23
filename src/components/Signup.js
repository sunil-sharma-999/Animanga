import { useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import Profile from '../pages/Profile';
import Account from '../UI/Account';
import MethodUI from '../UI/MethodUI';
import authHelperFunc from '../helper/authHelperFunc';

const Signup = ({ setType }) => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const authState = useAuthCheck();
  console.log(error);
  const { signUpHandler } = authHelperFunc();

  return (
    <>
      {authState ? (
        <Profile />
      ) : (
        <Account loading={loading} error={error}>
          <form
            onSubmit={(e) => signUpHandler(e, setloading, seterror)}
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
              Username:
              <br />
              <input
                className="rounded-sm text-black outline-none px-4 py-2 w-full"
                type="text"
                name="username"
                pattern="^[a-z0-9_.]+$"
                placeholder="Ex: i_am_Kanye_West_FR_i_swear"
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
            <label>
              Confirm Password:
              <br />
              <input
                className="rounded-sm text-black outline-none px-4 py-2 w-full"
                type="password"
                name="cpassword"
                required
              />
            </label>
            <MethodUI
              msg="Want to Sign In? Click On Me"
              method="signin"
              setType={setType}
            />
            <button className="bg-purple-700 rounded-md w-max m-auto py-2 px-4">
              SIGN UP!!!
            </button>
          </form>
        </Account>
      )}
    </>
  );
};

export default Signup;
