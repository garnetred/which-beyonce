var highscore = [];
var cardView = document.querySelector(".card-view");
var matches = document.querySelector('.numOfMatches');
var miniCard = document.getElementsByClassName('mini-card');
var deck = new Deck();
// boolean that controls whether or not we can click cards
var canSelect = true;
var gameTimer;
var secondsPassed = 0;
var matchesThisRound = 0;
var numOfRounds = 0;
var turn = -1;

function createCards() {
  for (var i = 0; i < 5; i++) {
    deck.cards.push(new Card(`bey${i}`, i));
    deck.cards.push(new Card(`bey${i}`, i));
  }
}

function addCardsToHTML() {
  deck.shuffle(deck.cards);
  //shuffles cards before adding them to HTML;
  for (var i = 0; i < deck.cards.length; i++) {
    var newCard = `
    <div class="individ-card" id="${i}">
      <div class="cardface card-front">
      <p>B<p>
      </div>
      <div class="cardface card-back">
        <img src="assets/bey${deck.cards[i].matchInfo}.jpg">
      </div>
    </div>
    `;
    cardView.innerHTML += newCard;
  }
}

function matchedCards() {
  matchesThisRound++;
  turn++;
  matches.innerText = `${matchesThisRound}`;
  for (var i = 0; i < deck.selectedCards.length; i++) {
    var id = deck.cards.indexOf(deck.selectedCards[i]);
    document.getElementById(`${id}`).classList.add("match");
    document.getElementById(`${id}`).classList.add("disappeared");
    matchImages();
  }
  if (deck.matchedCards.length === 10) {
    setTimeout(finishGame, 1000);
  }
}

function matchImages() {
  for (var b = 0; b < deck.matchedCards.length; b++) {
    miniCard[turn].innerHTML = `<img src = "assets/${deck.matchedCards[b].image}.jpg">`;
  }
}

function unmatchedCards() {
  for (var i = 0; i < deck.selectedCards.length; i++) {
    var id = deck.cards.indexOf(deck.selectedCards[i]);
    flipCard(id);
  }
}

// take a card's ID and flip it on the page
function flipCard(id) {
  document.getElementById(`${id}`).classList.toggle("is-flipped");
}

function startTimer() {
  secondsPassed = 0;
  gameTimer = setInterval(function() {
    secondsPassed++;
  }, 1000);
}

function startGame() {
  numOfRounds++;
    for (var i = 0; i < 5; i++){
      miniCard[i].innerHTML = '';
    }
  turn = -1;
  cardView.innerHTML = ""; // clear cards from page
  matchesThisRound = 0;
  deck = new Deck(); // reset the deck
  createCards();
  addCardsToHTML();
  startTimer();
  document.querySelector(".game-page").classList.remove("hidden");
  document.querySelector(".congratulations-page").classList.add("hidden");
}

function finishGame() {
  clearInterval(gameTimer);
  matchesThisRound = 0;
  matches.innerText = "0";
  document.querySelector(".game-page").classList.add("hidden");
  document.querySelector(".congratulations-page").classList.remove("hidden");
  highscore.push(secondsPassed);
  displayHighScore();
  document.querySelector(".timer").innerText = formatTime(secondsPassed);
}

function displayHighScore() {
  if (highscore.length > 0) {
    document.querySelector('.first-playthrough').innerText = `${highscore[0]} seconds`;
  }
  if (highscore.length > 1) {
    document.querySelector('.second-playthrough').innerText = `${highscore[1]} seconds`;
  } 
  if (highscore.length > 2) {
    document.querySelector('.third-playthrough').innerText = `${highscore[2]} seconds`;
  }
  if (highscore.length > 3) {
    highscore = highscore.sort((a, b) => a - b);
    highscore = highscore.slice(0, 4);
  }
}

// takes in a number of seconds and return a string formatted with the minutes and seconds
function formatTime(seconds) {
  var mins = Math.floor(seconds / 60).toString();
  seconds = (seconds % 60).toString();

  if (mins > 0)
    return `${mins} minute${mins == 1 ? "" : "s"} and ${seconds} second${seconds == 1 ? "" : "s"}`;
  else
    return `${seconds} seconds`;
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("individ-card") && canSelect) {
    deck.selectCards(event);
    // event.target.classList.toggle('is-flipped');
    flipCard(event.target.id);
    if (deck.selectedCards.length == 2) {
      canSelect = false; // disable selecting of cards
      setTimeout(function() {
        // after n seconds,
        deck.checkSelectedCards(); // check if the cards match (and do logic if they do)
        deck.clearSelectedCards(); // clear all the cards we've selected
        canSelect = true; // allow the user to select cards again
      }, 2000);
    }
  }
});

window.onload = startGame(); // starts the game when the page loads
