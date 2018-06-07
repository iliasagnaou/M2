//array van objecten -> "[]" = array; "{}" = objecten
/**var dieren = [
    {
        "naam": "Musti",
        "ras": "kat",
        "lievelingseten": "chips"
    },
    {
        "naam": "sheppard",
        "ras": "hond",
        "lievelingseten": "sausage"
    },
];

dieren[1].lievelingseten;
*/
var pageCounter = 1;
var i, j;
var dierenContainer = document.getElementById("dieren_info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    "use strict";
    var mijnVerzoek = new XMLHttpRequest();
    mijnVerzoek.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    mijnVerzoek.onload = function () {
        if (mijnVerzoek.status >= 200 && mijnVerzoek.status < 400) {
            var onzeData = JSON.parse(mijnVerzoek.responseText);
            renderHTML(onzeData);
        } else {
            console.log("U bent verbonden met de server, maar er is iets misgegaan.")
        }
    };
    mijnVerzoek.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }

    mijnVerzoek.onerror = function () {
        console.log("Problemen met het verbinden aan de server")
    }

});




function renderHTML(data) {
    var htmlSTRING = "";

    for (i = 0; i < data.length; i++) {
        "use strict";
        htmlSTRING += "<p>" + data[i].name + " is een " + data[i].species + " dat houd van ";

        for (j = 0; j < data[i].foods.likes.length; j++) {
            if (j == 0) {
                htmlSTRING += data[i].foods.likes[j];
            } else {
                htmlSTRING += " en " + data[i].foods.likes[j];
            }
        }

        htmlSTRING += " en houd niet van ";

        for (j = 0; j < data[i].foods.dislikes.length; j++) {
            if (j == 0) {
                htmlSTRING += data[i].foods.dislikes[j];
            } else {
                htmlSTRING += " en " + data[i].foods.dislikes[j];
            }
        }

        htmlSTRING += '.</p><br>';
    }

    dierenContainer.insertAdjacentHTML('beforeend', htmlSTRING);
}
