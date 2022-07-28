import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Button,
  Text
} from "react-native";
import { useTheme } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as commonStyles from "../../assets/styles/appStyles";
import {
  SLIDER_WIDTH,
  ITEM_WIDTH,
  CarouselCardItem,
} from "./Lists/CarouselCardItem";
import AppContext from "../context/AppContext";

export const RecomendationsScreen = () => {
  const paperTheme = useTheme();
  const { handleChangeFontSize, fontSize } = useContext(AppContext);
  const [index, setIndex] = React.useState(0);
  const { recomendations } = useContext(AppContext);
  const isCarousel = React.useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      //(setRecomendaciones);
      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    //onRefresh();
  }, []);
  useEffect(() => {
    console.log("---------------------", recomendations);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[commonStyles.colors.gradient1]}
          progressBackgroundColor={commonStyles.colors.white}
        />
      }
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Button
            title="-A"
            onPress={() => {
              handleChangeFontSize(fontSize - 1);
            }}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Button
            title="A+"
            onPress={() => {
              handleChangeFontSize(fontSize + 1);
            }}
          />
        </View>
      </View>

      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: paperTheme.colors.background },
        ]}
      >
        <Text style={{color:paperTheme.colors.text }}>tamaño {fontSize}</Text>
        <Pagination
          dotsLength={recomendations.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: paperTheme.dark
              ? commonStyles.colors.white
              : "rgba(0, 0, 0, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
        <Carousel
          layout={"default"}
          layoutCardOffset={`9`}
          ref={isCarousel}
          data={recomendations}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(ind) => setIndex(ind)}
          useScrollView={true}
          extraData={fontSize}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    alignSelf: "center",
  },
});
