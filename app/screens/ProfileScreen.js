import {
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Avatar } from "react-native-elements";
import { useTheme, Text } from "react-native-paper";
import * as styles from "../../assets/styles/appStyles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { validateEmail } from "../services/Validations";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formattedDate } from "../Functions";
import AppContext from "../context/AppContext";

export const ProfileScreen = () => {
  const paperTheme = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {userInfo}= useContext(AppContext);
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
    isvalidPassword: true,
    isEqualsPassword: true,
    date:null
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: paperTheme.colors.background,
        marginHorizontal: 20,
      }}
    >
      <ScrollView>
        <Text>ProfileScreen</Text>
        <Avatar
          size="xlarge"
          rounded
          containerStyle={{ alignSelf: "center" }}
          source={{
            uri: userInfo.profilePic,
          }}
        >
          <Avatar.Accessory size={40} onPress={() => console.log("Works!")} />
        </Avatar>
        <Text
          style={[
            styles.commons.text_footer,
            {
              marginTop: 35,
              color: paperTheme.dark ? styles.colors.white: styles.colors.darkBlue,
            },
          ]}
        >
          Nombre
        </Text>
        <View style={styles.commons.action}>
          <FontAwesome name="user-o" color={styles.colors.darkBlue}size={20} />
          <TextInput
            placeholder="Your Name"
            style={[styles.commons.textInput,{color: paperTheme.dark ? styles.colors.white:styles.colors.darkBlue,}]}
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
        <Text style={[styles.commons.text_footer, { marginTop: 20 }]}>
          Last Name
        </Text>
        <View style={styles.commons.action}>
          <FontAwesome name="user-o" color={styles.colors.darkBlue} size={20} />
          <TextInput
            placeholder="Your Last Name"
            style={[styles.commons.textInput,{color: paperTheme.dark ? styles.colors.white:styles.colors.darkBlue,}]}
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
        <Text style={[styles.commons.text_footer, { marginTop: 20 }]}>
          Email
        </Text>
        <View style={styles.commons.action}>
          <Feather name="mail" color={styles.colors.darkBlue} size={20} />
          <TextInput
            placeholder="Your Email"
            style={[styles.commons.textInput,{color: paperTheme.dark ? styles.colors.white:styles.colors.darkBlue,}]}
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
        <View style={[styles.commons.action, {  marginTop: 20  }]}>
          <FontAwesome name="birthday-cake" color={styles.colors.darkBlue} size={20} />
          <TextInput
            placeholder={
              data.date != "" && data.date != null
                ? data.date
                : "Ingresa tu fecha de nacimiento"
            }
            style={[styles.commons.textInput,{color: paperTheme.dark ? styles.colors.white:styles.colors.darkBlue,}]}
            autoCapitalize="none"
            editable={false}
            placeholderTextColor={
              data.date != "" ? styles.colors.black : styles.colors.lightGray
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
    </View>
  );
};
