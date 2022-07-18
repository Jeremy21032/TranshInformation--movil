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
} from "react-native";
import React, { useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import * as commonStyles from "../../assets/styles/appStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Video from "react-native-video";
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
  const onFetch = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a3b256c7f0msh1056e487e10ece1p1e0f51jsna3e9c5228ad3",
        "X-RapidAPI-Host": "youtube-videos.p.rapidapi.com",
      },
    };

    fetch(
      "https://youtube-videos.p.rapidapi.com/mp4?videoId=" +
        route.params.items.urlID,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
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
              onFullScreenChange={setOrientation}
              volume={state.muted ? 0 : 100}
            />
          </View>

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
          </View>
          <View>
            <Text style={{ color: paperTheme.colors.text }}>
              {route.params.items.title}
            </Text>
            <Button onPress={onShare} title="Share" />
          </View>
          <View>
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
  button: {
    margin: 10,
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
});
