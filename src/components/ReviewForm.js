import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import addReview from '../helper/addReview';
import { deleteReview } from '../helper/deleteReview';
import Loading from '../UI/Loading';
import BackButton from './BackButton';
import { AiFillDelete } from 'react-icons/ai';

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
    localStorage.setItem(
      'review',
      myreview.review || 'Write your Review ( *︾▽︾)',
    );
    setvalue(localStorage.getItem('review'));
  }, [myreview.review]);

  useEffect(() => {
    const timeOut = setTimeout(
      () => localStorage.setItem('review', value),
      2000,
    );
    return () => clearTimeout(timeOut);
  }, [value]);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.nativeEvent.submitter.name;
    if (name === 'delete') {
      if (window.confirm('Are you sure? (* ￣︿￣)')) {
        setIsLoading(true);
        setErr(false);

        deleteReview({
          collectionName: type + ':' + id,
          authState,
        })
          .then((res) => {
            setIsLoading(false);
            navigate(`/${type}/id/${id}`);
          })
          .catch((err) => {
            setIsLoading(false);
            setErr(err.message);
          });
      }
    } else {
      setIsLoading(true);
      setErr(false);
      await addReview({
        authState,
        username,
        isDocNull: !currentItemReviews.length,
        collectionName: type + ':' + id,
        e,
      })
        .then(() => {
          setIsLoading(false);
          navigate(`/${type}/id/${id}`);
        })
        .catch((error) => {
          setIsLoading(false);
          setErr(error.message.split(':')[0]);
        });
    }
  };

  return (
    <div className="review-wrap mt-10 w-full max-w-5xl md:max-w-3xl lg:max-w-5xl p-10 pt-0">
      <BackButton />
      {isLoading && <Loading />}
      {!isLoading && err && <h1 className="err text-center  mx-auto">{err}</h1>}
      <form
        onSubmit={submitHandler}
        className="text-white flex w-full mx-auto flex-col my-5">
        <textarea
          name="review"
          defaultValue={value}
          onChange={(e) => setvalue(e.target.value)}
          type="text"
          className="text-black outline-none px-4 py-1 h-56 rounded-sm"
          required
          minLength="5"
        />
        <div
          className={`btn-wrap flex ${
            !!myreview.review ? 'justify-between' : 'justify-end'
          }`}>
          {!!myreview.review && (
            <button
              name="delete"
              className="bg-rose-700 w-max my-2 px-2 py-1 rounded-sm">
              <AiFillDelete />
            </button>
          )}
          <button
            name="add"
            className="bg-purple-700 w-max my-2 px-2 py-1 rounded-sm">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
