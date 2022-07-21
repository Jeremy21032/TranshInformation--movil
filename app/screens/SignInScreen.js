import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as styles from "../../assets/styles/appStyles";
import {
  validateCorrectEmail,
  validateCorrectPassword,
} from "../services/Validate";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoError } from "../components/ModalInfoError";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AppContext from "../context/AppContext";
export const SignInScreen = ({ navigation }) => {
  const { signInUser } = useContext(AppContext);
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
    let passwordValidator = validateCorrectPassword(val);
    if (passwordValidator && val.trim().length >= 6) {
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
  const singIn = async (mail) => {
    setIsLoading(true);
    console.log(mail);
    console.log("ENTRA A AUT");
    try {
      await signInUser(data.email, data.password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setText("Correo electrónico incorrecto.");
      setModalVisibleError(true);
    }
  };
  return (
    <View style={styles.commons.signContainer}>
      <StatusBar
        backgroundColor={styles.colors.darkCyan}
        barStyle="light-content"
      />
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Bienvenido</Text>
      </View>
      <Animatable.View style={styles.commons.footer} animation="fadeInUpBig">
        {/* A email input field. */}
        <Text style={styles.commons.text_footer}>Correo Electrónico</Text>
        <View style={styles.commons.action}>
          <FontAwesome name="user-o" color={styles.colors.darkBlue} size={20} />
          <TextInput
            placeholder="Tu correo electrónico"
            style={[
              styles.commons.textInput,
              { color: styles.colors.darkBlue },
            ]}
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
              El correo debe tener el formato correcto
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
          Contraseña
        </Text>

        <View style={styles.commons.action}>
          <Feather name="lock" color={styles.colors.darkBlue} size={20} />
          <TextInput
            placeholder="Tu Contraseña"
            style={[
              styles.commons.textInput,
              { color: styles.colors.darkBlue },
            ]}
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
              La contraseña debe tener al menos 1 numero, mínimo 6 caracteres y
              1 símbolo obligatorio.{"\n"}
              Los simbolos obligatorios son !$%&?@*
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
              colors={[styles.colors.gradient2, styles.colors.gradient1]}
              style={styles.commons.signIn}
            >
              <Text
                style={[
                  styles.commons.textSign,
                  { color: styles.colors.white },
                ]}
              >
                Iniciar sesión
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
              Registrarse
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
            Olvidaste tu contraseña?
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
