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
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    canSubmit: false,
    deckTitle: ''
  }
  componentDidMount() {
    this.setState({deckTitle: ''})
  }
  clear = () => {
    this.setState({canSubmit:false, deckTitle: ''})
  }
  toHome = () => {
    this.props.navigation.navigate('Decks')
  }
  onSubmit = () => {
    const name = this.state.deckTitle
    saveDeckTitle(name).then(
      () => {
        console.log(`Before addDeck = ${name}`)
        this.props.addNewDeck(name)
        this.toHome()
      },
      (erro) => {
        console.log("failed at Decks.js!")
        console.log(erro)
      }
    ).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
      throw error
    })
    console.log("Fim de componentDidMount NewDecks.js")
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

function mapStateToProps (decks) {
  console.log("mapStateToProps")
  console.log(decks)
  return {
    decks: decks.allDecks
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
  mapStateToProps,
  mapDispatchToProps
)(NewDeck)