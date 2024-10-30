import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CandidatesScreen from '../screens/CandidatesScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Candidate List" component={CandidatesScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
