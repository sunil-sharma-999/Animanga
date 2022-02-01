import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Cards from './pages/Cards';
import Manga from './pages/Manga';
import Anime from './pages/Anime';

const App = () => {
  return (
    <div className="app bg-black/90 min-h-screen my-auto flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/manga/id/:id" element={<Manga />} />
        <Route path="/anime/id/:id" element={<Anime />} />
        <Route path="/manga/:id" element={<Cards />} />
        <Route path="/anime/:id" element={<Cards />} />
        <Route path="/" element={<Navigate replace to="/manga/1" exact />} />
      </Routes>
    </div>
  );
};

export default App;
