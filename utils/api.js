import { AsyncStorage, processColor } from 'react-native'

const STORAGE_KEY = 'FlashcardsApp'

export function clearStorage () {
  return AsyncStorage.removeItem(STORAGE_KEY).then(() => {console.log("clearStorage")})
}

export function getDecks () {
  const promise = AsyncStorage.getItem(STORAGE_KEY).then(formatDecksResults).catch((error)=>{
    console.log(`Api call error: ${error.message}`)
  })
  return promise
  //return clearStorage()
}

function formatDecksResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
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
  return mock
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
  const trimtitle = title.replace(/ /g,'')
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [trimtitle]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  const promise = AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    const obj = JSON.parse(result)
    const questions = obj[title].questions
    const savedTitle = obj[title].title
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: {
        title: savedTitle,
        questions: questions.concat(card)
      }
    }))
  })
  return promise
}
