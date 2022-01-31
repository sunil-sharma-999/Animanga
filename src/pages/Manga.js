import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useSingleDataFetch from '../hooks/useSingleDataFetch';

const Manga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useSingleDataFetch(id);
  return (
    <div className="max-w-4xl p-4 mb-8 relative z-0">
      <p
        className="bg-white py-1 text-xl mr-auto mt-4 cursor-pointer  rounded-sm block max-w-max px-4 sticky hover:bg-purple-500 hover:text-white"
        onClick={() => navigate(-1)}>
        &larr;
      </p>
      {data && (
        <div className="text-gray-300 self-start mt-4">
          <div className="top flex flex-col sm:flex-row">
            <img
              src={data.images.jpg.image_url}
              alt={data.title}
              className="w-48 m-auto"
            />
            <div className="infomation ml-5">
              <h1 className="text-4xl text-white text-center sm:text-left">
                {data.title}
              </h1>
              <p className="text-xl text-white">Infomation</p>
              <hr className="text-white" />
              <p>
                <span className="text-white"> Type: </span> {data.type}
              </p>
              <p>
                <span className="text-white"> Volumes:</span> {data.volumes}
              </p>
              <p>
                <span className="text-white"> Chapters:</span> {data.chapters}
              </p>
              <p>
                <span className="text-white"> Status:</span> {data.status}
              </p>
              <p>
                <span className="text-white"> Genres: </span>
                {data.genres.map((g) => (
                  <span key={g.name}>{g.name},</span>
                ))}
              </p>
              {!!data.themes.length && (
                <p>
                  Theme:{' '}
                  {data.themes.map((t) => (
                    <span key={t.name}>{t.name},</span>
                  ))}
                </p>
              )}
              {/* <p>Demographic</p> */}
              {!!data.serializations && (
                <p>
                  <span className="text-white">Serialization: </span>
                  {data.serializations.map((s) => (
                    <span key={s.name}>{s.name},</span>
                  ))}
                </p>
              )}
              {!!data.authors.length && (
                <p>
                  <span className="text-white">Authors: </span>
                  {data.authors.map((a) => (
                    <span key={a.name}>{a.name},</span>
                  ))}
                </p>
              )}
            </div>
          </div>
          <div className="bottom mt-4">
            <div className="text-block max-w-5xl">
              <p className="text-xl text-white ">Synopsis</p>
              <p>{data.synopsis}</p>
            </div>
            <div className="text-block mt-4 max-w-5xl">
              <p className="text-xl text-white ">Background</p>
              <p>{data.background}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manga;
