import { Outlet, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';

const Cards = ({ type }) => {
  const { id } = useParams(1);
  const { data: results, loading, err } = useFetch(id);

  return (
    <>
      <div className="arrows max-w-screen-lg  ">
        <Link
          className={id === '1' || !id ? 'disabled' : ''}
          to={`/${type}/${+id - 1}`}>
          &larr;
        </Link>
        <Link to={`/${type}/${+id + 1}`}>&rarr;</Link>
      </div>
      {loading && <h1 className="loading">Loading...</h1>}
      {!loading && err && <h1 className="err">{err}</h1>}
      {!loading && !err && (
        <div className="cards max-w-screen-lg">
          {results.map((data) => {
            const validDate = isNaN(Date.parse(data.start_date));
            const date = validDate
              ? (data.start_date + '-' + data.end_date).toString()
              : new Date(data.start_date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                }) +
                '-' +
                new Date(data.end_date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                });

            return (
              <Card key={data.mal_id}>
                <div className="img-wrap">
                  <img src={data.image_url} alt={data.title} />
                </div>
                <div className="info-wrap">
                  {data.rank && (
                    <p className="rank text-xl text-black/80">#{data.rank}</p>
                  )}
                  <p className="title">{data.title}</p>
                  <p className="date">{date}</p>
                  <p className="score">Score: {data.score}</p>
                </div>
                <Link
                  to={`/${type}/id/${data.mal_id}`}
                  className="card-link w-full  p-4 text-center font-bold let tracking-wider hover:bg-purple-500 hover:text-white/90 roundin ">
                  More Info
                </Link>
              </Card>
            );
          })}
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Cards;
