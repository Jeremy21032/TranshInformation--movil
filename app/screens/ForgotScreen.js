import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as styles from "../../assets/styles/appStyles";
import { validateEmail } from "../services/Validations";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoError } from "../components/ModalInfoError";
import { ModalInfoCorrect } from "../components/ModalInfoCorrect";
import Lottie from "lottie-react-native";
import AppContext from "../context/AppContext";

class ForgotScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isvalidEmail: true,
      isvalidPassword: true,
      isLoading: false,
      messageError: "",
      modalVisibleError: false,
      modalVisibleCorrect: false,
      messageCorrect: "",
    };
  }
  render() {
    const { sendEmail } = this.context;
    let component = (
      <LoadingOverlay
        isVisible={this.state.isLoading}
        setIsLoading={(loading) => this.setState({ isLoading: loading })}
        setModalVisible={(state) => this.setState({ modalVisibleError: state })}
        setMessageError={(message) => this.setState({ messageError: message })}
      />
    );

    const textInputChange = (val) => {
      let validator = validateEmail(val);

      if (validator.Result && val.trim().length >= 6) {
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
    const handleForgotPassword = () => {
      const email = this.state.email;
      this.setState({ isLoading: true });
      sendEmail(email)
        .then(() => {
          this.setState({ modalVisibleCorrect: true });
          this.setState({
            messageCorrect:
              "El correo fue enviado al correo:\n" +
              this.state.email +
              "\nRecuerde revisar la bandeja de SPAM (Correo no deseado)",
          });
          this.setState({ isLoading: false, email: "" });
          this.props.navigation.goBack();
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          this.setState({ modalVisibleError: true });
          this.setState({
            messageError: error.message,
          });
        });
    };

    return (
      <View style={styles.commons.signContainer}>
        <StatusBar
          backgroundColor={styles.colors.darkCyan}
          barStyle="light-content"
        />
        <View style={styles.commons.header}>
          <Text style={styles.commons.text_header}>
            Recuperar tu contraseña
          </Text>
        </View>
        <Animatable.View
          style={[styles.commons.footer, { justifyContent: "center" }]}
          animation="fadeInUpBig"
        >
          <View
            style={{
              maxHeight: Dimensions.get("window").height / 4,
              bottom: "10%",
            }}
          >
            <Lottie
              source={require("../../assets/forgot.json")}
              autoPlay
              loop
              style={{ height: "100%", alignSelf: "center" }}
            />
          </View>

          <View style={{ bottom: "15%" }}>
            <Text
              style={[
                styles.commons.text_footer,
                { marginBottom: 35, textAlign: "center" },
              ]}
            >
              Introduzca su dirección de correo electrónico para recuperar su
              contraseña.
            </Text>
            <Text style={styles.commons.text_footer}>Correo electrónico</Text>
            <View style={styles.commons.action}>
              <FontAwesome
                name="user-o"
                color={styles.colors.darkBlue}
                size={20}
              />
              <TextInput
                placeholder="Tu correo electrónico"
                value={this.state.email}
                style={[
                  styles.commons.textInput,
                  {
                    color: styles.colors.darkBlue,
                  },
                ]}
                autoCapitalize="none"
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
                  El correo debe tener el formato correcto.
                </Text>
              </Animatable.View>
            )}
            {/* A button. */}

            <View style={styles.commons.button}>
              <TouchableOpacity
                style={styles.commons.signIn}
                onPress={() => {
                  if (this.state.email != null && this.state.email != "") {
                    let validator = validateEmail(this.state.email);
                    if (validator.Result) {
                      handleForgotPassword();
                      console.log("llego");
                    } else {
                      this.setState({ modalVisibleError: true });
                      this.setState({ messageError: validator.message });
                    }
                  } else {
                    this.setState({ modalVisibleError: true });
                    this.setState({
                      messageError: "Verifique el email proporcionado",
                    });
                  }
                }}
              >
                <LinearGradient
                  colors={[styles.colors.gradient2, styles.colors.gradient1]}
                  style={styles.commons.signIn}
                >
                  <Text style={[styles.commons.textSign, { color: "#fff" }]}>
                    Enviar correo
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SIGNIN")}
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
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.isLoading ? component : <View></View>}
            <ModalInfoError
              modalVisible={this.state.modalVisibleError}
              setModalVisible={(state) =>
                this.setState({ modalVisibleError: state })
              }
              message={this.state.messageError}
            ></ModalInfoError>
            <ModalInfoCorrect
              modalVisible={this.state.modalVisibleCorrect}
              setModalVisible={(state) => {
                this.setState({ modalVisibleCorrect: state });
              }}
              message={this.state.messageCorrect}
            ></ModalInfoCorrect>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
export { ForgotScreen };
