import { useParams } from 'react-router';
import useSingleDataFetch from '../hooks/useSingleDataFetch';
import BackButton from '../components/BackButton';
import Reviews from '../components/Reviews';
import Loading from '../UI/Loading';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import addFavorites from '../helper/addFavorites';

const Anime = () => {
  const { id } = useParams();

  const {
    userData: { favList },
    authCheck,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data, loading, err, reviews } = useSingleDataFetch('anime', id);

  return (
    <div className="max-w-4xl w-full p-4 mb-8 relative text-white z-0 flex flex-col">
      <BackButton />
      {loading && <Loading />}
      {!loading && err && <h1 className="err w-max m-auto">{err}</h1>}
      {data && (
        <div className="text-gray-300 self-start mt-4">
          <div className="top flex flex-col sm:flex-row">
            <div className="image-wrap w-58 m-auto sm:mx-0 items-center  h-full flex flex-col">
              <img
                src={data.images.jpg.image_url}
                alt={data.title}
                className="w-full h-full"
              />
              <div
                className="fav overflow-hidden rounded-sm bg-white w-full text-4xl mt-2 text-black cursor-pointer py-1"
                onClick={async () => {
                  if (authCheck) {
                    dispatch(
                      userActions.updateFavorite({
                        data: data,
                        typename: 'anime',
                      }),
                    );
                    await addFavorites({
                      data: data,
                      typename: 'anime',
                      authCheck,
                    });
                  } else {
                    alert(
                      'Go To Profile and Sign up to keep track of your favorites!!!',
                    );
                  }
                }}>
                {favList.includes(`manga:${data.mal_id}`) ? (
                  <IoHeartCircleSharp color="red" className="mx-auto" />
                ) : (
                  <IoHeartCircleSharp className="mx-auto" />
                )}
              </div>
            </div>

            <div className="info-wrap ml-0 sm:ml-4">
              <h1 className="text-4xl text-white text-center my-3 sm:text-left sm:my-1">
                {data.title}
              </h1>
              <p className="text-xl text-white">Infomation</p>
              <hr className="text-white" />
              <p>
                <span className="text-white"> Type: </span> {data.type}
              </p>
              <p>
                <span className="text-white"> Episodes: </span> {data.episodes}
              </p>
              <p>
                <span className="text-white"> Source: </span> {data.source}
              </p>
              <p>
                <span className="text-white"> Status: </span> {data.status}
              </p>
              <p>
                <span className="text-white"> Genres: </span>
                {data.genres.map((g) => (
                  <span key={g.name}>{g.name}, </span>
                ))}
              </p>
              {!!data.themes.length && (
                <p>
                  <span className="text-white">Theme: </span>
                  {data.themes.map((t) => (
                    <span key={t.name}>{t.name},</span>
                  ))}
                </p>
              )}
              {!!data.demographics.length && (
                <p>
                  <span className="text-white">Demographics: </span>
                  {data.demographics.map((d) => (
                    <span key={d.name}>{d.name},</span>
                  ))}
                </p>
              )}
              {!!data.studios.length && (
                <p>
                  <span className="text-white">Studios: </span>
                  {data.studios.map((s) => (
                    <span key={s.name}>{s.name}, </span>
                  ))}
                </p>
              )}
              {!!data.producers.length && (
                <p>
                  <span className="text-white">Producers: </span>
                  {data.producers.map((p) => (
                    <span key={p.name}>{p.name}, </span>
                  ))}
                </p>
              )}
              <a className="text-blue-400" href={data.url} alt="MAL link">
                MAL Link
              </a>
            </div>
          </div>
          <div className="bottom mt-4">
            <div className="text-block max-w-5xl">
              <p className="text-xl text-white">Synopsis</p>
              <hr className="text-white my-2" />
              <p>{data.synopsis}</p>
            </div>
            {data.background && (
              <div className="text-block mt-4 max-w-5xl">
                <p className="text-xl text-white">Background</p>
                <hr className="text-white my-2" />
                <p>{data.background}</p>
              </div>
            )}
            <Reviews reviews={reviews} mal_id={data.mal_id} type="anime" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;