import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { VideosScreen } from "../screens/VideosScreen";
import { VideosDetailScreen } from "../screens/VideosDetailScreen";
import { OrganicsScreen } from "../screens/OrganicsScreen";
import { NoticesDetail } from "../screens/NoticesDetail";
import * as styles from  '../../assets/styles/appStyles'
import { Platform, TouchableOpacity, useWindowDimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const NoticesStack = createStackNavigator();
export const NoticesOrganicStackScreen = ({navigation}) => (
  <NoticesStack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: styles.colors.darkCyan },
    headerTintColor: styles.colors.cultured,
    drawerType: useWindowDimensions().width >= 768 ? "permanent" : "back",
    drawerStyle: useWindowDimensions().width >= 768 ? null : { width: "75%" },
    overlayColor: "transparent",
    headerTitle:'NOTICIAS'
  }}
  >
    <NoticesStack.Screen name="NOTICIAS" component={OrganicsScreen} options={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              size={28}
              style={{marginHorizontal: 15}}
              color="white"
            />
          </TouchableOpacity>
        ),
      }}/>
    <NoticesStack.Screen name="ORGANICSDETAIL" component={NoticesDetail} />
  </NoticesStack.Navigator>
);
