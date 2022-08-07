import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
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
import { LinearGradient } from "expo-linear-gradient";

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
  useEffect(() => {}, []);

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
      <View
        style={{
          flexDirection: "row-reverse",
          marginLeft: 40,
          marginVertical: 10,
        }}
      >
        <View style={styles.internalButton}>
          <TouchableOpacity
            onPress={() => {
              handleChangeFontSize(fontSize - 1);
            }}
          >
            <LinearGradient
              colors={[
                commonStyles.colors.gradient2,
                commonStyles.colors.gradient1,
              ]}
              style={styles.buttonChange}
            >
              <Text style={{ color: paperTheme.colors.text }}>-A</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.internalButton}>
          <TouchableOpacity
            onPress={() => {
              handleChangeFontSize(fontSize + 1);
            }}
          >
            <LinearGradient
              colors={[
                commonStyles.colors.gradient2,
                commonStyles.colors.gradient1,
              ]}
              style={styles.buttonChange}
            >
              <Text style={{ color: paperTheme.colors.text }}>A+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: paperTheme.colors.background },
        ]}
      >
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
          renderItem={({ item, index }) => (
            <View style={styles.containerCard} key={index}>
              <Image source={{ uri: item.urlImage }} style={styles.image} />
              <Text style={styles.header}>{item.title}</Text>
              <Text style={[styles.body, { fontSize: fontSize }]}>
                {item.content}
              </Text>
            </View>
          )}
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
  internalButton: { flexDirection: "column", marginLeft: 20 },
  buttonChange: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  containerCard: {
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
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "justify",
  },
});
