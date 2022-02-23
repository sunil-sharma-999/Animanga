import React from 'react';
import { dateConvertor } from '../helper/dateConvertor';
import Card from './Card';

const Favorites = ({ data }) => {
  return (
    <div className="favorites mt-8 animate-[comeup_500ms_ease-in-out_normal]">
      <h1 className="text-2xl border-b-2 border-purple-600 w-max mx-auto">
        Favorites
      </h1>
      {!data.length && (
        <p className="text-gray-300 my-2">No Favorites added as of yet</p>
      )}
      <div className="cards max-w-screen-lg flex flex-wrap justify-center text-black w-full my-8 gap-8 px-4 text-left">
        {data &&
          data.map((fav) => {
            const dateType = !!data.length && isNaN(Date.parse(fav.start_date));
            return (
              <Card
                key={fav.mal_id}
                data={fav}
                id={fav.mal_id}
                date={dateConvertor(dateType, fav.start_date, fav.end_date)}
                type={fav.type.toLowerCase() === 'manga' ? 'manga' : 'anime'}
                fav={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
