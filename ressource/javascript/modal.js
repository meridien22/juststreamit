import {setSrcImageMovie} from "./movie.js";

/**
 * Affecte les actions d'ouvrir et de fermer la fenêtre modale.
 */
export function setActionModal(){
    const modale = document.getElementById("modal_dialog");

    const btnClose = document.querySelector("#modal_dialog .button_close");
    btnClose.addEventListener('click', () => {
        modale.close(); 
    });

    const iconClose = document.querySelector("#modal_dialog .close_icon");
    iconClose.addEventListener('click', () => {
        modale.close();
    });
    
    const btnOpenTab = document.querySelectorAll(".button.button--style1.open, .button.button--style2.open");
    for (let i = 0; i < btnOpenTab.length; i++) {
        let btnOpen = btnOpenTab[i]
        btnOpen.addEventListener('click', (event) => {
            modale.showModal();
            getMovie(event.target.dataset.id_movie)
        });
    
    }}

/**
 * Rempli les champs de la fenêtre modale à partir de l'identifiant d'un film.
 * @param {inerger} idMovie - identifiant du film
 */
export async function getMovie(idMovie) {
    const url = `http://localhost:8000/api/v1/titles/${idMovie}`;
    const fetchResult = await fetch(url).then(fetchResult => fetchResult.json());

    document.querySelector("#modal_dialog h3").innerText = fetchResult.original_title;

    const year = fetchResult.year;
    const genre = fetchResult.genres.join(", ");
    const duration = fetchResult.duration;
    const countries = fetchResult.countries.join(" / ");
    const imdb_score = fetchResult.imdb_score;
    let rated = fetchResult.rated;
    if (parseInt(rated, 10) > 0) {
        rated = "PG-" + rated;
    }
    const worldwide_gross_income = (fetchResult.worldwide_gross_income / 1000000).toFixed(1);
    const detail = `${year} - ${genre}
        ${rated} - ${duration} minutes (${countries})
        IMDB score: ${imdb_score}/10
        Recettes au box-office: \$${worldwide_gross_income}m
    `;
    document.querySelector("#modal_dialog .detail1").innerText = detail;

    const writers = fetchResult.writers.join(", ");
    document.querySelector("#modal_dialog .detail2").innerHTML = `
    <strong>Réalisé par:</strong><br>
    ${writers}
    `;

    document.querySelector("#modal_dialog .description").innerText = fetchResult.long_description;

    const actors = fetchResult.actors.join(", ");
    document.querySelector("#modal_dialog .contribution").innerText = `Avec:
    ${actors}`;

    const element = document.querySelector("#modal_dialog .image_container");
    setSrcImageMovie(element, fetchResult.image_url)
}