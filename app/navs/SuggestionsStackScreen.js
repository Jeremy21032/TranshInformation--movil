import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SuggestionsScreen } from "../screens/SuggestionsScreen";
import { SuggestionEditScreen } from "../screens/SuggestionEditScreen";

const SuggestionStack = createStackNavigator();
export const SuggestionsStackScreen = () => (
  <SuggestionStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <SuggestionStack.Screen name="SUGERENCIAS" component={SuggestionsScreen} />
    <SuggestionStack.Screen name="EDITARSUGERENCIAS" component={SuggestionEditScreen} />
  </SuggestionStack.Navigator>
);
