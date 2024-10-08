import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DishesProvider } from './Screens/DishesContext';
import HomePage from './Screens/HomePage';
import MenuPage from './Screens/MenuPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DishesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Menu" component={MenuPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </DishesProvider>
  );
};

export default App;
