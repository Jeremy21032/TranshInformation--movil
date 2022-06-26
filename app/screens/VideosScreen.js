import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { ListVideos } from "./Lists/ListVideos";
import { getVideos } from "../services/VideoServices";
import * as styles from "../../assets/styles/appStyles";

export const VideosScreen = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      async function fillVideos() {
        let videosN = await getVideos();
        setVideos(videosN);
      }
      fillVideos();
      setRefreshing(false);
    });
  }, []);

  const [videos, setVideos] = React.useState(null);
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
          data={videos}
          numColumns={1}
          renderItem={({ item, index }) => {
            return <ListVideos infoVideos={item} index={index} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </ScrollView>
    </View>
  );
};
