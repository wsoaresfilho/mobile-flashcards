import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white, gray } from '../utils/colors'

export default class SingleDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { item } = navigation.state.params

    return {
      title: item.title
    }
  }

  render() {
    const { navigation } = this.props
    const card = navigation.state.params.item

    return(
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={[styles.text, {fontSize:30}]}>{card && card.title}</Text>
          <Text style={[styles.text, styles.littletext]}>
            {card && card.questions.length} 
            <Text>
              {card && card.questions.length>1 ? ' cards' : ' card' }
            </Text>
          </Text>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: white}]}>
            <Text style={[styles.btn, styles.btn1]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: black}]}>
            <Text style={[styles.btn, styles.btn2]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
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