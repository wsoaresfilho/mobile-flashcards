import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

const emptyCard = {
  question: '',
  answer: ''
}

class NewCard extends Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
  
  state = {
    canSubmit: false,
    card: emptyCard
  }
  componentDidMount() {
    this.setState({card: emptyCard})
  }
  clear = () => {
    this.setState({canSubmit:false, card: emptyCard})
  }
  onSubmit = () => {
    const card = this.state.card
    const title = this.props.navigation.state.params.title
    console.log("on submit NewCard")
    console.log(title)
    console.log(card)
    addCardToDeck(title, card).then(
      () => {
        console.log(`Before addCard = ${card}`)
        this.props.addNewCard(card)
        this.props.goBack()
      },
      (erro) => {
        console.log("failed at Decks.js!")
        console.log(erro)
      }
    ).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
      throw error
    })
    console.log("Fim de componentDidMount NewCard.js")
    this.clear()
  }
  onChangeQuestionText = (text) => {
    if(text.length > 0 && this.state.card.answer.length > 0) {
      this.setState({ canSubmit: true })
    } else {
      this.setState({ canSubmit: false })
    }
    this.setState({
      card: {
        ...this.state.card,
        question: text
      }
    })
  }
  onChangeAnswerText = (text) => {
    const { card } = this.state
    if(text.length > 0 && card.question.length > 0) {
      this.setState({ canSubmit: true })
    } else {
      this.setState({ canSubmit: false })
    }
    this.setState({
      card: {
        ...card,
        answer: text
      }
    })
  }
  render() {
    const { canSubmit, card } = this.state
    return(
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <TextInput
            style={styles.input}
            placeholder='Question'
            selectionColor='gray'
            underlineColorAndroid='gray'
            onChangeText={this.onChangeQuestionText}
            value={card.question}
          />
          <TextInput
            style={styles.input}
            placeholder='Answer'
            selectionColor='gray'
            underlineColorAndroid='gray'
            onChangeText={this.onChangeAnswerText}
            value={card.answer}
          />

          <TouchableOpacity
            style={[styles.button, !canSubmit && styles.disabled]}
            onPress={this.onSubmit}
            disabled={!canSubmit}
          >
            <Text style={[styles.textBtn, !canSubmit && {textDecorationLine: 'line-through'}]}>Submit</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addNewCard: (card) => dispatch(addCard(navigation.state.params.title, card)),
    goBack: () => navigation.goBack(),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 10
  },
  input: {
    height: 50,
    borderColor: black, 
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    paddingTop: 15,
    paddingBottom: 20,
    marginBottom: 60,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 10,
    backgroundColor: black
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 24, 
    color: white
  },
  text: {
    textAlign: 'center',
    fontSize:30,
    marginBottom: 20
  }
})

export default connect(
  null,
  mapDispatchToProps
)(NewCard)