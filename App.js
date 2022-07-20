import React from "react";
import { LogBox } from "react-native";
import { AppStates } from "./app/context/AppStates";
import AppIndex from "./AppIndex";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <AppStates>
      <AppIndex />
    </AppStates>
  );
};

export default App;
