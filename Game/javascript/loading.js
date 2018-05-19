//functie voor de loading screen van het spel
function progress() {
    "use strict";
    var prg = document.getElementById('progress');
    var percent = document.getElementById('percentCount');
    var counter = 5;
    var progress = 25;
    var id = setInterval(frame, 50);
    
    //in deze functie zal is progress, 500px breed, en de counter 100%
    //id staat op setInterval 50, 50 staat op hoe snel het geladen zal worden
    //dus als progress 500px breed is en counter op 100% staat word de clearInterval() opgeroepen
    //en zal index.html -> galgje.html openen "_self" zal de gelinkte document openen in hetzelfde venster
    //anders word progress met 5px opgeteld en de teller met 1%.
    function frame() {
        if (progress == 500 && counter == 100) {
            clearInterval();
            window.open("galgje.html", "_self");
        } else {
            progress += 5;
            counter += 1;
            prg.style.width = progress + 'px';
            percent.innerHTML = counter + '%';
        }
    }
}
//hier word de hele functie opgeteld.
progress();