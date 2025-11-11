/**
 * Retourne le meilleur film.
 * Critère pris en compte : note IMDB, année, nombre de vote
 * @returns {json} Les informations du film.
 */
export async function getTheBestMovie() {
    let url = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score";
    let fetchResult = await fetch(url).then(fetchResult => fetchResult.json());
    
    const movieTab = fetchResult.results;
    let refImdb = 0;
    let refYear = 0;
    let refVotes = 0;
    let movieId = 0;
    for (let i = 0; i < movieTab.length; i++) {
        const movie = movieTab[i];
        const movieImdb = movie.imdb_score;
        const movieYear = movie.year;
        const movieVotes = movie.votes;
        if (movieImdb > refImdb) {
            refImdb = movieImdb;
            refYear = movieYear;
            refVotes = movieVotes;
            movieId = movie.id;
        } else if (movieImdb === refImdb) {
            if (movieYear > refYear) {
                refImdb = movieImdb;
                refYear = movieYear;
                refVotes = movieVotes;
                movieId = movie.id;
            } else if (movieVotes === refVotes) {
                if (movieYear > refYear) {
                    refImdb = movieImdb;
                    refYear = movieYear;
                    refVotes = movieVotes;
                    movieId = movie.id;
                } else {
                    refImdb = movieImdb;
                    refYear = movieYear;
                    refVotes = movieVotes;
                    movieId = movie.id;
                }
            }
        }
    }

    url = `http://localhost:8000/api/v1/titles/${movieId}`;
    const resultJson = await fetch(url).then(resultJson => resultJson.json());

    return resultJson;
}

/**
 * Met à jour la section "meilleur film" de la page HTML.
 * * @param {json} movie - Objet JSON représentant un film.
 */
export async function updateBestMovie(movie) {
    setSrcImageMovie("#best_film_container img", movie.image_url)

    const titleMovie = document.querySelector("#best_film_container h2");
    titleMovie.innerText = movie.title

    const resumeMovie = document.querySelector("#best_film_container p");
    resumeMovie.innerText = movie.description
}

/**
 * Met à jour l'attribut src d'une balise image.
 * Si l'url de l'image n'est pas valide, elle remplacée par l'url d'une image aléatoire
 * * @param {string} selector - Sélecteur CSS de la balise image
 * @param {string} url - Url de l'image
 */
function setSrcImageMovie(selector, url) {
    const imageMovie = document.querySelector(selector);
    imageMovie.src = url
    imageMovie.addEventListener('error', () => {
        imageMovie.src = "https://picsum.photos/298/334"; 
    });
}

/**
 * Retourne la liste des 6 meilleurs films.
 * Si une catégorie est fournie, la recherche ne se fera que sur cette catégorie
 * Si un idMovie est fourni, le film correspondant se retiré de la liste
 * * @param {integer} category - Nom de la catégorie.
 * * @param {integer} idMovie - Identifiant du film à retirer de la liste.
* @returns {table} Tableau des 6 meilleurs films.
 */
export async function getBestMovie(category = null, idMovie = null) {
    let url = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score"
    if (category != null) {
        url = url + `&genre=${category}`
    }
    // les résltats de la première page
    let fetchResult = await fetch(url).then(fetchResult => fetchResult.json());
    const movieTab1 = fetchResult.results;
    // les résltats de la deuxième page
    url = fetchResult.next
    fetchResult = await fetch(url).then(fetchResult => fetchResult.json());
    const movieTab2 = fetchResult.results;
    // les résultats des 2 premières pages
    const movieTab3 = [...movieTab2, ...movieTab1];
    // on enlève un film si besoin
    if (idMovie != null) {
        const movieTab4 = movieTab3.filter(movie => { return movie.id != idMovie});
    } else {
        const movieTab4 = [...movieTab3];
    }
    
    const movieTab5 = movieTab4.slice(0 ,6);
    return movieTab5;
}

/**
 * Met à jour la section "Films les mieux notés" de la page HTML.
 * * @param {table} movieTab - Tableau des 6 meilleurs films représentés par des pbjet Json.
 */
export async function updateBestMovieTab(movieTab) {
    // Récupération du point d'insertion
    const base_node = document.querySelector("#best_score_container_full");
    // Récupération de structure modèle
	const structure = document.querySelector("#best_score_container_full .best_score_container");
    const modele = structure.cloneNode(true)
    // on supprime la strcture modèle pour pouvoir faire une boucle avec la tableau
    structure.remove()
    // on parcourt la tableau et on met à jour les éléments HTML et on les ajoutent
    for (let i = 0; i < movieTab.length; i++) {
        const movie = movieTab[i];
        let element = modele.cloneNode(true)
        const h2 = element.querySelector("h2")
        h2.innerText = movie.title
        base_node.appendChild(element)
        setSrcImageMovie("#best_score_container_full img", movie.image_url)
    }
}

/**
 * Affecte les actions click au boutons pour qu'ils puissent affichent tous les films
 * ou seulement une partie
 */
export function setActionDisplay(){
    const button_display = document.querySelectorAll(".custom_display_action");
    for (let i = 0; i < button_display.length; i++) {
        button_display[i].addEventListener("click", function (event) {
            const text = event.target.innerText
            if (text === "Voir plus"){
                event.target.innerText = "Voir moins"
                const div_display = document.querySelectorAll(".custom_display");
                for (let j = 0; j < div_display.length; j++) {
                    div_display[j].classList.remove('custom_display');
                }
            }else{
                event.target.innerText = "Voir plus"
                const div_display = document.querySelectorAll(".best_score_container");
                for (let j = 0; j < div_display.length; j++) {
                    div_display[j].classList.add('custom_display');
                }
            }
            
        }
    )}
}
