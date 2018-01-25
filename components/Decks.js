import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'
import { black, gray } from '../utils/colors'
import { getDecks } from '../utils/api'
import { getAllDecks } from '../actions'

class Decks extends Component {
  componentDidMount() {
    console.log("Começo de componentDidMount Decks.js")
    getDecks().then(
      (decks) => {
        console.log("Called getDecks at Decks.js")
        console.log(decks)
        this.props.loadDecks(decks)
      },
      (erro) => {
        console.log("failed at Decks.js!")
        console.log(erro)
      }
    ).catch((error) =>  {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
    })
    console.log("Fim de componentDidMount Decks.js")
  }
  
  render() {
    const { decks } = this.props

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

function mapStateToProps (decks) {
  console.log("mapStateToProps")
  console.log(decks)
  return {
    decks: decks.allDecks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDecks: (decks) => dispatch(getAllDecks(decks))
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks)