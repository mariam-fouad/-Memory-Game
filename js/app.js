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
    if (startTime!==null)
        startTime= performance.now();
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
    checkFirstTime();
    if(event.target.className.includes('open')){
        // if the card is already open flip it
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

const addToCardsOpenList =(target)=>{
    const cardClass = (target.querySelector("i").className).split(" ")[1];
    cardsOpend.push(cardClass);
};


// switch from open and show to match
const switchToMatch =()=>{
    const openCards = document.querySelectorAll(".open");

    openCards.forEach(function(card) {
        removeTheOpenClass(card);
        removeTheShowClass(card);
        addTheMatchClass(card);
     });

     matchCounter++;
     //remove it from the cardsOpen List
     cardsOpend.pop();
     cardsOpend.pop();
};

//remove the open and show class 
const flipTheCardsBack =()=>{
    const openCards = document.querySelectorAll(".open");

    openCards.forEach(function(card) {
        removeTheOpenClass(card);
        removeTheShowClass(card);
     });

    cardsOpend.length = 0
};

const checkMatch =()=>{
    if(cardsOpend.length<2)
        return;
    if (cardsOpend[0]===cardsOpend[1]){
        switchToMatch();      
    }
    else{
        setTimeout( ()=>{
            flipTheCardsBack();
        },1000);
        
    }
};

document.querySelector('.restart').addEventListener('click',restartTheGame);
addShuffledClass();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
