import axios from 'axios';
import { useEffect, useState } from 'react';

const useSingleDataFetch = (type, id) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('Failed to Fetch Data');

  useEffect(() => {
    axios
      .request(`https://api.jikan.moe/v4/${type}/${id}`)
      .then((res) => {
        setdata(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErr(error.response.statusText);
      });
  }, [type, id]);

  return { data, loading, err };
};

export default useSingleDataFetch;
