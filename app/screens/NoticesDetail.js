import { WebView } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

export const NoticesDetail = ({ route }) => {
  const paperTheme = useTheme();
  const [notice, setNotice] = useState({
    title: "",
    url: "https://www.google.com",
  });
  useEffect(() => {
    setNotice({
      title: route.params.items.title,
      url: route.params.items.url,
    });
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 1 , backgroundColor:'red'}}>
        <WebView source={{ uri: notice.url}} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({});
