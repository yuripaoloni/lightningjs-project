const API_KEY = process.env.APP_API_KEY;

// docs: https://developers.themoviedb.org/3/movies/get-upcoming
export const getUpcomingMovies = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data.json();
};

// docs: https://developers.themoviedb.org/3/movies/get-similar-movies
export const getSimilarMovies = async (movie_id) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data.json();
};
