import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SplashScreen } from '../screens/SplashScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { SignInScreen } from '../screens/SignInScreen'
import { RootDrawerScreen } from './RootDrawerScreen'
const RootStack = createStackNavigator();

export const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <RootStack.Screen name="SPLASH" component={SplashScreen} />
    <RootStack.Screen name="SIGNIN" component={SignInScreen} />
    <RootStack.Screen name="SIGNUP" component={SignUpScreen} />
    <RootStack.Screen name="HOMEIN" component={RootDrawerScreen} />

  </RootStack.Navigator>
)


const styles = StyleSheet.create({})