import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  Animated
} from 'react-native'
import { black, gray } from '../utils/colors'
import { getDecks } from '../utils/api'
import { fetchAllDecks, setDeck } from '../actions'

class Decks extends Component {
  state = {
    fontSize: new Animated.Value(30)
  }

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

  goToDeck = (item) => {
    const { fontSize } = this.state
    fontSize.setValue(30)
    Animated.timing(
      fontSize,
      {
        toValue: 40,
        duration: 200
      }
    ).start(() => {
      Animated.timing(
        fontSize,
        {
          toValue: 30,
          duration: 200
        }
      ).start(() => this.props.navigation.navigate(
        'SingleDeck',
        { title: item.title }
      ))
    })
  }
  
  render() {
    const { decks } = this.props
    const { fontSize } = this.state

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
                      this.props.setDeckItem(item)
                      this.goToDeck(item)
                    }
                  }
                >
                  <Animated.Text style={[styles.bigtext, {fontSize}]}>{item.title}</Animated.Text>
                  <Text style={styles.littletext}>
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
  bigtext: {
    textAlign: 'center'
  },
  littletext: {
    textAlign: 'center',
    color: gray,
    fontSize: 20
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks)