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
import { fetchAllDecks, setDeck } from '../actions'

class Decks extends Component {
  componentDidMount() {
    getDecks().then(
      (decks) => {
        decks = (decks === undefined || decks === null) ? {} : decks
        this.props.loadDecks(decks)
      },
      (erro) => {
        console.log(`Failed at getDecks on Decks.js! Erro: ${erro}`)
      }
    ).catch((error) =>  {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
    })
  }
  
  render() {
    const { decks, setDeckItem } = this.props

    return(
      <View style={styles.container}>
        {decks.length <= 0 && 
          <Text style={[styles.text, {fontSize:26}]}>There are no decks yet!</Text>
        }

        {decks.length > 0 &&
          <FlatList
            data={decks}
            renderItem={({item}) => 
              <View style={styles.item}>
                <TouchableOpacity 
                  onPress={() => {
                    setDeckItem(item)
                    this.props.navigation.navigate(
                      'SingleDeck',
                      { title: item.title }
                    )
                  }
                }>
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
        }
      </View>
    )
  }
}

function mapStateToProps (decks) {
  const decksArray = Object.values(decks.allDecks)
  return {
    decks: decksArray
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDecks: (decks) => dispatch(fetchAllDecks(decks)),
    setDeckItem: (deck) => dispatch(setDeck(deck))
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