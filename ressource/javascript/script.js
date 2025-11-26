import {getTheBestMovie, updateBestMovie, getBestMovie,  updateMovieTab,
    setActionDisplay, setSelectCategory, setActionSelect
} from "./movie.js";

import {setActionModal} from "./modal.js";

// Construit le menu select pour les catégories
setSelectCategory("select_category")

// Ajout des événements au site
setActionDisplay("best_movie_all_category")
setActionDisplay("movie_category1")
setActionDisplay("movie_category2")
setActionDisplay("movie_autre1")
setActionSelect("select_category")
setActionModal()

// Mise à jour de la première section de la pahe HTML : le meilleur film
const bestMovie = await getTheBestMovie();
updateBestMovie(bestMovie)

// Mise à jour de la deuxième section de la pahe HTML : les meilleurs films toutes catgéories
let bestMovieTab = await getBestMovie(null, bestMovie.id);
updateMovieTab(bestMovieTab, "best_movie_all_category")

// Mise à jour de la troisième section de la pahe HTML : les meilleurs films de la catégorie Mystère
bestMovieTab = await getBestMovie("Mystery", null);
updateMovieTab(bestMovieTab, "movie_category1")

// Mise à jour de la quatrième section de la pahe HTML : les meilleurs films de la catégorie Fantastic
bestMovieTab = await getBestMovie("Fantasy", null);
updateMovieTab(bestMovieTab, "movie_category2")

// Mise à jour de la cinquième section de la pahe HTML : l'affiche des meilleurs film de la catégoire
// choisie par l'utilisateur
bestMovieTab = await getBestMovie("Action", null);
updateMovieTab(bestMovieTab, "movie_autre1")