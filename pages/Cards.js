import { Outlet, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Cards = () => {
  const { id } = useParams(1);
  const { data: results, loading, err, type } = useFetch(id);
  const validDate =
    !!results.length && isNaN(Date.parse(results[0].start_date));
  return (
    <>
      <div className="arrows max-w-screen-lg flex justify-between text-white w-10/12 mt-8">
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
        <div className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 px-8">
          {results.map((data) => {
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
              <Card key={data.mal_id} data={data} date={date} type={type} />
            );
          })}
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Cards;
