import { 
  GET_ALL_DECKS, 
  SET_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const initialState = {
  allDecks: {},
  deck: {},
  card: {}
}

function decks (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DECKS :
      return {
        ...state,
        allDecks: action.decks
      }
    case SET_DECK :
      return {
        ...state,
        deck: action.deck
      }
    case ADD_DECK :
      const trimtitle = action.title.replace(/ /g,'')
      const newDeck = {
        title: action.title,
        questions: []
      }
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [trimtitle]: newDeck
        },
        deck: newDeck
      }
    case ADD_CARD :
      return {
        ...state,
        card: action.card,
        deck: {
          ...state.deck,
          questions: state.deck.questions.concat(action.card)
        },
        allDecks: {
          ...state.allDecks,
          [action.title]: {
            ...state.allDecks[action.title],
            questions: state.deck.questions.concat(action.card)
          }
        }
      }
    default :
      return state
  }
}

export default decks