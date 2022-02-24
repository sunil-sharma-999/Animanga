import axios from 'axios';
import { useEffect, useState } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebase';
import useAuthCheck from '../hooks/useAuthCheck';
import { useDispatch } from 'react-redux';
import { addCurrentReview, addMyreview } from '../store/slices/reviewsSlice';
import { useSelector } from 'react-redux';

const useSingleDataFetch = (type, id) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const [err, setErr] = useState('Failed to Fetch Data');
  const reviews = useSelector((state) => state.reviews);
  const authState = useAuthCheck();
  const dispatch = useDispatch();

  useEffect(() => {
    setErr(null);
    setLoading(true);
    axios
      .request(`https://api.jikan.moe/v4/${type}/${id}`)
      .then((res) => {
        setdata(res.data.data);
        setLoading(false);
        setErr(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErr(error.response.statusText || 'Failed to fetch data');
      });
  }, [type, id]);

  useEffect(() => {
    if (authState) {
      getDoc(doc(db, 'reviews', type + ':' + id))
        .then((res) => {
          if (res.exists()) {
            const results = res.data();
            const data = Object.entries(results)
              .map(([key, re]) => {
                const isAuthor = key === authState;
                isAuthor
                  ? dispatch(addMyreview(re.review))
                  : dispatch(addMyreview(''));

                return {
                  ...re,
                  id: re.date.seconds,
                  areYouAuthor: isAuthor,
                  date: new Date(re.date.seconds * 1000).toLocaleString(),
                };
              })
              .sort((a, b) => b.areYouAuthor - a.areYouAuthor);
            dispatch(addCurrentReview(data));
          } else {
            dispatch(addCurrentReview([]));
            dispatch(addMyreview(''));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id, type, authState, dispatch]);

  return { data, loading, err, reviews };
};

export default useSingleDataFetch;
