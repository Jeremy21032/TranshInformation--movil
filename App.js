import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from './app/screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from './app/screens/HomeScreen';
import { VideosScreen } from './app/screens/VideosScreen';
import { BadgesScreen } from './app/screens/BadgesScreen';
import { NoticesScreen } from './app/screens/NoticesScreen';
import { MapScreen } from './app/screens/MapScreen';
import { ProfileScreen } from './app/screens/ProfileScreen';
import { SuggestionsScreen } from './app/screens/SuggestionsScreen';
import { loadFirebaseConfiguration } from './app/util/FirebaseConfiguration';
import React from 'react';
import { RootStackScreen } from './app/navs/RootStackScreen';
const Drawer = createDrawerNavigator();
function LoginNav() {

}
function RootNav() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HOME" component={HomeScreen} />
      <Drawer.Screen name="PROFILE" component={ProfileScreen} />
      <Drawer.Screen name="MAP" component={MapScreen} />
      <Drawer.Screen name="NOTICES" component={NoticesScreen} />
      <Drawer.Screen name="VIDEOS" component={VideosScreen} />
      <Drawer.Screen name="BADGES" component={BadgesScreen} />
      <Drawer.Screen name="SUGGESTIONS" component={SuggestionsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [login, setLogin] = React.useState(false);
  loadFirebaseConfiguration();




  return (
    <NavigationContainer>
      {/* <RootNav /> */}
      <RootStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
