var cardView = document.querySelector(".card-view");
var deck = new Deck();

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
  for (var i = 0; i < deck.selectedCards.length; i++){
    var id = deck.cards.indexOf(deck.selectedCards[i])
    document.getElementById(`${id}`).classList.add('match');
    document.getElementById(`${id}`).classList.add('disappeared');
  }
  // this.selectedCards[0].classList.add('match');
  // this.selectedCards[1].classList.add('match');
  // this.selectedcards[0].classList.add('hide');
  // this.selectedcards[1].classList.add('hide');
  // this.selectedCards = [];
}

function unmatchedCards() {
  for (var i = 0; i < deck.selectedCards.length; i++){
    var id = deck.cards.indexOf(deck.selectedCards[i])
    document.getElementById(`${id}`).classList.toggle('is-flipped');
  }
}

// function flipCards(cardID) {
//   var id = deck.cards.indexOf(deck.selectedCards[i].matchInfo)
//   document.getElementById(`${id}`).classList.toggle('is-flipped');
// }

createCards();
deck.shuffle();
addCardsToHTML();

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("individ-card")) {
    deck.selectCards(event);
    // flipCards(event);
    event.target.classList.toggle('is-flipped');
  }
});
