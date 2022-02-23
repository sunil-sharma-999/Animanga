import { Outlet, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { dateConvertor } from '../helper/dateConvertor';
import Loading from '../UI/Loading';

const Cards = () => {
  const { id } = useParams(1);
  const { data: results, loading, err, type } = useFetch(id);

  const {
    userData: { favList },
  } = useSelector((state) => state);

  const dateType = !!results.length && isNaN(Date.parse(results[0].start_date));

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
      {loading && <Loading />}
      {!loading && err && <h1 className="err w-max m-auto">{err}</h1>}

      {!loading && !err && (
        <div className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 px-8 animate-[comeup_500ms_ease-in-out_normal]">
          {results.map((data) => {
            return (
              <Card
                key={data.mal_id}
                data={data}
                date={dateConvertor(dateType, data.start_date, data.end_date)}
                type={type}
                fav={favList && favList.includes(data.mal_id)}
              />
            );
          })}
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Cards;
