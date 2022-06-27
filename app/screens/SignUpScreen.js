import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as styles from "../../assets/styles/appStyles";
import { validateEmail } from "../services/Validations";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  savePersonal,
  savePersonalRol,
} from "../services/InfoServicesPersonal";
import { ModalInfoError } from "../components/ModalInfoError";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { validateCorrectPassword } from "../services/Validate";
import { useTheme } from "react-native-paper";
export const SignUpScreen = ({ navigation }) => {
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
  const paperTheme = useTheme();

  const auth = getAuth();
  const [data, setData] = React.useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    check_nameInputChange: false,
    check_lastnameInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isvalidName: true,
    isvalidLastName: true,
    isvalidEmail: true,
    isvalidPassword: true,
    isEqualsPassword: true,
  });
  const nameInputChange = (val) => {
    if (val.length != 0 && val.length >= 3) {
      setData({
        ...data,
        name: val,
        check_nameInputChange: true,
        isvalidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_nameInputChange: false,
        isvalidName: false,
      });
    }
  };
  const lastnameInputChange = (val) => {
    if (val.length != 0 && val.length >= 4) {
      setData({
        ...data,
        lastName: val,
        check_lastnameInputChange: true,
        isvalidLastName: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        check_lastnameInputChange: false,
        isvalidLastName: false,
      });
    }
  };
  const textInputChange = (val) => {
    let validator = validateEmail(val);

    if (validator.Result && val.trim().length >= 6) {
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
  const handleConfirmPasswordChange = (val) => {
    if (val === data.password) {
      setData({
        ...data,
        confirmPassword: val,
        isEqualsPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isEqualsPassword: false,
      });
    }
  };
  const updateSecureTextInput = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextInput = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const handleCreateAccount = async () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        console.log("Account created successfully");
        savePersonal();
        const user = userCredential.user;
        console.log("user created successfully", user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const validate = async () => {
    setIsLoading(true);
    if (
      data.isvalidName &&
      data.isvalidEmail &&
      data.isvalidLastName &&
      data.isvalidPassword &&
      data.isEqualsPassword
    ) {
      let persona = {
        email: data.email,
        name: data.name,
        lastName: data.lastName,
        profilePic:
          "https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=" +
          data.name +
          "+" +
          data.lastName,
        direccionBase: null,
        birthdate: null,
      };
      let personaRol = {
        email: data.email,
        name: data.name,
        lastName: data.lastName,
        profilePic:
          "https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=" +
          data.name +
          "+" +
          data.lastName,
        rol: "cliente",
      };
      await savePersonal(persona);
      await savePersonalRol(personaRol);
      await handleCreateAccount();
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.commons.signContainer}>
      <StatusBar
        backgroundColor={styles.colors.darkCyan}
        barStyle="light-content"
      />
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Registrate!</Text>
      </View>
      <Animatable.View style={styles.commons.footer} animation="fadeInUpBig">
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View style={{ minWidth: Dimensions.get("window").width / 2.2 }}>
              <Text style={styles.commons.text_footer}>Nombre</Text>
              <View style={styles.commons.action}>
                <FontAwesome name="user-o" color={styles.colors.darkBlue} size={20} />
                <TextInput
                  placeholder="Tu nombre"
                  style={[styles.commons.textInput,{color: styles.colors.darkBlue}]}
                  autoCapitalize="none"
                  onChangeText={(val) => nameInputChange(val)}
                />
                {data.check_nameInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : (
                  <></>
                )}
              </View>
              {data.isvalidName ? null : (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                  style={{ maxWidth: Dimensions.get("window").width / 2.2 }}
                >
                  <Text style={styles.commons.errorMsg}>
                    {" "}
                    El nombre debe tener al menos 3 caracteres
                  </Text>
                </Animatable.View>
              )}
            </View>
            <View style={{ minWidth: Dimensions.get("window").width / 2.2 }}>
              <Text style={styles.commons.text_footer}>Apellido</Text>
              <View style={styles.commons.action}>
                <FontAwesome name="user-o" color={styles.colors.darkBlue} size={20} />
                <TextInput
                  placeholder="Tu apellido"
                  style={[styles.commons.textInput,{color: styles.colors.darkBlue}]}
                  autoCapitalize="none"
                  onChangeText={(val) => lastnameInputChange(val)}
                />
                {data.check_lastnameInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : (
                  <></>
                )}
              </View>
              {data.isvalidLastName ? null : (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                  style={{ maxWidth: Dimensions.get("window").width / 2.2 }}
                >
                  <Text style={styles.commons.errorMsg}>
                    {" "}
                    El apellido debe tener al menos 4 caracteres
                  </Text>
                </Animatable.View>
              )}
            </View>
          </View>

          {/* A email input field. */}
          <Text style={[styles.commons.text_footer, { marginTop: 30 }]}>
            Correo electrónico
          </Text>
          <View style={styles.commons.action}>
            <Feather name="mail" color={styles.colors.darkBlue} size={20} />
            <TextInput
              placeholder="Tu correo electrónico"
              style={[styles.commons.textInput,{color: styles.colors.darkBlue}]}
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
                marginTop: 30,
              },
            ]}
          >
            Contraseña
          </Text>

          <View style={styles.commons.action}>
            <Feather name="lock" color={styles.colors.darkBlue} size={20} />
            <TextInput
              placeholder="Your Password"
              style={[styles.commons.textInput,{color: styles.colors.darkBlue}]}
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
                La contraseña debe tener al menos 1 numero, minimo 6 caracteres y 1 símbolo
                obligatorio.{"\n"}
                Los simbolos obligatorios son !$%&?@
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.commons.text_footer,
              {
                marginTop: 30,
              },
            ]}
          >
            {" "}
            Confirmar Contraseña{" "}
          </Text>

          <View style={styles.commons.action}>
            <Feather name="lock" color={styles.colors.darkBlue} size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              style={[styles.commons.textInput,{color: styles.colors.darkBlue}]}
              autoCapitalize="none"
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={() => {
                updateConfirmSecureTextInput();
              }}
            >
              <Feather
                name={data.confirmSecureTextEntry ? "eye-off" : "eye"}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {data.isEqualsPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.commons.errorMsg}>
                Las contraseñas deben coincidir
              </Text>
            </Animatable.View>
          )}
          {/* A button. */}

          <View style={styles.commons.button}>
            <TouchableOpacity
              onPress={() => {
                validate();
              }}
              style={{ width: "100%" }}
            >
              <LinearGradient
                colors={[styles.colors.gradient2,styles.colors.gradient1]}
                style={styles.commons.signIn}
              >
                <Text style={[styles.commons.textSign, { color: "#fff" }]}>
                  Registrarse
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SIGNIN")}
              style={[
                styles.commons.signIn,
                { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text
                style={[
                  styles.commons.textSign,
                  { color: styles.colors.darkCyan },
                ]}
              >
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
