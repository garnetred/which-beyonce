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
      <div class="card-front">B</div>
      <div class="card-back">
        <img src="assets/bey${deck.cards[i].matchInfo}.jpg">
      </div>
    </div>
    `;
    cardView.innerHTML += newCard;
  }
}

createDeck();
deck.shuffle();
makeCards();

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("individ-card")) {
    var cardJustClicked = event.target.id;
    deck.selectedCards.push(deck.cards[cardJustClicked]);
    console.log(deck.selectedCards); 
  }
});