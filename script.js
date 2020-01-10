//Starting game state
let round = 0;
let score = 0;
let clickCounter = 0;
let quadrantArr = [];

//select HTML elements
const gameBoard = document.querySelector('.quadrants')
const greenQuad = document.querySelector('.quadrant1')
const redQuad = document.querySelector('.quadrant2')
const blueQuad = document.querySelector('.quadrant3')
const yellowQuad = document.querySelector('.quadrant4')

const tutorialBtn = document.querySelector('.tutorial-btn')
const tutorial = document.querySelector('.tutorial')
const startBtn = document.querySelector('.start')
const quitBtn = document.querySelector('.quit')
const lossOverlay = document.querySelector('.loss')
const scoreDisplay = document.querySelector('.score')

//add event listeners for start, reset, and quadrant clicks
gameBoard.addEventListener('click', handleQuadrant)
startBtn.addEventListener('click', handleStart)
quitBtn.addEventListener('click', handleReset)
tutorialBtn.addEventListener('click', toggleTutorial)

//event listeners to highlight quadrants
greenQuad.addEventListener('mouseenter', highlight)
greenQuad.addEventListener('mouseleave', unHighlight)
redQuad.addEventListener('mouseenter', highlight)
redQuad.addEventListener('mouseleave', unHighlight)
blueQuad.addEventListener('mouseenter', highlight)
blueQuad.addEventListener('mouseleave', unHighlight)
yellowQuad.addEventListener('mouseenter', highlight)
yellowQuad.addEventListener('mouseleave', unHighlight)


function handleQuadrant(evt){
    //if quadrant clicked is equal to current quadrant 
    if(quadrantArr[clickCounter] === evt.target){
        //increment clickCounter
        clickCounter ++;
        //once the player has made all the correct inputs...
        if(clickCounter >= round){
            //increment round and score, reset clickCounter
            round++;
            score++;
            clickCounter = 0;
            scoreDisplay.innerHTML = score
            //Begin the next round after 1 sec delay
            setTimeout(quadrantIterator, 1000)
        }
    } else { //if quadrant clicked does not match
        //display loss overlay and reset
        loss()
        handleReset()
    }
}

//reiterate previous quadrants
function quadrantIterator(){
    let i = 0
    let complete = false
    let interval = setInterval(function(){
        //if highlightQuadrant returns complete (i.e there are no more values in the array)
        if(complete === true){
            //clearInterval and randomize one additional quadrant
            clearInterval(interval)
            setTimeout(quadrantRandomizer, 750)
        }
        //each interval highlight the quadrantArr index i
        if(quadrantArr[i-1] && quadrantArr[i]===quadrantArr[i-1]){
            complete = highlightQuadrant(i, 750)
        } else {
            complete = highlightQuadrant(i)
        }
        i++
    }, 1250)
}

function highlightQuadrant(i, timeout=1000){

    if(quadrantArr[i]){
        quadrantArr[i].style.opacity = '0.4'
        setTimeout(function(){
            quadrantArr[i].style.opacity = '1'
        }, timeout)
    } else {
        return true
    }
}

//quadrant randomizer
function quadrantRandomizer(){
    if(quadrantArr.length < round || quadrantArr.length === 0){
    //illuminate a random quadrant and append it
    let randomized = Math.random() * 100
    if(randomized < 25){
        //highlight
        greenQuad.style.opacity = '0.4'
        //then return to normal after 1.5 sec
        setTimeout(function(){
            greenQuad.style.opacity = '1'
        }, 1000)
        //then push
        quadrantArr.push(greenQuad)
    } else if (randomized >= 25 && randomized < 50){
        redQuad.style.opacity = '0.4'
        setTimeout(function(){
            redQuad.style.opacity = '1'
        }, 1000)
        quadrantArr.push(redQuad)
    } else if (randomized >= 50 && randomized < 75){
        blueQuad.style.opacity = '0.4'
        setTimeout(function(){
            blueQuad.style.opacity = '1'
        }, 1000)
        quadrantArr.push(blueQuad)
    } else if (randomized >= 75){
         yellowQuad.style.opacity = '0.4'
        setTimeout(function(){
            yellowQuad.style.opacity = '1'
        }, 1000)
        quadrantArr.push(yellowQuad)
    }
}
    //After each quadrant has been illuminated and appended:
    //prompt user to reiterate the sequence
}

//start btn handler
function handleStart(){
    //if game not already in progress
    if(round < 1){
        //set round to 1
        round = 1
        //reset loss overlay
        lossOverlay.style.display = 'none'
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
    scoreDisplay.innerHTML = '0'
    quadrantArr = [];
    round = 0;
}

//loss handler
function loss(){
    lossOverlay.style.display = 'block'
}

//highlight and unhighlight event handlers
function highlight(evt){
    evt.target.style.opacity = '0.7'
}
 function unHighlight(evt){
    evt.target.style.opacity = '1'
}
function toggleTutorial(){
    if(tutorial.style.display === 'none'){
        tutorial.style.display = 'block'
    } else {
        tutorial.style.display = 'none'
    }
}