import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white, red, green, blue, lightgray, gray } from '../utils/colors'

initialState = {
  activeCard: 0,
  isAnswer: false,
  numOfHits: 0
}

class Quiz extends Component {
  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  turnCard = () => {
    this.setState((prevState) => ({
      isAnswer: !prevState.isAnswer
    }))
  }
  pushedGreenBtn = () => {
    this.setState((prevState) => ({
      numOfHits: prevState.numOfHits+1,
      activeCard: prevState.activeCard+1,
      isAnswer: !prevState.isAnswer
    }))
  }
  moveNext = () => {
    this.setState((prevState) => ({
      activeCard: prevState.activeCard+1,
      isAnswer: !prevState.isAnswer
    }))
  }
  restartQuiz = () => {
    this.setState(initialState)
  }
  render() {
    const { questions } = this.props
    const { activeCard, isAnswer, numOfHits } = this.state

    return(
      <View style={styles.container}>
        {activeCard < questions.length &&
          <View style={styles.container}>
            <View>
              <Text style={styles.counter}>{activeCard+1} / {questions.length}</Text>
            </View>
            <View style={styles.main}>
              <Text style={styles.question}>
                {isAnswer ? questions[activeCard].answer : questions[activeCard].question}
              </Text>
              <TouchableOpacity 
                style={[styles.button]}
                onPress={this.turnCard}
              >
                <Text style={[styles.turnBtn, styles.text]}>{!isAnswer ? 'Answer' : 'Question'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              {isAnswer &&
                <View>
                  <TouchableOpacity 
                    style={[styles.button, {backgroundColor: green}]}
                    onPress={this.pushedGreenBtn}
                  >
                    <Text style={[styles.btn]}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, {backgroundColor: red}]}
                    onPress={this.moveNext}
                  >
                    <Text style={[styles.btn]}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        }
        {activeCard >= questions.length && 
          <View style={styles.container}>
            <View style={styles.main}>
              <Text style={styles.question}>End of Quiz!</Text>
              <Text style={styles.question}>Right answers: {numOfHits}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: blue}]}
                onPress={this.restartQuiz}
              >
                <Text style={[styles.btn]}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: black}]}
                onPress={this.props.goBack}
              >
                <Text style={[styles.btn]}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    deck: decks.deck,
    questions: decks.deck.questions
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8
  },
  main: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center'
  },
  top: {
    flex: 1,
    alignItems:'flex-start',
    
  },
  counter: {
    fontSize: 20
  },
  question: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20
  },
  buttons:{
    flex:1,
    justifyContent: 'flex-end'
  },
  button: {
    paddingTop: 15,
    paddingBottom: 20,
    marginBottom: 15,
    marginRight: 30,
    marginLeft: 30,
    justifyContent: 'center',
    borderRadius: 10
  },
  btn: {
    textAlign: 'center',
    fontSize: 24,
    color: white
  },
  turnBtn: {
    color: red,
    fontSize: 20,
    backgroundColor: lightgray,
    paddingTop: 8,
    paddingBottom: 12,
    borderRadius: 10
  },
  text: {
    textAlign: 'center'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)