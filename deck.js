class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
  }

  shuffle() {
    // shuffle cards using some method
  }

  checkSelectedCards() {
    // check if selectedcards[0] is equal to selectedcards[1]
    // if true then move to matched array using the movetomatched function
    // if (this.selectedCards.length ===1) {
    //   console.log("not enough cards!")
    //   return;
    // }
    if (this.selectedCards.length === 2) {
      if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
        this.moveToMatched();
        matchedCards();
      } else {
        unmatchedCards();
      }
    }
  }

  moveToMatched() {
    // copy the selected cards into the matchedCards array
    matchedCards();
    this.matchedCards.push(this.selectedCards[0]);
    this.matchedCards.push(this.selectedCards[1]);
    this.selectedCards = [];
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
