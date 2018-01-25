import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'FlashcardsApp'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY).then(formatDecksResults).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 })
}

function formatDecksResults (results) {
  console.log("Called the formatDecksResults func of API")
  return results === null
    ? setDummyData()
    : returnDecksArrays(JSON.parse(results))
}

function setDummyData () {
  const mock = {
    ReactJS: {
      title: 'ReactJS',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mock))
  console.log("setDummyData from API")
  console.log(mock)
  return Object.values(mock)
}

function returnDecksArrays (decks) {
  console.log("Called the returnDecksArrays func of API")
  console.log(decks)
  return Object.values(decks)
}

export function getDeck (id) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(function(results) {
      results = JSON.parse(results)
      const deck = results !== null ? results[id] : {}
      return deck
    })
}

export function saveDeckTitle (title) {
  console.log("Called the saveDeckTitle func from API")
  console.log(title)
  const trimtitle = title.replace(/ /g,'')
  console.log(trimtitle)
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [trimtitle]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      questions: [card]
    }
  }))
}
