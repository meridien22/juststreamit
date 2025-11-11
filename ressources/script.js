function get_screen_width(){
    // pour que cela fonctionne avec le simulateur d'écran de chrome
    let width = window.screen.width
    // si undefined => on n'est pas dans le simulateur d'écran
    if (typeof width === "undefined"){
        width = window.innerWidth
    }
    return width
}

function set_media(screen_width) {
    let media = "mobile"
    if (screen_width >= 1024){
        media = "desktop"
    } else if (screen_width >= 768) {
        media = "tablet"
    }
    console.log(media + " (" + screen_width + "px)")
    return media
}

function change_banner(media) {
  const img = document.getElementById("banner");
  const new_path = "ressources/banner_" + media + ".png";
  img.src = new_path;
}

screen_width = get_screen_width()
media = set_media(screen_width)
change_banner(media)


