import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import addReview from '../helper/addReview';
import Loading from '../UI/Loading';
import BackButton from './BackButton';

const ReviewForm = () => {
  const [value, setvalue] = useState();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    authCheck: authState,
    userData: { username },
    reviews: { myreview, currentItemReviews },
  } = useSelector((state) => state);

  const { type, id } = useParams();

  useLayoutEffect(() => {
    localStorage.setItem('review', myreview || 'Write your Review ( *︾▽︾)');
    setvalue(localStorage.getItem('review'));
  }, [myreview]);

  useEffect(() => {
    const timeOut = setTimeout(
      () => localStorage.setItem('review', value),
      2000,
    );
    return () => clearTimeout(timeOut);
  }, [value]);

  const navigate = useNavigate();

  return (
    <div className="review-wrap mt-16 w-full max-w-5xl md:max-w-3xl lg:max-w-5xl p-10">
      <BackButton />
      {isLoading && <Loading />}
      {!isLoading && err && <h1 className="err  mx-auto">{err}</h1>}
      <form
        onSubmit={async (e) => {
          setIsLoading(true);
          setErr(false);
          await addReview({
            authState,
            username,
            isDocNull: !currentItemReviews.length,
            collectionName: type + ':' + id,
            e,
          })
            .then((res) => {
              setIsLoading(false);
              navigate(`/${type}/id/${id}`);
            })
            .catch((error) => {
              console.log('first');
              setIsLoading(false);
              setErr(error.message);
            });
        }}
        className="text-white flex w-full mx-auto flex-col my-5">
        <textarea
          name="review"
          defaultValue={value}
          onChange={(e) => setvalue(e.target.value)}
          type="text"
          className="text-black outline-none px-4 py-1 h-56 rounded-sm"
          required
          minLength="10"
        />
        <button className="bg-purple-700 w-max my-2 px-2 py-1 rounded-sm self-end">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
