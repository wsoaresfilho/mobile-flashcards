import { 
  GET_ALL_DECKS, 
  GET_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

const initialState = {
  allDecks: [],
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
    case GET_DECK :
      return {
        ...state,
        deck: action.deck
      }
    case ADD_DECK :
      const trimtitle = action.title.replace(/ /g,'')
      return {
        ...state,
        allDecks: state.allDecks.concat(
          {
            title: action.title,
            questions: []
          }
        )
      }
    case ADD_CARD :
      return {
        ...state,
        card: action.card
      }
    default :
      return state
  }
}

export default decks