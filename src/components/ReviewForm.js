import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import addReview from '../helper/addReview';

const ReviewForm = (props) => {
  const [value, setvalue] = useState(localStorage.getItem('review'));

  const { username } = useSelector((state) => state.userData);

  useEffect(() => {
    localStorage.setItem(
      'review',
      props.myreview || 'Write your Review ( *︾▽︾)',
    );
  }, [props.myreview]);

  useEffect(() => {
    const timeOut = setTimeout(
      () => localStorage.setItem('review', value),
      2000,
    );
    return () => clearTimeout(timeOut);
  }, [value]);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        addReview(
          props.authState,
          username,
          props.isDocNull,
          props.collectionName,
          e,
        ).then((res) => navigate(0));
      }}
      className="text-white flex w-screen max-w-xs sm:max-w-sm md:max-w-lg flex-col mx-auto">
      <textarea
        name="review"
        defaultValue={value}
        onChange={(e) => setvalue(e.target.value)}
        type="text"
        className="text-black outline-none px-4 py-1 h-56 rounded-sm"
      />
      <button className="bg-purple-700 w-max my-2 px-2 py-1 rounded-sm self-end">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
