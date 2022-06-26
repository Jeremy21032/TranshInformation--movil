import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet ,RefreshControl} from "react-native";
import { useTheme } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getRecomendaciones } from "../services/RecomendacionesServices";
import * as commonStyles from '../../assets/styles/appStyles'
import {
  SLIDER_WIDTH,
  ITEM_WIDTH,
  CarouselCardItem,
} from "./Lists/CarouselCardItem";

export const RecomendationsScreen = () => {
  const paperTheme=useTheme();
  const [index, setIndex] = React.useState(0);

  // const data = [
  //   {
  //     title: "Aenean leo",
  //     body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
  //     imgUrl: "https://picsum.photos/id/11/200/300",
  //   },
  //   {
  //     title: "In turpis",
  //     body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
  //     imgUrl: "https://picsum.photos/id/10/200/300",
  //   },
  //   {
  //     title: "Lorem Ipsum",
  //     body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
  //     imgUrl: "https://picsum.photos/id/12/200/300",
  //   },
  // ];
  const isCarousel = React.useRef(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getRecomendaciones(setRecomendaciones)
      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    onRefresh();
  }, []);

  return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[commonStyles.colors.gradient1]}
          progressBackgroundColor={commonStyles.colors.white}
        />
      }>
    <SafeAreaView style={[styles.container,{backgroundColor:paperTheme.colors.background}]}>
        <Carousel
          layout="stack"
          layoutCardOffset={9}
          ref={isCarousel}
          data={recomendaciones}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(ind) => setIndex(ind)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={recomendaciones.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: paperTheme.dark?commonStyles.colors.white:"rgba(0, 0, 0, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
         
        />
    </SafeAreaView>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
});
