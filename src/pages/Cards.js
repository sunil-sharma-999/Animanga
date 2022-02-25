import { Outlet, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { dateConvertor } from '../helper/dateConvertor';
import Loading from '../UI/Loading';

const Cards = ({ typename }) => {
  const { id } = useParams(1);
  const { data: results, loading, err } = useFetch(typename, id);

  const { favList } = useSelector((state) => state.userData);

  const dateType =
    !!results.length &&
    isNaN(
      Date.parse(
        results[0].published
          ? results[0].published.from
          : results[0].aired.from,
      ),
    );
  return (
    <>
      <div className="arrows max-w-screen-lg flex justify-between text-white w-10/12 mt-8">
        <Link
          className={id === '1' || !id ? 'disabled' : ''}
          to={`/${typename}/${+id - 1}`}>
          &larr;
        </Link>
        <Link to={`/${typename}/${+id + 1}`}>&rarr;</Link>
      </div>
      {loading && <Loading />}
      {!loading && err && <h1 className="err w-max m-auto">{err}</h1>}
      {!loading && !err && (
        <div className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 px-8 animate-[comeup_500ms_ease-in-out_normal]">
          {results.map((data) => {
            const startDate = data.published
              ? data.published.from
              : data.aired.from;
            const endDate = data.published ? data.published.to : data.aired.to;
            return (
              <Card
                key={data.mal_id}
                data={data}
                date={dateConvertor(dateType, startDate, endDate)}
                type={typename}
                fav={favList && favList.includes(`${typename}:${data.mal_id}`)}
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
