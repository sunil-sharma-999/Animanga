import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { animangaActions } from '../store/slices/animangaSlice';

const useFetch = (typename, page = 1) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('Failed to Fetch Data');
  const { query, type, data } = useSelector((state) => state.animanga);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: !query
        ? `https://api.jikan.moe/v3/top/${typename}/${page}`
        : `https://api.jikan.moe/v3/search/${typename}`,
      params: query && { q: query, page: page },
    };

    axios
      .request(options)
      .then((response) => {
        const data = !!query ? response.data.results : response.data.top;
        data && dispatch(animangaActions.dataSet(data));
        setLoading(false);
        setErr(false);
      })
      .catch(function (error) {
        setLoading(false);
        if (!error.response) {
          setErr(error.message);
        } else {
          setErr(error.response.statusText);
        }
      });
  }, [typename, page, query, dispatch]);
  return { data, loading, err, type };
};

export default useFetch;
