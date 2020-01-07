//Starting game state
let quadrantArr = [];
let round = 0;
let clickCounter = 0;
let score = 0;
//select HTML elements (quadrants, start button, reset button, loss overlay, win overlay)

//add event listeners for start, reset, and quadrants

function handleQuadrant(){
    //if quadrant clicked is equal to current quadrant 
    if(quadrantArr[round] === evt.target){
        //success, increment clickCounter
        //if clickCounter >== round
            //increment round
            //call quadrantRandomizer
    } else { //if quadrant clicked does not match
        //display loss overlay and 
        handleReset()
    }
}

//quadrant randomizer
    //once for each round (i.e. only once on the first round)
        //illuminate a random quadrant and 
        //append that quadrant to the quadrantArr for later comparison
    //After each quadrant has been illuminated and appended:
    //prompt user to reiterate the sequence

//start btn handler
function handleStart(){
    //if game not already in progress
    if(round >= 1){
        //set round to 1
        round = 1
        //start game with quadrant randomizer
        quadrantRandomizer()
    } else {
        //alert user to game in progress
        alert("Game in progress, select quit if you'd like to restart")
    }
}

//quit btn handler
function handleReset(){
    //reset game state to default values
    clickCounter = 0;
    score = 0;
    quadrantArr = [];
    round = 1;
}