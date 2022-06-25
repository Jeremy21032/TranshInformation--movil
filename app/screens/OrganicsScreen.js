import {  FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getNotices } from "../services/NoticesService";
import { ListNotices } from "./Lists/ListNotices";
export const OrganicsScreen = () => {
  let category = "organicos";
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    getNotices(setNotices, category);
  }, []);

  return (
    <View>
      <Text>OrganicsScreen</Text>
      <ScrollView>
        <FlatList
          data={notices}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <ListNotices
                infoNotices={item}
                containerStyle={{
                  borderColor: selected ? "green" : "red",
                }}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
