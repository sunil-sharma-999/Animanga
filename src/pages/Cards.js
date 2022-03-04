import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { dateConvertor } from '../helper/dateConvertor';
import Loading from '../UI/Loading';
import { useGetTopQuery } from '../store/api/api';
import { motion } from 'framer-motion';

const Cards = ({ typename }) => {
  const { id = 1 } = useParams();
  const {
    userData: { favList },
    animanga: { query: q },
  } = useSelector((state) => state);

  const {
    data: results,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetTopQuery({ type: typename, id, q });

  const dateType =
    isSuccess &&
    !!results.data.length &&
    isNaN(
      Date.parse(
        results.data[0].published
          ? results.data[0].published.from
          : results.data[0].aired.from,
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
        <Link
          to={`/${typename}/${+id + 1}`}
          className={
            isSuccess && results.pagination.has_next_page ? '' : 'disabled'
          }>
          &rarr;
        </Link>
      </div>
      {isFetching && <Loading />}
      {!isFetching && isError && (
        <h1 className="err w-max m-auto">
          {error.message || error.error.split(':')[1] || error.status}
        </h1>
      )}
      {!isFetching && isSuccess && !results.data.length && (
        <h1 className="err w-max m-auto">Data Not Found</h1>
      )}
      {!isFetching && isSuccess && (
        <motion.div
          className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 px-8 "
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}>
          {results.data.map((data) => {
            const startDate = data.published
              ? data.published.from || ''
              : data.aired.from || '';
            const endDate = data.published
              ? data.published.to || ''
              : data.aired.to || '';
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
        </motion.div>
      )}
    </>
  );
};

export default Cards;
