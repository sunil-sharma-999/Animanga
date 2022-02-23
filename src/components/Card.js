import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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
          src={props.data.image_url}
          alt={props.data.title}
        />
      </div>
      <div className="info-wrap p-4 mb-auto">
        <div className="info-top flex justify-between items-center">
          {props.data.rank && (
            <p className="rank text-xl text-black/80">#{props.data.rank}</p>
          )}
          <div
            className="fav cursor-pointer"
            onClick={() => {
              addFavorites(props.data, authCheck)
                .then((res) => dispatch(userActions.setData(res.data())))
                .catch((err) => alert(err.message));
            }}>
            {props.fav ? (
              <AiFillHeart color="red" className="text-2xl" />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}
          </div>
        </div>
        <p className="title text-black font-bold text-xl">{props.data.title}</p>
        <p className="date">{props.date}</p>
        <p className="score">Score: {props.data.score}</p>
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
