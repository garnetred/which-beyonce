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
  }

  moveToMatched() {
    // copy the selected cards into the matchedCards array
  }

  selectCards(event) {
  //add or remove the selected cards to the selected cards array
  var cardJustClicked = event.target.id;
  var card = this.cards[cardJustClicked];
  var index = this.selectedCards.indexOf(card);
  // if (event.target.classList.contains('selected')) {
  //   deck.selectedCards.push(deck.cards[cardJustClicked]);
  //
  // } else if (event.target.classList.contains('is-flipped')) {
  //   deck.selectedCards.splice([i], 1);
  //   //will figure out how to select the correct index later
  // }

  if (index===-1) {
    this.selectedCards.push(card);
    console.log("i've been added to the array!");
  } else {
    this.selectedCards.splice(index, 1);
    console.log("i've been removed");
  }

  console.log(this.selectedCards);


    }
  }
