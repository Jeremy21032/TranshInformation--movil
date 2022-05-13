import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../screens/HomeScreen';
import { VideosScreen } from '../screens/VideosScreen';
import { BadgesScreen } from '../screens/BadgesScreen';
import { NoticesScreen } from '../screens/NoticesScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SuggestionsScreen } from '../screens/SuggestionsScreen';
import { DrawerContent } from '../screens/DrawerContent';
const RootDrawer = createDrawerNavigator();

export const RootDrawerScreen = ({ navigation }) => (
    <RootDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <RootDrawer.Screen name="HOME" component={HomeScreen} />
        <RootDrawer.Screen name="PROFILE" component={ProfileScreen} />
        <RootDrawer.Screen name="MAP" component={MapScreen} />
        <RootDrawer.Screen name="NOTICES" component={NoticesScreen} />
        <RootDrawer.Screen name="VIDEOS" component={VideosScreen} />
        <RootDrawer.Screen name="BADGES" component={BadgesScreen} />
        <RootDrawer.Screen name="SUGGESTIONS" component={SuggestionsScreen} />
    </RootDrawer.Navigator>
)


const styles = StyleSheet.create({})