import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { animangaActions } from '../store/slices/animangaSlice';

const useFetch = (page = 1) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('Failed to Fetch Data');
  const { query, type, data } = useSelector((state) => state.animanga);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: !query
        ? `https://api.jikan.moe/v3/top/${type}/${page}`
        : `https://api.jikan.moe/v3/search/${type}`,
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
        setErr(error.response.statusText);
      });
  }, [type, page, query, dispatch]);
  return { data, loading, err, type };
};

export default useFetch;
