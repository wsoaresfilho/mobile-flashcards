export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function getAllDecks (decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  }
}

export function getDeck (deck) {
  return {
    type: GET_DECK,
    deck,
  }
}

export function addDeck (title) {
  console.log("Action addDeck")
  console.log(title)
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card,
  }
}