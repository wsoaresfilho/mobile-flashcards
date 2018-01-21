import React, { Component } from 'react'
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'
import { black, gray } from '../utils/colors'
import Mock from '../utils/api'

const mock = Object.values(Mock())

export default class Decks extends Component {
  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={mock}
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