import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Avatar } from "@rneui/themed";

export const EditProfile = () => {
  const [edit, isEditing] = useState(false);
  return (
    <>
      <View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          style={styles.bgImg}
        />
        {edit == false ? (
          <View style={styles.bottomContainer}>
            <Image source={{ uri: global.profilePic }} style={styles.profile} />
            <Text style={styles.name}>
              {global.name} {global.lastName}
            </Text>
            <Text style={styles.mail}>{global.email}</Text>
            <View style={styles.bdContainer}>
              <Icon name="party-popper" color="black" size={20} />
              <Text>{global.birthdate}</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  isEditing(true);
                }}
              >
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Editar Perfil</Text>
                  <MaterialIcons name="edit" color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <Avatar
              source={{
                uri: global.profilePic,
              }}
              containerStyle={styles.profile}
              rounded
              style={styles.profile}
            >
              <Avatar.Accessory
                size={35}
                onPress={() => console.log("Works in it")}
              />
            </Avatar>
            <View style={{ bottom: "8%", backgroundColor: "red" }}>
              <Text>Hola</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
  },
  profile: {
    height: 130,
    width: 130,
    borderRadius: 25,
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
