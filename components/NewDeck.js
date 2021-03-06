import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView,
  Keyboard 
} from 'react-native'
import { black, white, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

initialState = {
  canSubmit: false,
  deckTitle: ''
}

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  clear = () => {
    this.setState({canSubmit:false, deckTitle: ''})
  }
  goToDeck = (name) => {
    this.props.navigation.navigate('SingleDeck', { title: name })
  }
  onSubmit = () => {
    const name = this.state.deckTitle
    saveDeckTitle(name).then(
      () => {
        this.props.addNewDeck(name)
        this.goToDeck(name)
        Keyboard.dismiss()
      },
      (erro) => {
        console.log(`failed at saveDeckTitle on Decks.js! Erro: ${erro}`)
      }
    ).catch((error) => {
      console.log('There has been a problem with saveDeckTitle operation: ' + error.message)
      throw error
    })
    this.clear()
  }
  onChangeText = (text) => {
    if(text.length > 0) {
      this.setState({ canSubmit: true })
    } else {
      this.setState({ canSubmit: false })
    }
    this.setState({deckTitle: text})
  }
  render() {
    const { canSubmit } = this.state
    return(
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <Text style={styles.text}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder='Deck Title'
            selectionColor='gray'
            underlineColorAndroid='gray'
            onChangeText={this.onChangeText}
            value={this.state.deckTitle}
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

function mapDispatchToProps(dispatch) {
  return {
    addNewDeck: (title) => dispatch(addDeck(title))
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
    marginBottom: 50,
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
)(NewDeck)