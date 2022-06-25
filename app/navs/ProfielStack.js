import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EditProfile } from "../screens/EditProfile";
import { EditProfileSecond } from "../screens/EditProfileSecond";


const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
>
    <ProfileStack.Screen name="PROFILE" component={EditProfile} />
    <ProfileStack.Screen name="EDITPROFILE" component={EditProfileSecond} />
  </ProfileStack.Navigator>
);

const styles = StyleSheet.create({});
