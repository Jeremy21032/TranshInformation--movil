import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { KnowScreen } from '../screens/KnowScreen';
import { RootDrawerScreen } from './RootDrawerScreen';

const KnowStack = createStackNavigator();

export const KnowStackScreen = ({ navigation }) => (
  <KnowStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <KnowStack.Screen name="KNOW" component={KnowScreen} />
    <KnowStack.Screen name="HOMEKN" component={RootDrawerScreen} />

  </KnowStack.Navigator>
)


const styles = StyleSheet.create({})