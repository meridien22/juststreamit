import { getTheBestMovie, updateBestMovie, getBestMovie,  updateBestMovieTab,
    setActionDisplay
} from "./movie.js";


setActionDisplay()

const bestMovie = await getTheBestMovie();
updateBestMovie(bestMovie)

const bestMovieTab = await getBestMovie(null, bestMovie.id);
updateBestMovieTab(bestMovieTab)
