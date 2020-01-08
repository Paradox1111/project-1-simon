//Starting game state
let quadrantArr = [];
let round = 0;
let score = 0;
let clickCounter = 0;

//select HTML elements
const gameBoard = document.querySelector('.quadrants')
const greenQuad = document.querySelector('.quadrant1')
const redQuad = document.querySelector('.quadrant2')
const blueQuad = document.querySelector('.quadrant3')
const yellowQuad = document.querySelector('.quadrant4')

const tutorial = document.querySelector('.tutorial')
const startBtn = document.querySelector('.start')
const quitBtn = document.querySelector('.quit')
const lossOverlay = document.querySelector('.loss')
const scoreDisplay = document.querySelector('.score')

//add event listeners for start, reset, and quadrants
gameBoard.addEventListener('click', handleQuadrant)
startBtn.addEventListener('click', handleStart)
quitBtn.addEventListener('click', handleReset)

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
    console.log(quadrantArr)
    console.log(quadrantArr[clickCounter], evt.target)
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
            //Begin the next round after 1.5 sec delay
            setTimeout(quadrantIterator(), 1500)
        }
    } else { //if quadrant clicked does not match
        //display loss overlay and 
        loss()
        handleReset()
    }
}

//reiterate previous quadrants
function quadrantIterator(){
    for(let i = 0; i < quadrantArr.length; i++){
        console.log('iterating ')
        console.log(quadrantArr[i])
        quadrantArr[i].style.opacity = '0.4' //shit aint workin
        setTimeout(function(){
            quadrantArr[i].style.opacity = '1'
        }, 1500)
    }
    //when done: randomize one additional quadrant
    console.log('Randomizing')
    console.log(quadrantArr.length*1500)
    setTimeout(quadrantRandomizer, (quadrantArr.length*1500))
}

//quadrant randomizer
function quadrantRandomizer(){
    setTimeout(function(){
    if(quadrantArr.length < round || quadrantArr.length === 0){
        //illuminate a random quadrant and append it
        let randomized = Math.random() * 100
        if(randomized < 25){
            //highlight
            greenQuad.style.opacity = '0.4'
            //then return to normal after 1.5 sec
            setTimeout(function(){
                greenQuad.style.opacity = '1'
            }, 1500)
            //then push
            quadrantArr.push(greenQuad)
        } else if (randomized > 25 && randomized < 50){
            redQuad.style.opacity = '0.4'
            setTimeout(function(){
                redQuad.style.opacity = '1'
            }, 1500)
            quadrantArr.push(redQuad)
        } else if (randomized > 50 && randomized < 75){
            blueQuad.style.opacity = '0.4'
            setTimeout(function(){
                blueQuad.style.opacity = '1'
            }, 1500)
            quadrantArr.push(blueQuad)
        } else if (randomized > 75){
            yellowQuad.style.opacity = '0.4'
            setTimeout(function(){
                yellowQuad.style.opacity = '1'
            }, 1500)
            quadrantArr.push(yellowQuad)
        }
    }
}, 1500)
    //After each quadrant has been illuminated and appended:
    //prompt user to reiterate the sequence
}

//start btn handler
function handleStart(){
    //if game not already in progress
    if(round < 1){
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
    scoreDisplay.innerHTML = '0'
    lossOverlay.style.display = 'none'
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