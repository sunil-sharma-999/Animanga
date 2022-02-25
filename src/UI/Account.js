import React from 'react';
import Loading from './Loading';

const Account = ({ children, loading, error }) => {
  return (
    <div className="flex flex-col my-8 text-white w-64 sm:w-70">
      {loading && <Loading />}
      {error && (
        <h1 className="text-rose-500 rounded-sm text-center py-2 my-2">
          {error}
        </h1>
      )}
      <br />

      {children}
    </div>
  );
};

export default Account;
