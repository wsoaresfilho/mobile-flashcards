import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { 
  clearLocalNotification,
  setLocalNotification
} from '../utils/notification'

class SingleDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: title
    }
  }

  startQuiz = () => {
    clearLocalNotification().then(setLocalNotification)
    this.props.navigation.navigate('Quiz')
  }

  render() {
    const { deck, title } = this.props

    return(
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={[styles.text, {fontSize:30}]}>{deck && deck.title}</Text>
          <Text style={[styles.text, styles.littletext]}>
            {deck && deck.questions.length} 
            <Text>
              {deck && deck.questions.length>1 ? ' cards' : ' card' }
            </Text>
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: white}]}
            onPress={() => {
              this.props.navigation.navigate(
                'NewCard',
                {title: title}
              )}
            }
          >
            <Text style={[styles.btn, styles.btn1]}>Add Card</Text>
          </TouchableOpacity>

          {deck.questions.length > 0 &&
            <TouchableOpacity 
              style={[styles.button, {backgroundColor: black}]}
              onPress={this.startQuiz}
            >
              <Text style={[styles.btn, styles.btn2]}>Start Quiz</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
      
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  return {
    deck: decks.deck,
    title: navigation.state.params.title.replace(/ /g,'')
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
    justifyContent:'center'
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
    borderColor: black,
    borderStyle:'solid',
    borderWidth:2,
    justifyContent: 'center',
    borderRadius: 10
  },
  btn: {
    textAlign: 'center',
    fontSize: 24
  },
  btn1: {
    color: black
  },
  btn2: {
    color: white
  },
  text: {
    textAlign: 'center'
  },
  littletext: {
    color: gray,
    fontSize: 20
  }
})

export default connect(
  mapStateToProps
)(SingleDeck)