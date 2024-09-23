
var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + 0)
        gamePattern = [];
        nextSequence()
        started = true
    }
})


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)

})


function nextSequence() {

    userClickedPattern = [];

    level++

    $("h1").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).animate({ opacity: "0.5" }, 200).animate({ opacity: "1" }, 200)
    playSound(randomChosenColour)

}


function checkAnswer(currentLevel) {

    console.log(gamePattern)
    console.log(userClickedPattern)

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000)

        }
    } else {

        console.log("failure")

        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play()

        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key To Restart")

        startOver()

    }
}




function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)

}


function startOver(){

    level = 0;
    gamePattern = [];
    started = false
}






