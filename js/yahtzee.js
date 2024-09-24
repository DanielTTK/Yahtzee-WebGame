/* Defining all variables */
var dice = new Array(0, 0, 0, 0, 0, 0);
var locked = new Array(0, 0, 0, 0, 0, 0);
var imgs = new Array(0, 0, 0, 0, 0, 0);
turn = 3;
var reset = false;
var OnePoints = 0;
var TwoPoints = 0;
var ThreePoints = 0;
var FourPoints = 0;
var FivePoints = 0;
var SixPoints = 0;
var ChancePoints = 0;

var OneUsed = false;
var TwoUsed = false;
var ThreeUsed = false;
var FourUsed = false;
var FiveUsed = false;
var SixUsed = false;
var ChanceUsed = false;

document.querySelector("#roll").addEventListener("click", function roll() {
    if (turn > 0) {
        for (i = 0; i < 5; i++) {
            // If there are still turns left => change all dice to random numbers with corrosponding dice pictures. Also checks if the dice is locked or not, more on that further down.
            if ((dice[i] != 0 && locked[i] == 0) || turn == 3) {
                dice[i] = Math.floor(Math.random() * 6) + 1;
                document.querySelector("#dice" + (i + 1)).src =
                    "img/dice" + dice[i] + ".png";
            }
        }
        turn--; // counts that one turn is used and displays amount of turns
        document.getElementById("roll").innerHTML = "Roll";
        document.getElementById("announce").innerHTML = turn + "/3 Rolls";
    } else if (turn == 0 && reset == false) {
        // If there are no turns left and we havent reset the play area, signal that there are no more rolls and show the red reset button
        // to let the user know and be ready to score their turn.
        document.getElementById("announce").innerHTML = "No more rolls";
        reset = true;
        document.getElementById("roll").innerHTML = "Reset";
        document.getElementById("roll").style.backgroundColor = "red";
        return;
    }
    /* Reset all values and objects */
    if (reset == true) {
        dice = [0, 0, 0, 0, 0, 0];
        locked = [0, 0, 0, 0, 0, 0];
        turn = 3;
        document.getElementById("announce").innerHTML = turn + "/3 Rolls";
        document.getElementById("roll").innerHTML = "Begin";
        document.getElementById("roll").style.backgroundColor = "#06D6A0";
        document.getElementById("chancepoints").innerHTML =
            "Points from chance: <br>";
        document.getElementById("points").innerHTML = "Points from pairs: <br>";

        for (i = 0; i < 5; i++) {
            document.getElementById("dice" + (i + 1)).src = "img/dice6.png";
            document.getElementById("dice" + (i + 1)).style.opacity = "100%";
        }
        reset = false;
    }
    /* Redefine all variables back to zero so they don't stack */
    OnePoints = 0;
    TwoPoints = 0;
    ThreePoints = 0;
    FourPoints = 0;
    FivePoints = 0;
    SixPoints = 0;
    ChancePoints = 0;

    score();
});
/* If a img gets clicked save(img) is called and locks or unlocks the object and responsively displays it by changing the opacity for the clicked object*/
var img = document.getElementsByClassName("dice");
function save(img) {
    if (locked[img] == 0) {
        document.getElementById("dice" + (img + 1)).style.opacity = "50%";
        locked[img] = 1;
    } else if (locked[img] == 1) {
        document.getElementById("dice" + (img + 1)).style.opacity = "100%";
        locked[img] = 0;
    }
}

/* Scoring section */
function score() {
    // adds one point for every dice that equals one
    for (z = 0; z < 5; z++) {
        if (dice[z] == 1) {
            OnePoints++;
        }
    }
    if (
        // Checks for all pairs just to compare what pair is the highest so it can give the proper output.
        OnePoints > TwoPoints &&
        OnePoints > ThreePoints &&
        OnePoints > FourPoints &&
        OnePoints > FivePoints &&
        OnePoints > SixPoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from ones: <br>" + OnePoints;
        console.log(OnePoints);
    }
    /* Same for rest of the if statements */
    for (z = 0; z < 5; z++) {
        if (dice[z] == 2) {
            TwoPoints += dice[z];
        }
    }
    if (
        TwoPoints > OnePoints &&
        TwoPoints > ThreePoints &&
        TwoPoints > FourPoints &&
        TwoPoints > FivePoints &&
        TwoPoints > SixPoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from twos: <br>" + TwoPoints;
    }

    for (z = 0; z < 5; z++) {
        if (dice[z] == 3) {
            ThreePoints += dice[z];
        }
    }
    if (
        ThreePoints > OnePoints &&
        ThreePoints > TwoPoints &&
        ThreePoints > FourPoints &&
        ThreePoints > FivePoints &&
        ThreePoints > SixPoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from threes: <br>" + ThreePoints;
    }

    for (z = 0; z < 5; z++) {
        if (dice[z] == 4) {
            FourPoints += dice[z];
        }
    }
    if (
        FourPoints > OnePoints &&
        FourPoints > TwoPoints &&
        FourPoints > ThreePoints &&
        FourPoints > FivePoints &&
        FourPoints > SixPoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from fours: <br>" + FourPoints;
    }

    for (z = 0; z < 5; z++) {
        if (dice[z] == 5) {
            FivePoints += dice[z];
        }
    }
    if (
        FivePoints > OnePoints &&
        FivePoints > TwoPoints &&
        FivePoints > ThreePoints &&
        FivePoints > FourPoints &&
        FivePoints > SixPoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from fives: <br>" + FivePoints;
    }

    for (z = 0; z < 5; z++) {
        if (dice[z] == 6) {
            SixPoints += dice[z];
        }
    }
    if (
        SixPoints > OnePoints &&
        SixPoints > TwoPoints &&
        SixPoints > ThreePoints &&
        SixPoints > FourPoints &&
        SixPoints > FivePoints
    ) {
        document.getElementById("points").innerHTML =
            "Points from sixes: <br>" + SixPoints;
    }

    for (z = 0; z < 5; z++) {
        ChancePoints += dice[z];
    }
    if (ChancePoints != 0) {
        document.getElementById("chancepoints").innerHTML =
            "Points from chance: <br>" + ChancePoints;
    } else {
        document.getElementById("chancepoints").innerHTML =
            "Points from chance: <br>";
    }
}
