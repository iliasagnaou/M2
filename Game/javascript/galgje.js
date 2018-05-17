/*globals $:false,confirm:false,window:false */
var ITWoorden, GekozenLetter, placeholder = "",
    TotaalGokken = 0;
var TotaleGoedeLetters = 0;
var AantalKansenOver = 12;
var alfabet, WordPicker, Woord;
var i, j;
var UppWoord;
var arr;
var placeholderArr;
var result;

ITWoorden = ["fotografie", "datacommunicatie", "programmeren", "hardware", "business", "database", "netwerk", "beveiliging", "internet", "software", "besturingssysteem", "processor", "rekenblad", "microsoft", "apple", "cryptocurrencies", "algoritme", "applicatie", "array", "autoincrement", "router", "modem", "monitor", "toetsenbord", "muis", "kabels", "interface", "playstation", "bureaustoel", "programmeur", "printers", "geheugen", "stroom", "scanners", "computerconfiguratie", "protocollen", "behuizing", "domeinnaam", "hexadecimaal", "binair", "emoticons", "internetmarketing", "netwerkkaart"];
alfabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function updateOplossing(GekozenLetter) {
    "use strict";
    UppWoord = Woord.toUpperCase();
    arr = UppWoord.split(""); // ["W", "h", "i", "t", "e", " ", "D", "o", "g"]
    placeholderArr = placeholder.split("");
    for (i = 0; i < arr.length; i += 1) {
        if (GekozenLetter === arr[i]) {
            placeholderArr.splice(i, 1, GekozenLetter);
        }
    }
    result = placeholderArr.join(""); // "White Fog"
    placeholder = result;
    $("#LetterHolder").text(placeholder);
}

function updateGoedePogingen() {
    "use strict";
    TotaleGoedeLetters += 1;
    $("#GoedeGokken").text(TotaleGoedeLetters);
}

function updateImg(AantalKansenOver) {
    "use strict";
    $("#galgje_kansen").attr("src", "GalgjeImages/galg" + AantalKansenOver + ".jpg");

}

function updateKansenOver() {
    "use strict";
    AantalKansenOver -= 1;
    $("#AantalKansenOver").text(AantalKansenOver);
    updateImg(AantalKansenOver);
}

function updatePogingen() {
    "use strict";
    TotaalGokken += 1;
    $("#TotaalGokken").text(TotaalGokken);
}

function checkWinst() {
    "use strict";
    if (AantalKansenOver === 0) {
        $('button').prop('disabled', true);
        pauseGameSound();
        youLoseSound();
        if (confirm("Het woord was " + "'" + Woord + "'. " + "Wilt u opnieuw proberen?")) {
            window.location.reload();
        }
    } else if (Woord.toUpperCase() === placeholder) {
        pauseGameSound();
        youWin();
        if (confirm("U won.  Wilt u opnieuw spelen?")) {
            window.location.reload();
        }
    }
}

function checkLetter(GekozenLetter) {
    "use strict";
    if (Woord.toUpperCase().includes(GekozenLetter)) {
        goedeLetterSound();
        updateOplossing(GekozenLetter);
        updateGoedePogingen();
    } else {
        updateKansenOver(GekozenLetter);
    }
    updatePogingen();
    checkWinst();
}
$(function () {
    "use strict";
    $("button").click(function () {
        GekozenLetter = $(this).val();
        checkLetter(GekozenLetter);
        $(this).prop("disabled", true);
    });
});

function init() {
    "use strict";
    WordPicker = Math.floor(Math.random() * ITWoorden.length);
    Woord = ITWoorden[WordPicker];
    $("#AantalKansenOver").text(AantalKansenOver);
    updateImg(AantalKansenOver);
    for (i = 0; i < alfabet.length; i += 1) {
        $("#alfabet_div").append("<button value=" + alfabet[i] + ">" + alfabet[i] + "</button>");
    }
    for (j = 0; j < Woord.length; j += 1) {
        placeholder += "_";

    }
    $("#LetterHolder").append(placeholder);
    playGameSound();
}

function playGameSound() {
    "use strict";
    document.getElementById('gameSound').play();
}

function pauseGameSound() {
    "use strict";
    document.getElementById('gameSound').pause();
}

function goedeLetterSound() {
    "use strict";
    document.getElementById('letterSound').play();
}

function youLoseSound() {
    "use strict";
    document.getElementById('youLose').play();
}

function youWin() {
    "use strict";
    document.getElementById('youWin').play();
}

init();
//responsive design
