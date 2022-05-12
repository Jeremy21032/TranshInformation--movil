import { Dimensions, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as styles from '../../assets/styles/appStyles'
export const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    name:'',
    lastName:'',
    email: '',
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    check_nameInputChange: false,
    check_lastnameInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true

  })
  const nameInputChange = (val) => {
    if (val.length != 0 && val.length>3) {
      setData({
        ...data,
        name: val,
        check_nameInputChange: true
      })
    } else {
      setData({
        ...data,
        name: val,
        check_nameInputChange: false
      })
    }
  }
  const lastnameInputChange = (val) => {
    if (val.length != 0 && val.length>3) {
      setData({
        ...data,
        lastName: val,
        check_lastnameInputChange: true
      })
    } else {
      setData({
        ...data,
        lastName: val,
        check_lastnameInputChange: false
      })
    }
  }
  const textInputChange = (val) => {
    if (val.length != 0 && val.length>15) {
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
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val

    })
  }
  const updateSecureTextInput = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const updateConfirmSecureTextInput = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry
    })
  }

  return (
    <View style={styles.commons.signContainer}>
      <StatusBar backgroundColor={styles.colors.darkCyan} barStyle="light-content" />
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Register Now!</Text>

      </View>
      <Animatable.View
        style={styles.commons.footer}
        animation="fadeInUpBig"
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ minWidth: Dimensions.get('window').width / 2.4, }}>
            <Text style={styles.commons.text_footer}>Name</Text>
            <View style={styles.commons.action}>
              <FontAwesome
                name="user-o"
                color="#05375a"
                size={20} />
              <TextInput
                placeholder='Your Name'
                style={styles.commons.textInput}
                autoCapitalize="none"
                onChangeText={(val) => nameInputChange(val)}
              />
              {data.check_nameInputChange ?
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View> : <></>}
            </View>
          </View>
          <View style={{ minWidth: Dimensions.get('window').width / 2.2, marginLeft: 10 }}>
            <Text style={styles.commons.text_footer}>Last Name</Text>
            <View style={styles.commons.action}>
              <FontAwesome
                name="user-o"
                color="#05375a"
                size={20} />
              <TextInput
                placeholder='Your Last Name'
                style={styles.commons.textInput}
                autoCapitalize="none"
                onChangeText={(val) => lastnameInputChange(val)}
              />
              {data.check_lastnameInputChange ?
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View> : <></>}
            </View>
          </View>
        </View>
        {/* A email input field. */}
        <Text style={[styles.commons.text_footer, { marginTop: 30 }]}>Email</Text>
        <View style={styles.commons.action}>
          <Feather
            name="mail"
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


        {/* A password input field. */}

        <Text style={[styles.commons.text_footer, {
          marginTop: 30
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

        <Text style={[styles.commons.text_footer, {
          marginTop: 30
        }]}> Confirm Password</Text>

        <View style={styles.commons.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20} />
          <TextInput
            placeholder='Confirm Your Password'
            style={styles.commons.textInput}
            autoCapitalize="none"
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            onChangeText={(val) => handleConfirmPasswordChange(val)}

          />
          <TouchableOpacity onPress={() => { updateConfirmSecureTextInput() }}>
            <Feather
              name={data.confirmSecureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {/* A button. */}

        <View style={styles.commons.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.commons.signIn}>
            <Text style={[styles.commons.textSign, { color: "#fff" }]}>Sign Up</Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate("SIGNIN")}
            style={[styles.commons.signIn, { borderColor: "#009387", borderWidth: 1, marginTop: 15 }]}>
            <Text style={[styles.commons.textSign, { color: styles.colors.darkCyan }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}
