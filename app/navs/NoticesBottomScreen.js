import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CovidScreen } from '../screens/CovidScreen';
import { EnviromentScreen } from '../screens/EnviromentScreen';
import { RecicleScreen } from '../screens/RecicleScreen';
import { OrganicsScreen } from '../screens/OrganicsScreen';
import * as styles from '../../assets/styles/appStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
const NoticeBottom = createBottomTabNavigator();
const NoticesStack = createStackNavigator();

const NoticesBottomScreen = () => {
    const paperTheme = useTheme();
    const NoticesNav = () => {
        <NoticesStack.Navigator>
            {/* <NoticesStack.Screen name="" component={}/> */}
        </NoticesStack.Navigator>
    }
    return (
        <NoticeBottom.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: styles.colors.darkCyan,
                },
                tabBarActiveTintColor: styles.colors.white,
                headerShown: false
            }}>
            <NoticeBottom.Screen name="ORGANIC" component={OrganicsScreen}
                options={{
                    tabBarLabel: 'ORGÁNICOS',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="envira" color={color} size={size} />
                    ),
                }} />
            <NoticeBottom.Screen name="RECICLE" component={RecicleScreen}
                options={{
                    tabBarLabel: 'RECICLAJE',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="recycle" color={color} size={size} />
                    ),
                }}
            />
            <NoticeBottom.Screen name="COVID" component={CovidScreen}
                options={{
                    tabBarLabel: 'COVID-19',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="virus" color={color} size={size} />
                    ),
                }}
            />
            <NoticeBottom.Screen name="ENVIROMENT" component={EnviromentScreen}
                options={{
                    tabBarLabel: 'MEDIO AMBIENTE',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-earth" color={color} size={size} />
                    ),

                }} />
        </NoticeBottom.Navigator>
    )
}

export default NoticesBottomScreen

