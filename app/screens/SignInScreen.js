import { Dimensions, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as styles from '../../assets/styles/appStyles'
import { validateEmail } from '../services/Validations'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { ModalInfoError } from '../components/ModalInfoError'

export const SignInScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleError, setModalVisibleError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");


  let component = <LoadingOverlay isVisible={isLoading} setIsLoading={setIsLoading} setModalVisibleError={setModalVisibleError} setMessageError={setMessageError} />

  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  })
  const textInputChange = (val) => {
    if (val.length != 0 && val.length > 15) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      })
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      })
    }
  }
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val

    })
  }
  const updateSecureTextInput = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  return (
    <View style={styles.commons.signContainer}>
      <StatusBar backgroundColor={styles.colors.darkCyan} barStyle="light-content" />
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Welcome</Text>

      </View>
      <Animatable.View
        style={styles.commons.footer}
        animation="fadeInUpBig"
      >
        {/* A email input field. */}
        <Text style={styles.commons.text_footer}>Email</Text>
        <View style={styles.commons.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />
          <TextInput
            placeholder='Your Email'
            style={styles.commons.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ?
            <Animatable.View animation="bounceIn">
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View> : <></>}
        </View>


        {       /* A password input field. */}
        <Text style={[styles.commons.text_footer, {
          marginTop: 35
        }]}>Password</Text>

        <View style={styles.commons.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20} />
          <TextInput
            placeholder='Your Password'
            style={styles.commons.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}

          />
          <TouchableOpacity onPress={() => { updateSecureTextInput() }}>
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {/* A button. */}

        <View style={styles.commons.button}>
          <TouchableOpacity style={styles.commons.signIn} onPress={() => {
            if (data.email != null && data.password != null && data.password != '' && data.email != '') {
              let validator = validateEmail(data.email);
              if (validator.Result) {
                setIsLoading(true);
              } else {
                setModalVisibleError(true)
                setMessageError(validator.message);
              }
            } else {
              setModalVisibleError(true)
              setMessageError("Verifique las credenciales de acceso");
            }
          }}>

            <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.commons.signIn}>
              <Text style={[styles.commons.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SIGNUP")}
            style={[styles.commons.signIn, { borderColor: styles.colors.darkCyan, borderWidth: 1, marginTop: 15 }]}>
            <Text style={[styles.commons.textSign, { color: styles.colors.darkCyan }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? component : <View></View>}
        <ModalInfoError
          modalVisible={modalVisibleError}
          setModalVisible={setModalVisibleError}
          message={messageError}
        >
        </ModalInfoError>

      </Animatable.View>
    </View>
  )
}

