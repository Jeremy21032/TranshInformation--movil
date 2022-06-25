import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Avatar } from "@rneui/themed";
import * as Animatable from "react-native-animatable";
import * as styles from "../../assets/styles/appStyles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { validateEmail } from "../services/Validations";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formattedDate } from "../Functions";
import { updatePersona, updatePersonaRol } from "../services/InfoServicesPersonal";

export const EditProfileSecond = ({navigation}) => {
  const paperTheme = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [data, setData] = React.useState({
    name: global.name,
    lastName: global.lastName,
    email: global.email,
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    check_nameInputChange: false,
    check_lastnameInputChange: false,
    isvalidName: true,
    isvalidLastName: true,
    isvalidEmail: true,
    isvalidPassword: true,
    isEqualsPassword: true,
    date: global.birthdate,
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let pickedDate = new Date(date);
    let finalDate = formattedDate(pickedDate);
    console.warn("A date has been picked: ", finalDate);
    setData({ ...data, date: finalDate });
    hideDatePicker();
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
  const canContinue = () => {
    navigation.goBack()

  }
  const saveData =()=>{
    setData({
      ...data,
      name:data.name,
      lastName: data.lastName,
      email: data.email,
      date:data.date,
    });
    global.name = data.name;
    global.lastName=data.lastName;
    global.email=data.email;
    global.birthdate=data.date;
    let persona={
      name:global.name,
      lastName: global.lastName,
      email: global.email,
      birthdate:global.birthdate,
    }
    let personaRol={
      name:global.name,
      lastName: global.lastName,
      email: global.email,
    }
    updatePersona(persona);
    updatePersonaRol(personaRol,canContinue);
  }

  return (
    <>
      <ScrollView>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          style={stylesL.bgImg}
        />

        <View
          style={[
            stylesL.bottomContainer,
            {
              backgroundColor: paperTheme.colors.background,
            },
          ]}
        >
          <Avatar
            source={{
              uri: global.profilePic,
            }}
            containerStyle={stylesL.profile}
            rounded
            style={stylesL.profile}
          >
            <Avatar.Accessory
              size={35}
              onPress={() => console.log("Works in it")}
            />
          </Avatar>
          <ScrollView
            style={{
              width: Dimensions.get("window").width - 50,
              bottom: "8%",
            }}
          >
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 35,
                  color: paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue,
                },
              ]}
            >
              Nombre
            </Text>
            <View style={styles.commons.action}>
              <FontAwesome
                name="user-o"
                color={
                  paperTheme.dark ? styles.colors.white : styles.colors.darkBlue
                }
                size={20}
              />
              <TextInput
                placeholder="Your Name"
                style={[
                  styles.commons.textInput,
                  {
                    color: paperTheme.dark
                      ? styles.colors.white
                      : styles.colors.darkBlue,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => nameInputChange(val)}
                value={data.name}
              />
              {data.check_nameInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : (
                <></>
              )}
            </View>
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 35,
                  color: paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue,
                },
              ]}
            >
              Apellido
            </Text>
            <View style={styles.commons.action}>
              <FontAwesome
                name="user-o"
                color={
                  paperTheme.dark ? styles.colors.white : styles.colors.darkBlue
                }
                size={20}
              />
              <TextInput
                placeholder="Your Last Name"
                style={[
                  styles.commons.textInput,
                  {
                    color: paperTheme.dark
                      ? styles.colors.white
                      : styles.colors.darkBlue,
                  },
                ]}
                autoCapitalize="none"
                value={data.lastName}
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
                  Last Name must be at least 4 characters
                </Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 35,
                  color: paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue,
                },
              ]}
            >
              Correo electrónico
            </Text>
            <View style={styles.commons.action}>
              <Feather
                name="mail"
                color={
                  paperTheme.dark ? styles.colors.white : styles.colors.darkBlue
                }
                size={20}
              />
              <TextInput
                placeholder="Your Email"
                style={[
                  styles.commons.textInput,
                  {
                    color: paperTheme.dark
                      ? styles.colors.white
                      : styles.colors.darkBlue,
                  },
                ]}
                autoCapitalize="none"
                value={data.email}
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
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 35,
                  color: paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue,
                },
              ]}
            >
              Fecha de Nacimiento{" "}
            </Text>
            <View style={[styles.commons.action, { marginTop: 20 }]}>
              <FontAwesome
                name="birthday-cake"
                color={
                  paperTheme.dark ? styles.colors.white : styles.colors.darkBlue
                }
                size={20}
              />
              <TextInput
                placeholder={
                  data.date != "" && data.date != null
                    ? data.date
                    : "Ingresa tu fecha de nacimiento"
                }
                style={[
                  styles.commons.textInput,
                  {
                    color: paperTheme.dark
                      ? styles.colors.white
                      : styles.colors.darkBlue,
                  },
                ]}
                autoCapitalize="none"
                editable={false}
                placeholderTextColor={
                  data.date != "" && paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue
                }
              />
              <TouchableOpacity onPress={showDatePicker}>
                <Feather name="calendar" color="grey" size={20} />
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date("01/01/2005")}
              minimumDate={new Date("01/01/1920")}
              display={Platform.OS === "ios" ? "spinner" : "default"}
            />
            <View style={stylesL.button}>
              <TouchableOpacity
                onPress={() => {
                  saveData();
                }}
              >
                <LinearGradient
                  colors={[styles.colors.gradient2, styles.colors.gradient1]}
                  style={stylesL.signIn}
                >
                  <Text style={stylesL.textSign}>Guardar</Text>
                  <MaterialIcons name="save" color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const stylesL = StyleSheet.create({
  bgImg: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: "100%",
    opacity: 0.7,
  },
  bottomContainer: {
    marginTop: "52%",
    height: "90%",
    width: Dimensions.get("window").width,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
  },
  profile: {
    height: 130,
    width: 130,
    borderRadius: 18,
    bottom: "10%",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    bottom: "8%",
  },
  mail: {
    bottom: "7%",
    fontSize: 18,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
    alignSelf: "center",
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
    marginRight: 5,
  },
  bdContainer: {
    backgroundColor: "#FCFCD6",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#F8F874",
    width: Dimensions.get("window").width - 50,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: "6%",
  },
});
