//colours of buttons
var buttonColours=["blue", "red", "yellow", "green"];

//array of the game
var gameRange=[];

//array of an user
var userRange= [];

//starting level
var level = 0;

//the game hasn't started
started=false;

//start the game by cilcking any keydown
$(document).keydown(function() {
    if(!started) {

        //Level 0
        $("#level").text(level);
        nextSequence();

        //the game started
        started = true;
    }
})

//detecting which button is clicked/triggering a handler function
$(".btn").click(function() {

    //variable to store ids of the buttons that got clicked
    var userChosenColour = $(this).attr("id");

    //adding userChosenCoours to userClickedPattern array
    userRange.push(userChosenColour);

    //playing sound when user clicked a button
    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userRange.length -1);
})

//checking answer
function checkAnswer(currentLevel) {

    
    if(gameRange[currentLevel] === userRange[currentLevel]) {
        
        //call nextSequence() after delay
        if(userRange.length === gameRange.length) {
            setTimeout(function() { nextSequence(); }, 1000)
        }
    } else {
        //playing "wrong" sound when game is over
        playSound("wrong");
        
        //adding class when game is over
        $("body").addClass("game-over");

        //removing class
        setTimeout(function() {
        $("body").removeClass("game-over")
        },200)

        //changing h1 when game is over
        $("#gameTitle").text("Game Over, try again!");

        //calling restart function
        restart();
    }
}


function nextSequence() {

    userRange = [];

    //increasing the level +1 every time nextSequence() is called
    level++;

    //changing h1 with the value of current level
    $("#level").text(level);

    $("#gameTitle").text("Be attentive");
    
    //generating random number from 0 to 3
    var randomNumber=Math.floor(Math.random()*4);

    //selecting random number from buttonColour array
    var randomChosenColour=buttonColours[randomNumber];

    //selected button animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    gameRange.push(randomChosenColour);

    //playing sound of random chosen colour
    playSound(randomChosenColour);

}

//playing sounds
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

//adding class when button is clicked
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    //removing class which was clicked
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100)
}

//restarting the game
function restart() {
    level = 0;
    gameRange=[];
    started=false;
}



