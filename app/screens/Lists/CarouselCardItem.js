import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const CarouselCardItem = ({ item, index , props}) => { 
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.urlImage }} style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.header}>font S{}</Text>
      <Text style={styles.body}>
        {item.content}
      </Text>
      {console.log(props)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingBottom: 10,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "justify",
  },
});
