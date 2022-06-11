import { View, TextInput, Dimensions } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { useTheme, Text } from "react-native-paper";
import * as styles from "../../assets/styles/appStyles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { TextInput as InputPaper } from "react-native-paper";

export const ProfileScreen = () => {
  const paperTheme = useTheme();
  const [data, setData] = React.useState({
    name: global.name,
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: paperTheme.colors.background,
        marginHorizontal: 20,
      }}
    >
      <Text>ProfileScreen</Text>
      <Avatar
        size="xlarge"
        rounded
        containerStyle={{ alignSelf: "center" }}
        source={{
          uri: global.profilePic,
        }}
      >
        <Avatar.Accessory size={40} onPress={() => console.log("Works!")} />
      </Avatar>
      <Text
        style={[
          styles.commons.text_footer,
          {
            marginTop: 35,
            color: paperTheme.dark ? "white" : "#05375a",
          },
        ]}
      >
        Nombre
      </Text>
      <View style={styles.commons.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        {/* <TextInput
          placeholder="Your Name"
          style={styles.commons.textInput}
          autoCapitalize="none"
          onChangeText={(val) => nameInputChange(val)}
          value={data.name}
        /> */}
        <TextInput
          label="Your Name"
          value={data.name}
          onChangeText={(val) => nameInputChange(val)}
          mode="outlined"
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
          style={{ maxWidth: Dimensions.get("window").width }}
        >
          <Text style={styles.commons.errorMsg}>
            {" "}
            Name must be at least 3 characters
          </Text>
        </Animatable.View>
      )}
      <Text
        style={[
          styles.commons.text_footer,
          {
            marginTop: 35,
            color: paperTheme.dark ? "white" : "#05375a",
          },
        ]}
      >
        Apellido
      </Text>

      <View style={styles.commons.action}>
        <Feather
          name="lock"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20}
        />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor={
            paperTheme.dark == true
              ? styles.colors.cultured
              : styles.colors.lightGray
          }
          style={[
            styles.commons.textInput,
            {
              color:
                paperTheme.dark == true
                  ? styles.colors.cultured
                  : styles.colors.lightGray,
            },
          ]}
          autoCapitalize="none"
        />
      </View>
      <Text
        style={[
          styles.commons.text_footer,
          {
            marginTop: 35,
            color: paperTheme.dark == true ? "white" : "#05375a",
          },
        ]}
      >
        Email
      </Text>
      <View style={styles.commons.action}>
        <FontAwesome
          name="user-o"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20}
        />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor={
            paperTheme.dark == true
              ? styles.colors.cultured
              : styles.colors.lightGray
          }
          style={[
            styles.commons.textInput,
            {
              color:
                paperTheme.dark == true
                  ? styles.colors.cultured
                  : styles.colors.lightGray,
            },
          ]}
          autoCapitalize="none"
        />
        {data.check_textInputChange ? (
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
            color: paperTheme.dark == true ? "white" : "#05375a",
          },
        ]}
      >
        Nombre
      </Text>

      <View style={styles.commons.action}>
        <Feather
          name="lock"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20}
        />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor={
            paperTheme.dark == true
              ? styles.colors.cultured
              : styles.colors.lightGray
          }
          style={[
            styles.commons.textInput,
            {
              color:
                paperTheme.dark == true
                  ? styles.colors.cultured
                  : styles.colors.lightGray,
            },
          ]}
          autoCapitalize="none"
        />
      </View>
      {data.isvalidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.commons.errorMsg}>
            Password must be at least 6 characters
          </Text>
        </Animatable.View>
      )}
    </View>
  );
};
