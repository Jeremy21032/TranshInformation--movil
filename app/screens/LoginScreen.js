import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { Component, useContext } from "react";
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
import AppContext from "../context/AppContext";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      isvalidEmail: true,
      isvalidPassword: true,
      modalVisibleError: false,
      isLoading: false,
      messageError: "",
    };
  }
  static contextType = AppContext;
  render() {
    const { signInUser } = this.context;

    let component = (
      <LoadingOverlay
        isVisible={this.state.isLoading}
        setIsLoading={(loading) => this.setState({ isLoading: loading })}
        setModalVisible={(state) => this.setState({ modalVisibleError: state })}
        setMessageError={(message) => this.setState({ messageError: message })}
      />
    );
    const textInputChange = (val) => {
      let validator = validateCorrectEmail(val);
      if (validator && val.trim().length >= 6) {
        this.setState({
          email: val,
          check_textInputChange: true,
          isvalidEmail: true,
        });
      } else {
        this.setState({
          email: val,
          check_textInputChange: false,
          isvalidEmail: false,
        });
      }
    };
    const handlePasswordChange = (val) => {
      let passwordValidator = validateCorrectPassword(val);
      if (passwordValidator && val.trim().length >= 6) {
        this.setState({
          password: val,
          isvalidPassword: true,
        });
      } else {
        this.setState({
          password: val,
          isvalidPassword: false,
        });
      }
    };
    const updateSecureTextInput = () => {
      this.setState({
        secureTextEntry: !this.state.secureTextEntry,
      });
    };
    const singIn = async (mail) => {
      this.setState({ isLoading: true });
      console.log(mail);
      console.log("ENTRA A AUT");
      try {
        await signInUser(this.state.email, this.state.password);
        this.setState({ isLoading: false });
      } catch (error) {
        this.setState({ isLoading: false });
        setText("Correo electrónico incorrecto.");
        this.setState({ modalVisibleError: true });
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
            <FontAwesome
              name="user-o"
              color={styles.colors.darkBlue}
              size={20}
            />
            <TextInput
              placeholder="Tu correo electrónico"
              style={[
                styles.commons.textInput,
                { color: styles.colors.darkBlue },
              ]}
              value={this.state.email}
              autoCapitalize="none"
              // onChangeText={(val) => textInputChange(val)}
              onChangeText={(val) => textInputChange(val)}
            />
            {this.state.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : (
              <></>
            )}
          </View>
          {this.state.isvalidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.commons.errorMsg}>
                El correo debe tener el formato correcto
              </Text>
            </Animatable.View>
          )}
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
              value={this.state.password}
              placeholder="Tu Contraseña"
              style={[
                styles.commons.textInput,
                { color: styles.colors.darkBlue },
              ]}
              autoCapitalize="none"
              secureTextEntry={this.state.secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={() => {
                updateSecureTextInput();
              }}
            >
              <Feather
                name={this.state.secureTextEntry ? "eye-off" : "eye"}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {this.state.isvalidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.commons.errorMsg}>
                La contraseña debe tener al menos 1 numero, mínimo 6 caracteres
                y 1 símbolo obligatorio.{"\n"}
                Los simbolos obligatorios son !$%&?@*
              </Text>
            </Animatable.View>
          )}
          <View style={styles.commons.button}>
            <TouchableOpacity
              style={styles.commons.signIn}
              onPress={() => {
                if (
                  this.state.email != null &&
                  this.state.password != null &&
                  this.state.password != "" &&
                  this.state.email != ""
                ) {
                  let validator = validateCorrectEmail(this.state.email);
                  if (validator) {
                    singIn(this.state.email);
                  } else {
                    this.setState({ modalVisibleError: true });
                    this.setState({
                      messageError:
                        "El correo No consta con el formato correcto",
                    });
                  }
                } else {
                  this.setState({ modalVisibleError: true });
                  this.setState({
                    messageError: "Verifique las credenciales de acceso",
                  });
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
              onPress={() => {
                this.setState({
                  email: "",
                  password: "",
                  check_textInputChange: false,
                  secureTextEntry: true,
                  isvalidEmail: true,
                  isvalidPassword: true,
                  modalVisibleError: false,
                  isLoading: false,
                  messageError: "",
                });
                this.props.navigation.navigate("SIGNUP");
              }}
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
            onPress={() => this.props.navigation.navigate("FORGOT")}
            style={{ alignSelf: "center", marginVertical: 20 }}
          >
            <Text
              style={[
                styles.commons.textSign,
                { color: styles.colors.darkCyan },
              ]}
            >
              Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          {this.state.isLoading ? component : <View></View>}
          <ModalInfoError
            modalVisible={this.state.modalVisibleError}
            setModalVisible={(state) =>
              this.setState({ modalVisibleError: state })
            }
            message={this.state.messageError}
          ></ModalInfoError>
        </Animatable.View>
      </View>
    );
  }
}
export { LoginScreen };
