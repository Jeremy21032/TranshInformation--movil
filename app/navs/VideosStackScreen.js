import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { VideosScreen } from "../screens/VideosScreen";
import { VideosDetailScreen } from "../screens/VideosDetailScreen";

const VideosStack = createStackNavigator();
export const VideoStackScreen = () => (
  <VideosStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <VideosStack.Screen name="VIDEOSSCREEN" component={VideosScreen} />
    <VideosStack.Screen name="VIDEOSDETAIL" component={VideosDetailScreen} />
  </VideosStack.Navigator>
);
