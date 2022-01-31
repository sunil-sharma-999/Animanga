import React from 'react';

const Card = (props) => {
  return (
    <div className="card bg-slate-50 rounded-md overflow-hidden">
      {props.children}
    </div>
  );
};

export default Card;
