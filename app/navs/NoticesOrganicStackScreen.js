import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { VideosScreen } from "../screens/VideosScreen";
import { VideosDetailScreen } from "../screens/VideosDetailScreen";
import { OrganicsScreen } from "../screens/OrganicsScreen";
import { NoticesDetail } from "../screens/NoticesDetail";

const NoticesStack = createStackNavigator();
export const NoticesOrganicStackScreen = () => (
  <NoticesStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NoticesStack.Screen name="NOTICIAS" component={OrganicsScreen} />
    <NoticesStack.Screen name="ORGANICSDETAIL" component={NoticesDetail} />
  </NoticesStack.Navigator>
);
