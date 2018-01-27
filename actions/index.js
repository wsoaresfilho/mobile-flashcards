export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const SET_DECK = 'SET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function fetchAllDecks (decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  }
}

export function setDeck (deck) {
  return {
    type: SET_DECK,
    deck,
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    card,
    title
  }
}