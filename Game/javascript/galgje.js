/*globals $:false,confirm:false,window:false */

//declaraties
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

//array met al de woorden voor galgje
ITWoorden = ["fotografie", "datacommunicatie", "programmeren", "hardware", "business", "database", "netwerk", "beveiliging", "internet", "software", "besturingssysteem", "processor", "rekenblad", "microsoft", "apple", "cryptocurrencies", "algoritme", "applicatie", "array", "autoincrement", "router", "modem", "monitor", "toetsenbord", "muis", "kabels", "interface", "playstation", "bureaustoel", "programmeur", "printers", "geheugen", "stroom", "scanners", "computerconfiguratie", "protocollen", "behuizing", "domeinnaam", "hexadecimaal", "binair", "emoticons", "internetmarketing", "netwerkkaart"];

//het alfabet om letters te kiezen
alfabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Kiest telkens een nieuw woord wanneer er gerefreshed word
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

//bij het juist raden van een letter, word "totalegoedeletters" met 1 opgeteld
function updateGoedePogingen() {
    "use strict";
    TotaleGoedeLetters += 1;
    $("#GoedeGokken").text(TotaleGoedeLetters);
}

//bij elke fout dat er gemaakt word, word de afbeelding geupdated.
//in mapje galgje images kan u zien dat ik aftel van 12 naar 0 met 0 als einde of dood.
//de tekening was zelfgemaakt.
function updateImg(AantalKansenOver) {
    "use strict";
    $("#galgje_kansen").attr("src", "GalgjeImages/galg" + AantalKansenOver + ".jpg");
}

//bij elke fout dat er gemaakt word, word er afgeteld van 12 naar 0
//de functie updateImg word hier opgeroepen.
function updateKansenOver() {
    "use strict";
    AantalKansenOver -= 1;
    $("#AantalKansenOver").text(AantalKansenOver);
    updateImg(AantalKansenOver);
}

//de totaal aantal keren dat wij gokken, word met 1 opgeteld.
function updatePogingen() {
    "use strict";
    TotaalGokken += 1;
    $("#TotaalGokken").text(TotaalGokken);
}
//als aantal kansen 0 is word, worden alle knoppen op 'disabled'
//de gameSound word gepauzeerd en de loseSound word afgespeeld.
//dit gaat gepaard met een confirm box waar dat er word meegegeven wat het woord was
//bij het klikken op oke word het spel opnieuw opgestart
//en anders als het woord geraden woord word weergegeven, stopt gameSound en start de YouWinSound
//dit gaat gepaard met een confirm box, bij het klikken op oke word het spel opnieuw opgestart.
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

//Als het gekozen letter in het woord bevind, dan GoedeLetterSound,
//en worden de functie updateOplossing en updateGoedePogingen opgeroepen
//zo niet, word functie updatePogingen.
//en anders word er weergegeven hoeveel pogingen er nog overblijven
//en functie checkWinst, om te controleren of je gewonnen hebt of verloren.
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
//als er een letter word gekozen, word functie gekozenLetter opgeroepen
//en de knop zal disabled worden.
$(function () {
    "use strict";
    $("button").click(function () {
        GekozenLetter = $(this).val();
        checkLetter(GekozenLetter);
        $(this).prop("disabled", true);
    });
});

/*deze functie heet de init functie. Hier word het spel word opgestart
hier word er random een woord gekozen in de array ITWoorden
hiervoor heb ik jquery gebruikt zodat ik de nodige html elementen kon oproepen
updateImg naar mate er aantalKansenOver zijn.
i stelt al de letters van het alfabet voor
dus aan de door mij gedeclareerd "var alfabet" word de array i gekoppeld en aangetoond dat het een button is.
in de tweede for loop word het woord weergegeven in de placeholder als de letters geraden worden
elk letter dat nog niet geraden is, is een "_". 
*/

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

/************BEGIN GameAudio***************/
//achtergrondmuziek
function playGameSound() {
    "use strict";
    document.getElementById('gameSound').play();
}
//pauseren van het achtergrondmuziek
function pauseGameSound() {
    "use strict";
    document.getElementById('gameSound').pause();
}
//muziek bij het kiezen van een goede letter
function goedeLetterSound() {
    "use strict";
    document.getElementById('letterSound').play();
}
//muziek bij het verliezen van het spel
function youLoseSound() {
    "use strict";
    document.getElementById('youLose').play();
}
//muziek bij het winnen van het spel
function youWin() {
    "use strict";
    document.getElementById('youWin').play();
}
/************EINDE GameAudio***************/

init();
