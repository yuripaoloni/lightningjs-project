import Movie from "../pages/Movie";
import MovieCarousel from "../pages/MovieCarousel";

export default {
  root: "$",
  routes: [
    {
      path: "$",
      component: MovieCarousel,
    },
    {
      path: "movie/:movie_id",
      component: Movie,
    },
  ],
};
