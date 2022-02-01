import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { animangaActions } from '../store/slices/animangaSlice';

const Navbar = () => {
  const { type } = useSelector((state) => state.animanga);

  const dispatch = useDispatch();
  const inputRef = useRef('');
  const navigate = useNavigate();

  const handler = (e) => {
    e.preventDefault();
    navigate(`/${type}/1`);
    dispatch(animangaActions.search(inputRef.current.value));
  };
  return (
    <div className="nav-wrap bg-purple-500 shadow-slate-900 shadow-sm p-4 px-8 sticky top-0  flex items-center z-50 w-full">
      <nav className="max-w-screen-lg flex-wrap flex justify-start w-full items-center m-auto ">
        <Link
          to="/manga/1"
          onClick={() => {
            inputRef.current.value = '';
            dispatch(animangaActions.clearQuery());
            dispatch(animangaActions.typeSet('manga'));
          }}
          className="logo text-white mr-4  text-2xl">
          <h1>Animanga</h1>
        </Link>
        <div className="links">
          <NavLink
            to="/manga/1"
            activeClassName="active"
            className="text-white mr-3"
            onClick={() => dispatch(animangaActions.typeSet('manga'))}>
            Manga
          </NavLink>
          <NavLink
            to="/anime/1"
            className="text-white mr-3"
            activeClassName="active"
            onClick={() => dispatch(animangaActions.typeSet('anime'))}>
            Anime
          </NavLink>
        </div>
        <form onSubmit={handler}>
          <input
            className="rounded-md px-4 py-2 outline-none mt-2 ml-0 sm:mt-0 sm:ml-auto w-72 border-none"
            type="text"
            ref={inputRef}
            placeholder="search and Enter"
          />
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
