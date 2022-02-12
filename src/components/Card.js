import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className="card bg-slate-50 rounded-md overflow-hidden grid w-64">
      <div className="img-wrap h-80 w-full rounded-none">
        <img
          className="w-full h-full object-cover object-center"
          src={props.data.image_url}
          alt={props.data.title}
        />
      </div>
      <div className="info-wrap flex-col flex p-4">
        {props.data.rank && (
          <p className="rank text-xl text-black/80">#{props.data.rank}</p>
        )}
        <p className="title text-black font-bold text-xl">{props.data.title}</p>
        <p className="date">{props.date}</p>
        <p className="score">Score: {props.data.score}</p>
      </div>
      <Link
        to={`/${props.type}/id/${props.data.mal_id}`}
        className="card-link w-full  p-4 text-center font-bold let tracking-wider hover:bg-purple-500 hover:text-white/90 roundin mt-auto">
        More Info
      </Link>
    </div>
  );
};

export default Card;
