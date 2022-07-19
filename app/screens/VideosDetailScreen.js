import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Share,
  Button,
  Image,
} from "react-native";
import React, { useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { Avatar, useTheme } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import * as commonStyles from "../../assets/styles/appStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

export const VideosDetailScreen = ({ route, navigation }) => {
  const paperTheme = useTheme();

  const [videoSource, setVideoSource] = React.useState(null);
  const [setPlaying] = React.useState(false);
  if (route != null && route.params != null && route.params.items != null) {
    console.log("params" + route.params.items);
  }
  React.useEffect(() => {
    setVideoSource(route.params.items);
  }, []);
  const [state, setState] = React.useState({
    muted: false,
    fullScreen: false,
    shouldPlay: true,
  });
  const handlePlayAndPause = () => {
    setState({
      ...state,
      shouldPlay: !state.shouldPlay,
    });
  };

  const handleVolume = () => {
    setState({
      ...state,
      muted: !state.muted,
    });
  };
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Mira este video: \n" +
          "*" +
          route.params.items.title +
          "*" +
          "\n" +
          route.params.items.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Compartido");
        } else {
          Alert.alert("No compartido");
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("No compartido x1");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!", "asdas", [
        {
          text: "OK",
          onPress: () => {
            setOrientation();
          },
        },
      ]);
    }
  }, []);

  return (
    <ScrollView>
      {videoSource == null ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={{
              height: Dimensions.get("window").height / 2.5,
              justifyContent: "center",
            }}
          >
            <YoutubePlayer
              height={250}
              play={state.shouldPlay}
              videoId={videoSource.urlID}
              onChangeState={onStateChange}
              forceAndroidAutoplay={true}
              
              volume={state.muted ? 0 : 100}
            />
          </View>
{/* 
          <View style={styles.controlBar}>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                handlePlayAndPause();
              }}
            >
              <Text style={styles.controlButton}>
                {state.shouldPlay ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                handleVolume();
              }}
            >
              <Text style={styles.controlButton}>
                {state.muted ? "Unmute" : "Mute"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                setOrientation();
              }}
            >
              <Text style={styles.controlButton}>
                {state.fullScreen ? "Exit full screen" : "Go full screen"}
              </Text>
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              maxWidth: Dimensions.get("window").width,
              paddingVertical: 5,
            }}
          >
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Avatar.Image
                source={{ uri: route.params.items.prevImg }}
                style={{
                  alignSelf: "center",
                  marginHorizontal: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignSelf: "center",
                maxWidth: Dimensions.get("window").width / 1.3,
              }}
            >
              <Text
                style={{
                  color: paperTheme.colors.text,
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "justify",
                }}
              >
                {route.params.items.title}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.button}>
              <TouchableOpacity onPress={onShare}>
                <LinearGradient
                  colors={[
                    commonStyles.colors.gradient2,
                    commonStyles.colors.gradient1,
                  ]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Compartir</Text>
                  <MaterialIcons name="share" color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    minHeight: Dimensions.get("window").height / 2.5,
    alignSelf: "stretch",
    backgroundColor: "transparent",
  },
  controlBar: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controlButton: {
    margin: 10,
    fontSize: 15,
    color: "white",
  },
  WebViewContainer: {
    height: Dimensions.get("window").height / 2,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
