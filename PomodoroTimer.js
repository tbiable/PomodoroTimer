var intervalFunction   //Stores the setInterval() function
var interval  //This is the interval for the timer
var startIndicator = false  //Checking if timer starts with the startTimer() function
var shortBrkIndicator = false   //Checking if timer starts by ShortBreak() function
var roundCounter = 0  //Tells us the round number which helps to start long break after 4 rounds
var longBrkIndicator = false  //Checking if timer is called from longBreak()
var minutes = 0
var seconds = 0
var resumeIndicator = false

//This is a function for a timer. It can be for the interval or breaks based on 
// the argument we passed to it
function timer(duration) {
    if (!resumeIndicator) {
        clearInterval(intervalFunction) // clear any interval before starting any new interval
        interval = duration * 60 * 1000
    }
    intervalFunction = setInterval(function () {
        interval -= 1000   //This is to adjust interval every second
        minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((interval % (1000 * 60)) / 1000)

        //If minutes are less than 10, then show minues with a zero in the front
        if (minutes < 10) {
            minutes = "0" + minutes
        }

        //If minutes are less than 10, then show minues with a zero in the front
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        //If interval is 0, then stop timer and start short break
        if (interval <= 0) {
            clearInterval(intervalFunction)
        }

        // Checking if timer function is called by Start button and if interval ends, call shortBreak()
        if (startIndicator && interval <= 0) {
            clearInterval(intervalFunction)
            roundCounter++

            if (roundCounter >= 4) {
                longBreak()
            } else {
                shortBreak()
            }
        }

        // Checking if timer function is called from shortBreak() function
        if (shortBrkIndicator && interval <= 0) {
            clearInterval(intervalFunction)
            startTimer()
        }

        if (longBrkIndicator && interval <= 0) {
            clearInterval(intervalFunction)
            startTimer()
        }

        document.getElementById("timer").innerText = minutes + " : " + seconds
        document.getElementById("roundIndicator").innerText = "Round: " + roundCounter
    }, 1000)

}

//This is a function to start the timer
function startTimer() {
    startIndicator = true
    shortBrkIndicator = false
    longBrkIndicator = false
    resumeIndicator = false

    document.getElementById("txtTimer").style.color = "white"
    document.getElementById("txtShortBreak").style.color = "black"
    document.getElementById("txtLongBreak").style.color = "black"
    return timer(25)
}

//Get a random number between two numbers
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// //This is a function for a short break
function shortBreak() {
    startIndicator = false
    shortBrkIndicator = true
    longBrkIndicator = false
    resumeIndicator = false
    timer(getRndInteger(3, 5))

    document.getElementById("txtTimer").style.color = "black"
    document.getElementById("txtShortBreak").style.color = "white"
    document.getElementById("txtLongBreak").style.color = "black"
}

//This is a function for a long break
function longBreak() {
    startIndicator = false
    shortBrkIndicator = false
    longBrkIndicator = true
    resumeIndicator = false
    timer(getRndInteger(15, 30))

    document.getElementById("txtTimer").style.color = "black"
    document.getElementById("txtShortBreak").style.color = "black"
    document.getElementById("txtLongBreak").style.color = "white"
}

//This is for the Reset button. Set all values to default
function restTimer() {
    startIndicator = false
    shortBrkIndicator = false
    longBrkIndicator = false
    resumeIndicator = false
    roundCounter = 0
    clearInterval(intervalFunction)

    document.getElementById("txtTimer").style.color = "black"
    document.getElementById("txtShortBreak").style.color = "black"
    document.getElementById("txtLongBreak").style.color = "black"
    document.getElementById("timer").innerText = "25:00"
    document.getElementById("roundIndicator").innerText = "Round: " + roundCounter
}

//This is for the Pause button
function pauseTimer() {
    return clearInterval(intervalFunction)
}

//This is for the Resume button
function resumeTimer() {
    resumeIndicator = true
    return timer()
}

