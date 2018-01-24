import React, { Component } from 'react'
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'
import { black, gray } from '../utils/colors'
import { getDecks } from '../utils/api'

export default class Decks extends Component {
  state = {
    decks: []
  }
  componentDidMount() {
    console.log("Antes")
    getDecks().then(
      function (decks) {
        console.log("component")
        console.log(decks)
        this.setState({ decks })
      }.bind(this),
      function(erro) {
        console.log("falhou")
        console.log(erro)
      }
    ).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
    });
    console.log("depois")
  }
  
  render() {
    const { decks } = this.state

    return(
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({item}) => 
            <View style={styles.item}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.navigate(
                'SingleDeck',
                { item: item }
              )}>
                <Text style={[styles.text, {fontSize:30}]}>{item.title}</Text>
                <Text style={[styles.text, styles.littletext]}>
                  {item.questions.length} 
                  <Text>
                    {item.questions.length>1 ? ' cards' : ' card' }
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomColor:black,
    borderStyle:'solid',
    borderBottomWidth:1
  },
  text: {
    textAlign: 'center'
  },
  littletext: {
    color: gray,
    fontSize: 20
  }
})