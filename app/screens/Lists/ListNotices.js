import React from "react";
import {  Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


export const ListNotices = ({ infoNotices }) => {
  const navigation = useNavigation();
  return (
    <Card onPress={() => {
      console.log("VALOR:" + infoNotices.title);
      navigation.navigate("ORGANICSDETAIL", { items: infoNotices });
    }}>
      <Card.Title title={infoNotices.title} />
      <Card.Cover source={{ uri: infoNotices.noticiaPic }} />
      <Card.Content>
        <Paragraph>Autor: {infoNotices.author}</Paragraph>
      </Card.Content>
    </Card>
  );
};
