import React from 'react';
import { useDispatch } from 'react-redux';
import authHelperFunc from '../helper/authHelperFunc';
import useGetDoc from '../hooks/useGetDoc';
import { authActions } from '../store/slices/authSlice';
import Favorites from './Favorites';

const ProfileDetail = () => {
  const { logOutHandler } = authHelperFunc();
  const { userData } = useGetDoc('users');
  console.log(process.env.NODE_ENV);
  const dispatch = useDispatch();

  return (
    <div className="profile text-center text-white my-4 p-4 w-full sm:max-w-screen-lg ">
      <div>
        <div
          className="card flex flex-col sm:flex-row-reverse sm:
        justify-between">
          <button
            className="bg-white w-max mb-4 text-black py-2 px-4 self-end sm:m-0"
            onClick={() => {
              logOutHandler().then((res) => {
                dispatch(authActions.logout());
              });
            }}>
            Logout
          </button>
          {userData.username && (
            <h1 className="text-4xl">Welcome @{userData.username}</h1>
          )}
        </div>
        <p className="text-xl my-2">
          Now you can track your favorite Manga and Anime !!!
        </p>
        <Favorites data={userData.favorites} />
      </div>
    </div>
  );
};

export default ProfileDetail;
