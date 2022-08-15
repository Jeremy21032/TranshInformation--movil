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
import React, { useContext, useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import * as Animatable from "react-native-animatable";
import * as styles from "../../assets/styles/appStyles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formattedDate } from "../Functions";
import { getPlaces, updatePersona } from "../services/InfoServicesPersonal";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoCorrect } from "../components/ModalInfoCorrect";
import { ModalInfoError } from "../components/ModalInfoError";
import AppContext from "../context/AppContext";
import { getAuth } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";

export const EditProfileSecond = () => {
  const paperTheme = useTheme();
  const [modalVisibleError, setModalVisibleError] = React.useState(false);
  const [modalVisibleCorrect, setModalVisibleCorrect] = React.useState(false);
  const [messageCorrect, setMessageCorrect] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [messageError, setMessageError] = React.useState("");
  const [items, setItems] = useState([]);

  const { userInfo, handleUserInfo, handleFirebaseUser } =
    useContext(AppContext);
  const [data, setData] = React.useState({
    name: userInfo.name,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    check_nameInputChange: false,
    check_lastnameInputChange: false,
    isvalidName: true,
    isvalidLastName: true,
    isvalidEmail: true,
    date: userInfo.birthdate,
    profilePic: userInfo.profilePic,
    direcionBase: null,
    direccion: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  React.useEffect(() => {
    console.log("userInfo updated", userInfo);
    setData({
      name: userInfo.name,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: "",
      confirmPassword: "",
      check_textInputChange: false,
      check_nameInputChange: false,
      check_lastnameInputChange: false,
      isvalidName: true,
      isvalidLastName: true,
      isvalidEmail: true,
      date: userInfo.birthdate,
      profilePic: userInfo.profilePic,
      direcionBase: null,
      direccion: null,
    });
  }, [userInfo]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  let getItems = async () => {
    let places = await getPlaces();
    for (const element of places) {
      if (!items.includes(element.value)) {
        items.push(element);
      }
    }
    console.log("items", items);
  };

  useEffect(() => {
    if (items.length > 0) {
      setItems([]);
    }
    getItems();
  }, [items]);
  let component = (
    <LoadingOverlay
      isVisible={isLoading}
      setIsLoading={setIsLoading}
      setModalVisibleError={setModalVisibleError}
      setMessageError={setMessageError}
    />
  );
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
    // TODO document why this arrow function is empty
  };

  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    if (response) {
      setData({ ...data, profilePic: response.uri });
      console.log("Respuesta: ", response);
    }
  };

  const uploadFile = async (empid) => {
    console.log("--------------ENTRA A updloadFile", empid);
    console.log("........Data........", data);
    try {
      console.log("**************************0*********************");
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", data.profilePic, true);
        xhr.send(null);
      });
      console.log("***************************1********************");
      const storage = getStorage();
      console.log("***************************2********************");
      const fileStorage = ref(storage, "userImages/" + empid);
      console.log("***************************3********************");
      const uploadResult = await uploadBytes(fileStorage, blob);

      console.log("***************************4********************");
      const url = await getDownloadURL(fileStorage);

      blob.close();

      console.log("***************************5********************");
      global.url = url;
      console.log("***************************6********************");
      console.log("global.url", global.url);
      setData({
        ...data,
        profilePic: global.url,
      });
      console.log("*/*/*/*/*/*/*/*/*/*/*/*/*/", url);
    } catch (e) {
      setIsLoading(false);
      console.log("---UPLOAD ERROR--", e);
    }
  };
  const auth = getAuth();
  const saveData = async () => {
    setIsLoading(true);
    try {
      let actualDate = new Date();
      let year = actualDate.getFullYear().toString().substr(-2);
      let imageName =
        data.name.toLowerCase() +
        "_" +
        data.lastName.toLowerCase() +
        "_" +
        year +
        ".jpg";
      await uploadFile(imageName);
      let persona = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        birthdate: data.date,
        profilePic: global.url,
        direccionBase: data.direcionBase,
        direccion: data.direccion,
      };
      await updatePersona(persona, canContinue);

      setIsLoading(false);
      setModalVisibleCorrect(true);
      setMessageCorrect(
        "Información actualizada con exito, la sesión se cerrará por seguridad."
      );
      console.log(".........................ATUH.................", auth);
      setTimeout(() => {
        handleFirebaseUser(auth.currentUser);
        handleUserInfo(persona);
      }, 5000);
    } catch (e) {
      setModalVisibleError(true);
      setMessageError(e.message);
    }
  };

  return (
    <>
      <View>
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
              uri: data.profilePic,
            }}
            containerStyle={stylesL.profile}
            rounded
            style={stylesL.profile}
          >
            <Avatar.Accessory size={35} onPress={() => chooseFile()} />
          </Avatar>
          <ScrollView
            style={{
              width: Dimensions.get("window").width - 50,
              bottom: "6%",
            }}
          >
            <View style={stylesL.bdContainer}>
              <Icon name="information-outline" color="black" size={20} />
              <Text>
                Recuerda, el único campo que no podrás modificar es tu correo
                electrónico.
              </Text>
            </View>
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 25,
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
                  marginTop: 25,
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
                  El apellido debe tener al menos 4 caracteres
                </Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 25,
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
                placeholder="Tu correo electrónico"
                style={[
                  styles.commons.textInput,
                  {
                    color: styles.colors.lightGray,
                  },
                ]}
                editable={false}
                autoCapitalize="none"
                value={data.email}
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
            <Text
              style={[
                styles.commons.text_footer,
                {
                  marginTop: 25,
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
          </ScrollView>
          <View
            style={{
              width: Dimensions.get("window").width - 50,
              bottom: "6%",
            }}
          >
            <Text
              style={[
                styles.commons.text_footer,
                {
                  color: paperTheme.dark
                    ? styles.colors.white
                    : styles.colors.darkBlue,
                },
              ]}
            >
              Seleccione el sector donde vive
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setItems={setItems}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={(item) => {
                console.log(item);
                setData({
                  ...data,
                  direcionBase: item.value,
                  direccion: item.label,
                });
              }}
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
          </View>
        </View>
        {isLoading ? component : <View></View>}
        <ModalInfoError
          modalVisible={modalVisibleError}
          setModalVisible={setModalVisibleError}
          message={messageError}
        ></ModalInfoError>
        <ModalInfoCorrect
          modalVisible={modalVisibleCorrect}
          setModalVisible={setModalVisibleCorrect}
          message={messageCorrect}
        ></ModalInfoCorrect>
      </View>
    </>
  );
};

const stylesL = StyleSheet.create({
  bgImg: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: "100%",
    opacity: 0.7,
  },
  bottomContainer: {
    marginTop: "12%",
    height: "95%",
    width: Dimensions.get("window").width,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
  },
  profile: {
    height: 130,
    width: 130,
    borderRadius: 18,
    bottom: "8%",
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
  },
});
