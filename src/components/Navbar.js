import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { searchActions } from '../reducers/searchSlice';

const Navbar = () => {
  const { type, query } = useSelector((state) => state.animanga);

  const dispatch = useDispatch();
  const inputRef = useRef('');
  const navigate = useNavigate();

  const handler = (e) => {
    if (e.code === 'Enter') {
      navigate(`/${type}/1`);
      dispatch(searchActions.searchFunc(inputRef.current.value));
    }
  };
  return (
    <div className="nav-wrap bg-purple-500 shadow-slate-900 shadow-sm p-4 px-8 sticky top-0 flex-wrap flex items-center z-50 w-full">
      <nav className="max-w-screen-lg flex justify-start w-full items-center m-auto">
        <Link
          to="/manga/1"
          onClick={() => {
            inputRef.current.value = '';
            dispatch(searchActions.typeFunc(`${type}`));
            dispatch(searchActions.clearQuery());
          }}
          className="logo text-white mr-4  text-2xl">
          <h1>Animanga</h1>
        </Link>
        <div className="links">
          <NavLink
            to="/manga/1"
            activeClassName="active"
            className="text-white mr-3"
            onClick={() => dispatch(searchActions.typeFunc('manga'))}>
            Manga
          </NavLink>
          <NavLink
            to="/anime/1"
            className="text-white mr-3"
            activeClassName="active"
            onClick={() => dispatch(searchActions.typeFunc('anime'))}>
            Anime
          </NavLink>
        </div>
        <input
          className="rounded-md px-4 py-2 ml-auto outline-none"
          type="text"
          ref={inputRef}
          onKeyPress={handler}
          placeholder="search and Enter"
        />
      </nav>
    </div>
  );
};

export default Navbar;
