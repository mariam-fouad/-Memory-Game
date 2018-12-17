const ballsClassesList = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
];

const cardsOpend = [];

let startTime = null;

let matchCounter =0;

let movesCounter =0;

let wrongMoves=0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// millisToMinutesAndSeconds function from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// add the shuffled Classes to the cards and add the event listener
const addShuffledClass = ()=>{
  const shuffleClasses = shuffle([...ballsClassesList,...ballsClassesList]); //shuffled classes 

   const cardsList = document.querySelectorAll(".card");
    let index=0;
   cardsList.forEach(function(card) {
       card.addEventListener('click',cardClicked);
        card.querySelector('i').classList.add(shuffleClasses[index]);
        index++;
    });
};

const checkFirstTime = ()=>{
    if (startTime===null)
        startTime= performance.now();
};

const checkToRemoveStar =()=>{
    const starToRemove = document.querySelector(".stars .fa-star");
    const starsContainer = document.querySelector(".stars");

    if (wrongMoves%7!==0){
        //remove every 7 wrong moves
        return;
    }
    if(!starsContainer.hasChildNodes())
    {
        //no more stars
        return;
    }

    //remove the first child
    starToRemove.remove(); 
};

const checkGameEnd = ()=>{
    if (matchCounter<8)
    {
        return;
    }

    const endTime = performance.now();
    const timePlayed = millisToMinutesAndSeconds(endTime - startTime);
    document.querySelector('.game-time').innerText=timePlayed;

    const starsNode = document.querySelector('.stars').cloneNode(true);
    document.querySelector('.game-stars').innerHTML=starsNode.innerHTML;
    
    document.querySelector('.backdrop').classList.remove('hide');
    
};

const hideBackDrop = ()=>{
    document.querySelector('.backdrop').classList.add('hide');
};

const hideAndRestart = ()=>{
    document.querySelector('.backdrop').classList.add('hide');
    restartTheGame();
};

const restartTheGame = ()=>{

    //reset the variables 
    cardsOpend.length=0;
    startTime = null;
    matchCounter =0;
    movesCounter =0;  
    document.querySelector('.moves').innerText=0;
    const shuffleClasses = shuffle([...ballsClassesList,...ballsClassesList]); //shuffled classes 

   const cardsList = document.querySelectorAll(".card");
    let index=0;
   cardsList.forEach(function(card) {
       card.className="card";
        card.querySelector('i').classList.add(shuffleClasses[index]);
        index++;
    });
};

const cardClicked= (event)=>{
    checkFirstTime(); //start the time if it is the first click
    if(event.target.className.includes('open')){
        // if the card is already open flip it back
        flipTheCardsBack();
        return;
    }
    if (cardsOpend.length<=1){
        //can only click in two cards a time

        addTheOpenClass(event.target);
        addTheShowClass(event.target);

        addToCardsOpenList(event.target);

        increaseMoves();
        checkMatch();
    }
    
};

const increaseWrongMoves =()=>{
    wrongMoves++;
}

const increaseMoves = ()=>{
    movesCounter++;
    document.querySelector('.moves').innerText=movesCounter;

};
const addTheOpenClass =(target)=>{
    target.classList.add("open");
};

const removeTheOpenClass =(target)=>{
    target.classList.remove("open");
};

const addTheShowClass =(target)=>{
    target.classList.add("show");
};
const removeTheShowClass =(target)=>{
    target.classList.remove("show");
};

const addTheMatchClass =(target)=>{
    target.classList.add("match");
};

const removeTheWrongClass =(target)=>{
    target.classList.remove("wrong");
};

//add the card class to the cardsOpend
const addToCardsOpenList =(target)=>{
    const cardClass = (target.querySelector("i").className).split(" ")[1];
    cardsOpend.push(cardClass);
};

const showWrongCardsClass = ()=>{
    const openCards = document.querySelectorAll(".open");

    openCards.forEach(function(card) {
        card.classList.add('wrong');
     });
}
// switch from open and show to match
const switchToMatch =()=>{
    const openCards = document.querySelectorAll(".open");

    openCards.forEach(function(card) {
        removeTheOpenClass(card);
        removeTheShowClass(card);
        addTheMatchClass(card);
     });

     matchCounter++;
     //remove cards from the cardsOpen List
     cardsOpend.length=0;
};

//remove the open and show class to flip it back
const flipTheCardsBack =()=>{
    increaseWrongMoves();
    checkToRemoveStar();

    const openCards = document.querySelectorAll(".open");

    openCards.forEach(function(card) {
        removeTheOpenClass(card);
        removeTheShowClass(card);
        removeTheWrongClass(card);
     });

    cardsOpend.length = 0;
};

const checkMatch =()=>{
    if(cardsOpend.length<2)//only one card is opend
        return;
    if (cardsOpend[0]===cardsOpend[1]){
        //both cards are the same
        switchToMatch();  
        checkGameEnd();    
    }
    else{
        showWrongCardsClass();
        setTimeout( ()=>{
            //have same time to see the card before it flip again
            flipTheCardsBack();
        },1000);
        
    }
};

document.querySelector('.restart').addEventListener('click',restartTheGame);
document.querySelector('.play-again').addEventListener('click',hideAndRestart);
document.querySelector('.cancel').addEventListener('click',hideBackDrop);
addShuffledClass();