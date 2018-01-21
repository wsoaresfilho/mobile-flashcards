import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white, red, green } from '../utils/colors'

export default class Quiz extends Component {
  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }
  componentDidMount() {
    const { questions } = this.props.navigation.state.params
    console.log(questions)
  }
  render() {
    const { questions } = this.props.navigation.state.params

    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.counter}>{questions.length} / {questions.length}</Text>
        </View>
        <View style={styles.main}>
          {questions && questions.map((question) => (
            <Text key={question.question} style={styles.question}>{question.question}</Text>
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, {backgroundColor: green}]}>
            <Text style={[styles.btn]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: red}]}
          >
            <Text style={[styles.btn]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
    fontSize: 20,
    textAlign: 'center'
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
  text: {
    textAlign: 'center'
  }
})