import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './../screens/LoginScreen';

import DetailsScreen from '../screens/DetailsScreen'
import ProjectsScreen from "../screens/ProjectsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
