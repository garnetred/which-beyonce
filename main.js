var cardView = document.querySelector(".card-view");
var deck = new Deck();
// boolean that controls whether or not we can click cards
var canSelect = true;
var gameTimer;
var secondsPassed = 0;
var matchesThisRound = 0;

function createCards() {
  for (var i = 0; i < 5; i++) {
    deck.cards.push(new Card(i));
    deck.cards.push(new Card(i));
  }
}

function addCardsToHTML() {
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
  for (var i = 0; i < deck.selectedCards.length; i++) {
    var id = deck.cards.indexOf(deck.selectedCards[i]);
    document.getElementById(`${id}`).classList.add("match");
    document.getElementById(`${id}`).classList.add("disappeared");
    if (deck.matchedCards.length === 10) {
      finishGame();
    }
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
  // var id = deck.cards.indexOf(deck.selectedCards[i].matchInfo)
  document.getElementById(`${id}`).classList.toggle("is-flipped");
}

function startTimer() {
  secondsPassed = 0;
  gameTimer = setInterval(function() {
    secondsPassed++;
  }, 1000);
}

function startGame() {
  cardView.innerHTML = ""; // clear cards from page
  matchesThisRound = 0; 
  deck = new Deck(); // reset the deck
  createCards();
  deck.shuffle();
  addCardsToHTML();
  startTimer();
  document.querySelector(".game-page").classList.remove("hidden");
  document.querySelector(".congratulations-page").classList.add("hidden");
}

function finishGame() {
  document.querySelector(".game-page").classList.add("hidden");
  document.querySelector(".congratulations-page").classList.remove("hidden");
  clearInterval(gameTimer);
  document.querySelector(".timer").innerText = formatTime(secondsPassed);
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
      }, 1500);
    }
  }
});

window.onload = startGame(); // starts the game when the page loads
