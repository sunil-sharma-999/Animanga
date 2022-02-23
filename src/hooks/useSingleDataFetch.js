import axios from 'axios';
import { useEffect, useState } from 'react';

const useSingleDataFetch = (type, id) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
    setLoading(true);
    axios
      .request(`https://api.jikan.moe/v4/${type}/${id}`)
      .then((res) => {
        setdata(res.data.data);
        setLoading(false);
        setErr(null);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErr(error.response.statusText || 'Failed to fetch data');
      });
  }, [type, id]);

  return { data, loading, err };
};

export default useSingleDataFetch;
