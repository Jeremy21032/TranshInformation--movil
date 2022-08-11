import { FlatList, ScrollView, RefreshControl, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getNotices, getNotices2 } from "../services/NoticesService";
import { ListNotices } from "./Lists/ListNotices";
import * as styles from "../../assets/styles/appStyles";
export const OrganicsScreen = () => {
  let category = "all";
  const [notices, setNotices] = useState([]);
  const [selected] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      category != "all"
        ? getNotices(setNotices, category)
        : getNotices2(setNotices);

      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[styles.colors.gradient1]}
            progressBackgroundColor={styles.colors.white}
          />
        }
      >
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
