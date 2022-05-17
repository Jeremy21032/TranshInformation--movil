import { StyleSheet, Text, View } from 'react-native'
import {useTheme} from '@react-navigation/native';
import React from 'react'

export const HomeScreen = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color:colors.text}}>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})