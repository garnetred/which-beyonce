var highscore = [];
var cardView = document.querySelector(".card-view");
var matches = document.querySelector(".numOfMatches");
var miniCard = document.getElementsByClassName("mini-card");
var deck = new Deck();
// boolean that controls whether or not we can click cards
var canSelect = true;
var gameTimer;
var player1Time;
var player2Time;
var player1name = document.querySelector("#player-one-name");
var player2name = document.querySelector("#player-two-name");
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
  var player1 = new Player(player1name.value);
  var player2 = new Player(player2name.value);
  players.push(player1);
  players.push(player2);
}

function addCardsToHTML() {
  deck.shuffle(deck.cards);
  //shuffles cards before adding them to HTML;
  for (var i = 0; i < deck.cards.length; i++) {
    var newCard = `
    <section class="card-holder">
    <div class="individ-card" id="${i}">
      <div class="cardface card-front">
      <p>B<p>
      </div>
      <div class="cardface card-back">
        <img src="assets/bey${deck.cards[i].matchInfo}.jpg">
      </div>
    </div>
    </section>
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

  if (deck.matchedCards.length === 10 && numOfRounds === 1) {
    setTimeout(startGame, 1000);
    clearInterval(gameTimer);
  } else if (deck.matchedCards.length === 10 && numOfRounds === 2) {
    setTimeout(finishGame, 1000);
    clearInterval(gameTimer);
  }
}

function matchImages() {
  for (var b = 0; b < deck.matchedCards.length; b++) {
    miniCard[
      turn
    ].innerHTML = `<img src = "assets/${deck.matchedCards[b].image}.jpg">`;
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
  player1Time = 0;
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
  var currentPlayerName = document.querySelector(".current-player-name");
  var currentPlayer = numOfRounds == 1 ? player1name : player2name;
  currentPlayerName.innerText = `${currentPlayer.value}'s Turn`;
  for (var i = 0; i < 5; i++) {
    miniCard[i].innerHTML = "";
  }
  matches.innerText = "0";
  turn = -1;
  cardView.innerHTML = ""; // clear cards from page
  matchesThisRound = 0;
  deck = new Deck(); // reset the deck
  createCards();
  addCardsToHTML();

  if (numOfRounds == 1) startTimer();
  else startSecondTimer();

  if (numOfRounds == 1) addPlayers();
  document.querySelector(".game-page").classList.remove("hidden");
  document.querySelector(".two-player-page").classList.add("hidden");
  document.querySelector(".congratulations-page").classList.add("hidden");
}

function finishGame() {
  clearInterval(gameTimer);
  matchesThisRound = 0;
  matches.innerText = "0";
  document.querySelector(".game-page").classList.add("hidden");
  if (player1Time < player2Time) {
    document.querySelector(
      ".congrats"
    ).innerText = `Congratulations, ${player1name.value}`;
    document.querySelector(".timer").innerText = formatTime(player1Time);
  } else {
    document.querySelector(
      ".congrats"
    ).innerText = `Congratulations, ${player2name.value}`;
    document.querySelector(".timer").innerText = formatTime(player2Time);
  }
  document.querySelector(".congratulations-page").classList.remove("hidden");
  updateHighscores();
  displayHighscores();
  numOfRounds = 0;
  clearInterval(gameTimer);
  players = [];
}

// takes in a number of seconds and return a string formatted with the minutes and seconds
function formatTime(seconds) {
  var mins = Math.floor(seconds / 60).toString();
  seconds = (seconds % 60).toString();

  if (mins > 0)
    return `${mins} minute${mins == 1 ? "" : "s"} and ${seconds} second${
      seconds == 1 ? "" : "s"
    }`;
  else return `${seconds} seconds`;
}

function refreshPage() {
  location.reload();
}

function retrievePlayers() {
  var allPlayersAsAString;
  allPlayersAsAString = localStorage.getItem("players");
  if (allPlayersAsAString == null) allPlayersAsAString = "[]";
  return JSON.parse(allPlayersAsAString);
}

function updateHighscores() {
  var allPlayers = retrievePlayers();

  var player1found = false,
    player2found = false;
  for (var i = 0; i < allPlayers.length; i++) {
    if (!player1found && allPlayers[i].name == player1name.value) {
      allPlayers[i] = new Player(allPlayers[i]);
      allPlayers[i].saveWin(player1Time);
      player1found = true;
    }
    if (!player2found && allPlayers[i].name == player2name.value) {
      allPlayers[i] = new Player(allPlayers[i]);
      allPlayers[i].saveWin(player2Time);
      player2found = true;
    }
  }

  if (!player1found) {
    var plr = new Player({name: player1name.value});
    plr.saveWin(player1Time);
    allPlayers.push(plr);
  }
  if (!player2found) {
    var plr = new Player({name: player2name.value});
    plr.saveWin(player2Time);
    allPlayers.push(plr);
  }

  localStorage.setItem("players", JSON.stringify(allPlayers));
}

function sortedPlayers() {
  var allPlayers = retrievePlayers();
  var scores = [];
  for (var i = 0; i < allPlayers.length; i++) {
    for (var t = 0; t < allPlayers[i].wins.length && t < 3; t++) {
      scores.push([allPlayers[i].wins[t], allPlayers[i].name]);
    }
  }
  scores.sort(function(a, b) {
    return a[0] - b[0];
  });
  return scores;
}

function displayHighscores() {
  document.querySelector("#highscores").innerHTML = "";
  var sortedTimes = sortedPlayers();
  for (var i = 0; i < sortedTimes.length && i < 3; i++) {
    var stringToAdd = `<p>${sortedTimes[i][0]} SECONDS - ${sortedTimes[i][1]}</p>`;
    if (player1name.value == sortedTimes[i][1] || player2name.value == sortedTimes[i][1]) {
      stringToAdd = `<p>${sortedTimes[i][0]} SECONDS - ${sortedTimes[i][1]}
        <img src="assets/trophy.png" class="trophy" alt="Previous Winner" />
      </p>`;
    }
    document.querySelector("#highscores").innerHTML += stringToAdd;
  }
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("individ-card") && canSelect) {
    deck.selectCards(event);
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
  if (event.target.id === "begin-game") {
    startGame();
    displayHighscores();
  }
});

window.onload = function() {
};
