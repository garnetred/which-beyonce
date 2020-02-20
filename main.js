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

createCards();
deck.shuffle();
addCardsToHTML();

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("individ-card")) {
    deck.selectCards(event);
    event.target.classList.toggle('is-flipped');
  }
});
