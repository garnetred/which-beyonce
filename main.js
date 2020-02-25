var highscore = [];
var cardView = document.querySelector(".card-view");
var matches = document.querySelector('.numOfMatches');
var miniCard = document.getElementsByClassName('mini-card');
var deck = new Deck();
// boolean that controls whether or not we can click cards
var canSelect = true;
var gameTimer;
var player1Time;
var player2Time;
var player1name = document.querySelector('#player-one-name');
var player2name = document.querySelector('#player-two-name');
var matchesThisRound = 0;
var numOfRounds = 0;
var turn = -1;
var players = [];

function createCards() {
  for (var i = 0; i < 5; i++) {
    deck.cards.push(new Card(`bey${i}`, i));
    deck.cards.push(new Card(`bey${i}`, i));
  }
}

function addPlayers() {
  var player1 = new Player(document.querySelector('#player-one-name').value);
  var player2 = new Player(document.querySelector('#player-two-name').value);
  players.push(player1);
  players.push(player2);
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

    if (deck.matchedCards.length === 10 && numOfRounds === 1)  {
      setTimeout(playerTwoGame, 1000)
      clearInterval(gameTimer);
    } else if (deck.matchedCards.length === 10 && numOfRounds === 2) {
      setTimeout(finishGame, 1000);
      clearInterval(gameTimer);
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
  var player1Time = 0;
  gameTimer = setInterval(function() {
    player1Time++;
  }, 1000);
}

function startSecondTimer() {
  player2Time = 0;
  gameTimer = setInterval(function() {
    player2Time++;
  }, 1000);
}

function startGame() {
  numOfRounds++;
  var currentPlayerName = document.querySelector('.current-player-name');
  currentPlayerName.innerText = `${player1name.value}'s Turn`
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
  document.querySelector(".two-player-page").classList.add('hidden');
  document.querySelector(".congratulations-page").classList.add("hidden");
}

function playerTwoGame() {
  numOfRounds++;
  var currentPlayerName = document.querySelector('.current-player-name');
  currentPlayerName.innerText = `${player2name.value}'s Turn`
    for (var i = 0; i < 5; i++){
      miniCard[i].innerHTML = '';
    }
  turn = -1;
  cardView.innerHTML = ""; // clear cards from page
  matchesThisRound = 0;
  deck = new Deck(); // reset the deck
  createCards();
  addCardsToHTML();
  startSecondTimer();
  document.querySelector(".game-page").classList.remove("hidden");
  document.querySelector(".two-player-page").classList.add('hidden');
  document.querySelector(".congratulations-page").classList.add("hidden");
}

function finishGame() {
  clearInterval(gameTimer);
  matchesThisRound = 0;
  matches.innerText = "0";
  document.querySelector(".game-page").classList.add("hidden");
  if (player1Time < player2Time) {
    document.querySelector('.congrats').innerText = `Congratulations, ${player1name.value}`
      document.querySelector(".timer").innerText = formatTime(player1Time);
  } else {
    document.querySelector('.congrats').innerText = `Congratulations, ${player2name.value}`;
    document.querySelector(".timer").innerText = formatTime(player2Time);
  }
  document.querySelector(".congratulations-page").classList.remove("hidden");
  highscore.push(`${player1Time} - ${player1name}`);
  highscore.push(`${player2Time} - ${player2name}`);
  var stringifiedArray = JSON.stringify(highscore);
  localStorage.setItem('highScoreArray', stringifiedArray)
  console.log(highscore)
  // displayHighScore();
  numOfRounds = 0;
  clearInterval(gameTimer);
  console.log("the game is finished");
  players = [];
}

// function displayHighScore() {
//   if (highscore.length > 0) {
//     document.querySelector('.first-playthrough').innerText = `${highscore[0]} seconds`;
//   }
//   if (highscore.length > 1) {
//     document.querySelector('.second-playthrough').innerText = `${highscore[1]} seconds`;
//   }
//   if (highscore.length > 2) {
//     document.querySelector('.third-playthrough').innerText = `${highscore[2]} seconds`;
//   }
//   if (highscore.length > 3) {
//     highscore = highscore.sort((a, b) => a - b);
//     highscore = highscore.slice(0, 4);
//   }
// }

function retrieveHighScores() {
  var parsedArray = JSON.parse(localStorage.getItem('highScoreArray'));
  highscore = parsedArray;
  displayHighScore();
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

function refreshPage() {
  location.reload();
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
    if (event.target.id === 'begin-game') {
      startGame();
  }
});

// window.onload = function() {
//     this.startGame();
//     if (localStorage.getItem('highScoreArray')) {
//       this.retrieveHighScores();
//     }
//
// };
