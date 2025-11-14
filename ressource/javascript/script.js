import {getTheBestMovie, updateBestMovie, getBestMovie,  updateMovieTab,
    setActionDisplay, setActionSelect
} from "./movie.js";

import {setActionModal} from "./modal.js";

setActionDisplay("best_movie_all_category")
setActionDisplay("movie_category1")
setActionDisplay("movie_category2")
setActionDisplay("movie_autre1")
setActionSelect("select_category")
setActionModal()

const bestMovie = await getTheBestMovie();
updateBestMovie(bestMovie)

let bestMovieTab = await getBestMovie(null, bestMovie.id);
updateMovieTab(bestMovieTab, "best_movie_all_category")

bestMovieTab = await getBestMovie("Mystery", null);
updateMovieTab(bestMovieTab, "movie_category1")

bestMovieTab = await getBestMovie("Fantasy", null);
updateMovieTab(bestMovieTab, "movie_category2")

bestMovieTab = await getBestMovie("Action", null);
updateMovieTab(bestMovieTab, "movie_autre1")