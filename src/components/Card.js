import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeartCircleSharp } from 'react-icons/io5';
import addFavorites from '../helper/addFavorites';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userActions } from '../store/slices/userSlice';

const Card = (props) => {
  const dispatch = useDispatch();
  const { authCheck } = useSelector((state) => state);
  return (
    <div className="card relative bg-slate-50 rounded-md overflow-hidden grid pb-14 content-start w-64">
      <div className="img-wrap h-80 w-full rounded-none">
        <img
          className="w-full h-full object-cover object-center"
          src={
            props.data.image_url ||
            props.data.images.webp.image_url ||
            props.data.images.jpg.image_url ||
            ''
          }
          alt={props.data.title}
        />
      </div>
      <div className="info-wrap p-4 mb-auto">
        <div
          className={`info-top flex ${
            !!props.data.rank ? 'justify-between' : 'justify-center'
          } items-center`}>
          {!!props.data.rank && (
            <p className="rank text-xl text-black/80">#{props.data.rank}</p>
          )}
          <div
            className="fav cursor-pointer"
            onClick={async () => {
              if (authCheck) {
                dispatch(
                  userActions.updateFavorite({
                    data: props.data,
                    typename: props.type,
                  }),
                );
                await addFavorites({
                  data: props.data,
                  typename: props.type,
                  authCheck,
                }).catch((err) => alert(err.message));
              } else {
                alert(
                  'Go To Profile and Sign up to keep track of your favorites!!!',
                );
              }
            }}>
            {props.fav ? (
              <IoHeartCircleSharp color="red" className="text-3xl" />
            ) : (
              <IoHeartCircleSharp className="text-3xl" />
            )}
          </div>
        </div>
        <p className="title text-black font-bold text-xl">{props.data.title}</p>
        <p className="date">{props.date}</p>
        <p className="score">
          Score: {props.data.scored || props.data.score || '-'}
        </p>
      </div>

      <Link
        to={`/${props.type}/id/${props.data.mal_id}`}
        className="card-link w-full  p-4 text-center font-bold let tracking-wider hover:bg-purple-500 hover:text-white/90 absolute bottom-0">
        More Info
      </Link>
    </div>
  );
};

export default Card;
