import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import {Provider as BlogProvider } from './src/context/BlogContext';

const navigator = createStackNavigator({
  // todas las pantallas de la app
  Index: IndexScreen
}, {
  // Cual es la entrada a la app
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    // el titulo que aparece en la parte superior de las pantallas
    title: 'Blogs'
  }
});
 const App = createAppContainer(navigator);

 // App es el child para BlogProvider; se accede a el a través de: children!!
export default () => {
  return (<BlogProvider><App/></BlogProvider>);
}