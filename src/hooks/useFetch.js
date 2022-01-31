import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { searchActions } from '../reducers/searchSlice';

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
        : `https://api.jikan.moe/v3/search/${type}?q=${query}&page=${page}`,
    };

    axios
      .request(options)
      .then((response) => {
        const data = !!query ? response.data.results : response.data.top;
        data && dispatch(searchActions.dataFunc(data));
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setErr(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [type, page, query]);
  return { data, loading, err };
};

export default useFetch;
