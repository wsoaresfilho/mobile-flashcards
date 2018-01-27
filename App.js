import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { yellow, white, black, darkyellow } from './utils/colors'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import SingleDeck from './components/SingleDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/notification'

function MainStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    pressColor: darkyellow,
    tabStyle: {
      backgroundColor: white
    },
    labelStyle: {
      fontWeight: 'bold',
      color: black,
      fontSize: 15
    },
    indicatorStyle: {
      borderWidth: 2,
      borderColor: yellow
    },
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const navStyle = {
  headerTintColor: yellow,
  headerStyle: {
    backgroundColor: black,
    height: 56
  }
}

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  SingleDeck: {
    screen: SingleDeck,
    navigationOptions: navStyle
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: navStyle
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: navStyle
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainStatusBar backgroundColor={yellow} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}