import { useParams } from 'react-router';
import useSingleDataFetch from '../hooks/useSingleDataFetch';
import BackButton from '../components/BackButton';
const Anime = () => {
  const { id } = useParams();

  const { data, loading, err } = useSingleDataFetch('anime', id);
  return (
    <div className="max-w-4xl w-full p-4 mb-8 relative text-white z-0 flex flex-col">
      <BackButton />
      {loading && <h1 className=" text-center">Loading...</h1>}
      {!loading && err && <h1 className="err w-max m-auto">{err}</h1>}
      {data && (
        <div className="text-gray-300 self-start mt-4">
          <div className="top flex flex-col sm:flex-row">
            <img
              src={data.images.jpg.image_url}
              alt={data.title}
              className="w-48 m-auto sm:m-0 h-full"
            />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
