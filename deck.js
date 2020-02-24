class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
  }

  shuffle(array) {
    // shuffles cards using Fisher Yates shuffle!
    var len = array.length;
    var j;
    var temporaryValues;

    while (len) {
      j = Math.floor(Math.random() * len--);
      temporaryValues = array[len];
      array[len] = array[j];
      array[j] = temporaryValues;
    }
    console.log(this.cards);
  }

  checkSelectedCards() {
    if (this.selectedCards.length === 2) {
      if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
        this.moveToMatched();
      } else {
        unmatchedCards();
      }
    }
  }

  moveToMatched() {
    // copy the selected cards into the matchedCards array
    this.matchedCards.push(this.selectedCards[0]);
    this.matchedCards.push(this.selectedCards[1]);
    matchedCards();
    this.clearSelectedCards();
  }

  selectCards(event) {
    //add or remove the selected cards to the selected cards array
    var cardJustClicked = event.target.id;
    var card = this.cards[cardJustClicked];
    var index = this.selectedCards.indexOf(card);

    if (index === -1) {
      this.selectedCards.push(card);
    } else {
      this.selectedCards.splice(index, 1);
    }
  }

  clearSelectedCards() {
    this.selectedCards = [];
  }
}
