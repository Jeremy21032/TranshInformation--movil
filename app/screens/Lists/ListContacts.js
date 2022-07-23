import { Avatar, useTheme } from "react-native-paper";
import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Icon } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as styles from "../../../assets/styles/appStyles";
export const ListContacts = ({ items }) => {
  const paperTheme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  let phone = items.phoneNumber.substring(1);
  let url =
    "https://api.whatsapp.com/send?phone=+593" +
    `${phone}` +
    "&text=Hola,%20estoy%20interesado%20en%20tu%20servicio";
  let urlMap = "https://www.google.es/maps/place/" + items.address;
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get("window").width - 70,
        alignSelf: "center",
        marginVertical: 5,
        backgroundColor: paperTheme.colors.background,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => {
        console.log("SELECTED:", items);
        setModalVisible(true);
      }}
    >
      <View style={{ flex: 1 }}>
        <Avatar.Icon
          size={35}
          icon="account-circle"
          style={{ backgroundColor: styles.colors.darkCyan }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <Text style={{ color: paperTheme.colors.text }}>
          {items.name} {items.lastName}
        </Text>
        <Text style={{ color: paperTheme.colors.text }}>
          Actividad: {items.activity}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Icon name="rightcircleo" type="antdesign" color="#517fa4" />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesL.centeredView}>
          <View
            style={[
              stylesL.modalView,
              {
                backgroundColor: paperTheme.colors.background,
                shadowColor: paperTheme.dark ? "white" : "#2e2e2e",
              },
            ]}
          >
            <View>
              <Avatar.Icon
                size={50}
                icon="account-circle"
                style={{ backgroundColor: styles.colors.darkCyan }}
              />
            </View>
            <View style={stylesL.row}>
              <View style={stylesL.column}>
                <Text
                  style={[
                    stylesL.modalText2,
                    { color: paperTheme.colors.text },
                  ]}
                >
                  Nombre
                </Text>
              </View>
              <View style={stylesL.column}>
                <Text
                  style={[stylesL.modalText, { color: paperTheme.colors.text }]}
                >
                  {items.name} {items.lastName}
                </Text>
              </View>
            </View>
            <View style={stylesL.row}>
              <View style={stylesL.column}>
                <Text
                  style={[
                    stylesL.modalText2,
                    { color: paperTheme.colors.text },
                  ]}
                >
                  Dirección:
                </Text>
              </View>
              <TouchableOpacity
                style={[stylesL.column, { width: 150 }]}
                onPress={() => Linking.openURL(urlMap)}
              >
                <Text
                  style={[
                    stylesL.modalText,
                    {
                      color: paperTheme.colors.text,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  {items.address}{" "}
                  <Ionicons
                    name="ios-location-sharp"
                    size={24}
                    color="#FF3D00"
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={stylesL.row}>
              <View style={stylesL.column}>
                <Text
                  style={[
                    stylesL.modalText2,
                    { color: paperTheme.colors.text },
                  ]}
                >
                  Contacto:
                </Text>
              </View>
              <TouchableOpacity
                style={[stylesL.column, { width: 150 }]}
                onPress={() => Linking.openURL(url)}
              >
                <Text
                  style={[
                    stylesL.modalText,
                    {
                      color: paperTheme.colors.text,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  {items.phoneNumber}{" "}
                  <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={stylesL.row}>
              <View style={stylesL.column}>
                <Text
                  style={[
                    stylesL.modalText2,
                    { color: paperTheme.colors.text },
                  ]}
                >
                  Actividad:{" "}
                </Text>
              </View>
              <View style={stylesL.column}>
                <Text
                  style={[stylesL.modalText, { color: paperTheme.colors.text }]}
                >
                  {items.activity}
                </Text>
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <LinearGradient
                  colors={[styles.colors.gradient2,styles.colors.gradient1]}
                  style={stylesL.signIn}
                >
                  <Text style={stylesL.textSign}>OK</Text>
                  <MaterialIcons
                    name="check-circle-outline"
                    color="#fff"
                    size={20}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const stylesL = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  column: {
    flexDirection: "column",
    width: "47%",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    width: Dimensions.get("window").width/1.5,
  },
  modalView: {
    width:Dimensions.get("window").width-20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
  },
  modalText2: {
    marginBottom: 15,
    fontWeight: "bold",
  },
});
