import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as styles from "../../assets/styles/appStyles";
import { validateCorrectEmail } from "../services/Validate";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoError } from "../components/ModalInfoError";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const SignInScreen = ({ navigation }) => {
  const [modalVisibleError, setModalVisibleError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");

  let component = (
    <LoadingOverlay
      isVisible={isLoading}
      setIsLoading={setIsLoading}
      setModalVisibleError={setModalVisibleError}
      setMessageError={setMessageError}
    />
  );

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isvalidEmail: true,
    isvalidPassword: true,
  });
  const textInputChange = (val) => {
    let validator = validateCorrectEmail(val);
    if (validator && val.trim().length >= 6) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isvalidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isvalidEmail: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isvalidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isvalidPassword: false,
      });
    }
  };
  const updateSecureTextInput = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const auth = getAuth();
  const singIn = async (mail) => {
    setIsLoading(true);
    console.log(mail);
    console.log("ENTRA A AUT");
    try {
      handleSignIn();
    } catch (error) {
      setIsLoading(false);
      setText("Correo electrónico incorrecto.");
      setModalVisibleError(true);
    }
  };
  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("Sign in!");
        setIsLoading(false);
        setModalVisibleError(false);
      })
      .catch((error) => {
        setIsLoading(false);

        const errorCode = error.code;
        const errorMessage = error.message;
        setModalVisibleError(true);
        setMessageError("Constraseña incorrecta.");
        console.log("Error>>>>: ", (errorCode, errorMessage));
      });
  };
  return (
    <View style={styles.commons.signContainer}>
      <StatusBar
        backgroundColor={styles.colors.darkCyan}
        barStyle="light-content"
      />
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Welcome</Text>
      </View>
      <Animatable.View style={styles.commons.footer} animation="fadeInUpBig">
        {/* A email input field. */}
        <Text style={styles.commons.text_footer}>Email</Text>
        <View style={styles.commons.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.commons.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : (
            <></>
          )}
        </View>
        {data.isvalidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.commons.errorMsg}>
              Email must have the correct format
            </Text>
          </Animatable.View>
        )}

        {/* A password input field. */}
        <Text
          style={[
            styles.commons.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>

        <View style={styles.commons.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.commons.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={() => {
              updateSecureTextInput();
            }}
          >
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {data.isvalidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.commons.errorMsg}>
              Password must be at least 6 characters
            </Text>
          </Animatable.View>
        )}
        {/* A button. */}

        <View style={styles.commons.button}>
          <TouchableOpacity
            style={styles.commons.signIn}
            onPress={() => {
              if (
                data.email != null &&
                data.password != null &&
                data.password != "" &&
                data.email != ""
              ) {
                let validator = validateCorrectEmail(data.email);
                if (validator) {
                  singIn(data.email);
                } else {
                  setModalVisibleError(true);
                  setMessageError(
                    "El correo No consta con el formato correcto"
                  );
                }
              } else {
                setModalVisibleError(true);
                setMessageError("Verifique las credenciales de acceso");
              }
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.commons.signIn}
            >
              <Text style={[styles.commons.textSign, { color: "#fff" }]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SIGNUP")}
            style={[
              styles.commons.signIn,
              {
                borderColor: styles.colors.darkCyan,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.commons.textSign,
                { color: styles.colors.darkCyan },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FORGOT")}
          style={{ alignSelf: "center", marginVertical: 20 }}
        >
          <Text
            style={[styles.commons.textSign, { color: styles.colors.darkCyan }]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        {isLoading ? component : <View></View>}
        <ModalInfoError
          modalVisible={modalVisibleError}
          setModalVisible={setModalVisibleError}
          message={messageError}
        ></ModalInfoError>
      </Animatable.View>
    </View>
  );
};
