import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import * as commonStyles from "../../assets/styles/appStyles";
import { getPersonalInfomation } from "../services/InfoServicesPersonal";

export const EditProfile = ({ navigation }) => {
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      const getUser = async () => {
        let userData = await getPersonalInfomation();
        global.name = userData.name;
        global.lastName = userData.lastName;
        global.email = userData.email;
        global.birthdate = userData.birthdate;
        global.direccion =userData.direccion;
      };
      getUser();
      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    const unsubscribe =navigation.addListener('focus',()=>{

      onRefresh();
      return unsubscribe;
    });
    
  }, [navigation]);
  const ComponenteNormal = () => {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[commonStyles.colors.gradient1]}
          progressBackgroundColor={commonStyles.colors.white}
        />
      }>
        <View
          style={[
            stylesL.bottomContainer,
            {
              backgroundColor: paperTheme.colors.background,
            },
          ]}
        >
          <Image source={{ uri: global.profilePic }} style={stylesL.profile} />
          <Text style={[stylesL.name, { color: paperTheme.colors.text }]}>
            {global.name} {global.lastName}
          </Text>
          <Text style={[stylesL.mail, { color: paperTheme.colors.text }]}>
            {global.email}
          </Text>
          <Text style={[stylesL.mail, { color: paperTheme.colors.text }]}>
            Dirección: {global.direccion}
          </Text>
          <View style={stylesL.bdContainer}>
            <Icon name="party-popper" color="black" size={20} />
            <Text>{global.birthdate}</Text>
          </View>
          <View style={stylesL.button}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EDITPROFILE");
              }}
            >
              <LinearGradient
                colors={[
                  commonStyles.colors.gradient2,
                  commonStyles.colors.gradient1,
                ]}
                style={stylesL.signIn}
              >
                <Text style={stylesL.textSign}>Editar Perfil</Text>
                <MaterialIcons name="edit" color={commonStyles.colors.white} size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
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
        <ComponenteNormal />
      </View>
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
