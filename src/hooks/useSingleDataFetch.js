import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useSingleDataFetch = (id) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    axios
      .request(`https://api.jikan.moe/v4/manga/${id}`)
      .then((res) => setdata(res.data.data));
  }, [id]);

  return { data };
};

export default useSingleDataFetch;
