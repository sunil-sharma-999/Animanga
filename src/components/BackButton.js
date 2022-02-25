import React from 'react';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="arr-wrap flex self-center w-full sticky mt-4">
        <p
          className="bg-white py-1 text-xl text-black cursor-pointer rounded-sm px-4 hover:bg-purple-500 hover:text-white"
          onClick={() => navigate(-1)}>
          &larr;
        </p>
      </div>
    </div>
  );
};

export default BackButton;
