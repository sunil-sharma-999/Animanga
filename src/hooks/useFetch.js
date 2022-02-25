import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { animangaActions } from '../store/slices/animangaSlice';

const useFetch = (typename, page = 1) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('Failed to Fetch Data');
  const { query, data } = useSelector((state) => state.animanga);

  const dispatch = useDispatch();

  useEffect(() => {
    let token;
    setLoading(true);
    const options = {
      method: 'GET',
      url: !query
        ? `https://api.jikan.moe/v4/top/${typename}`
        : `https://api.jikan.moe/v4/${typename}`,
      params: !!query
        ? { q: query, page: page, order_by: 'score', sort: 'desc' }
        : { page: page },
      cancelToken: new axios.CancelToken(function (cancel) {
        token = cancel;
      }),
    };

    axios
      .request(options)
      .then((response) => {
        const data = response.data.data;
        dispatch(animangaActions.dataSet(data));
        setLoading(false);
        !data.length ? setErr('No Data Found') : setErr(false);
      })
      .catch(function (error) {
        setLoading(false);
        if (!error.response) {
          setErr(error.message);
        } else {
          setErr(error.response.statusText);
        }
      });

    return () => token();
  }, [typename, page, query, dispatch]);
  return { data, loading, err };
};

export default useFetch;
