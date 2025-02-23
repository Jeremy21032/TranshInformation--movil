import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
const { height } = Dimensions.get("screen");
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { colors } from "../../assets/styles/appStyles";
import * as commonStyles from "../../assets/styles/appStyles";
import * as json from "../../app.json";
const height_logo = height * 0.28;
export const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.darkCyan} barStyle="light-content" />

      <View style={styles.header}>
        <Animatable.Image
          animation={"bounceIn"}
          duration={1500}
          source={require("../../assets/images/logo-splash.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>
          ¡Fomentemos juntos una cultura ambiental responsable!
        </Text>
        <Text style={styles.text}>Ingresa con tus credenciales</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SIGNIN");
            }}
          >
            <LinearGradient
              colors={[
                commonStyles.colors.gradient2,
                commonStyles.colors.gradient1,
              ]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Comencemos</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: commonStyles.colors.ashGray,
            bottom: "0%",
            position: "absolute",
            alignSelf: "center",
          }}
        >
          versión {json.expo.version}
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkCyan,
  },
  header: {
    flex:1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1.2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: commonStyles.colors.darkBlue,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
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
