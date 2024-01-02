import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MoviePage from "../pages/MoviePage";
import NavBar from "../components/NavBar";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />

          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </Router>
  );
};

export default AppRouter;
