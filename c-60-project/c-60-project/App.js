import * as React from 'react';
import { View } from 'react-native';
import Register from './screens/Register';
import Class from './screens/Class';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppContainer/>
      </View>
    );
  }
}


var AppNavigator = createSwitchNavigator({ 
  Register : Register,
  Class : Class
})

const AppContainer = createAppContainer(AppNavigator)
