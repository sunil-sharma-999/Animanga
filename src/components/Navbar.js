import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { animangaActions } from '../store/slices/animangaSlice';
import { MdClear } from 'react-icons/md';

const Navbar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef('');
  const formRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (/profile/g.test(pathname)) {
  //     formRef.current.reset();
  //   }
  // }, [formRef, pathname]);

  const handler = (e) => {
    e.preventDefault();
    const path = /manga|anime/g.test(pathname) || '/manga/1';
    navigate(path);
    dispatch(animangaActions.search(inputRef.current.value));
  };

  const clearSearch = (e) => {
    e.preventDefault();
    formRef.current.reset();
    dispatch(animangaActions.clearQuery());
  };

  return (
    <div className="nav-wrap bg-purple-500 shadow-slate-900 shadow-sm p-4 px-8 sticky top-0 flex flex-wrap items-center z-50 w-full ">
      <nav className="max-w-screen-lg flex-wrap flex justify-start w-full items-center m-auto ">
        <Link
          to="/manga/1"
          onClick={() => {
            inputRef.current.value = '';
            dispatch(animangaActions.clearQuery());
          }}
          className="logo text-white mr-auto sm:mr-8 text-2xl">
          <h1>Animanga</h1>
        </Link>
        <div className="links sm:mr-auto">
          <Link
            to="/manga/1"
            className={`text-white mr-3 ${
              pathname.includes('manga') ? 'active' : ''
            }`}>
            Manga
          </Link>

          <Link
            to="/anime/1"
            className={`text-white mr-3 ${
              pathname.includes('anime') ? 'active' : ''
            }`}>
            Anime
          </Link>
          <Link
            to="/profile"
            className={`text-white mr-3 ${
              pathname.includes('profile') ? 'active' : ''
            }`}>
            Profile
          </Link>
        </div>
        <form onSubmit={handler} ref={formRef} className="ml-0 my-2">
          <div className="search flex items-center bg-white rounded-md px-4 py-2 ml-0 sm:mt-0 ">
            <input
              className="outline-none border-none"
              type="text"
              ref={inputRef}
              placeholder="Search and Enter"
              minLength={3}
            />
            <MdClear
              className="text-black cursor-pointer"
              onClick={clearSearch}
            />
          </div>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
