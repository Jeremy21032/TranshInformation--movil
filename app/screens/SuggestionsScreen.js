import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import * as stylesA from "../../assets/styles/appStyles";
import { useTheme } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";

export const SuggestionsScreen = () => {
  const paperTheme = useTheme();
  const [data, setData] = React.useState({
    title: null,
    description: null,
    isValidTitle: true,
    isValidDescription: true
  });
  const handleChangeTitle = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidTitle: true,
        title: val,
      });
    } else {
      setData({
        ...data,
        isValidTitle: false,
        title: val,
      });
    }
  };
  const handleChangeDescription = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidDescription: true,
        description: val,
      });
    } else {
      setData({
        ...data,
        isValidDescription: false,
        description: val,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: paperTheme.colors.text }}>SuggestionsScreen</Text>
      <Text style={{ color: paperTheme.colors.text }}>
        Sus ideas y sugerencias son importantes para nostros, gracias a sus
        comentarios podemos identificar las áreas que podemos mejorar.
      </Text>
      <Text
        style={[
          stylesA.commons.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Title
      </Text>

      <View style={stylesA.commons.action}>
        <Feather name="file-text" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Password"
          style={stylesA.commons.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handleChangeTitle(val)}
        />
      </View>
      {data.isValidTitle ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={stylesA.commons.errorMsg}>
            Password must be at least 6 characters
          </Text>
        </Animatable.View>
      )}

      {/* <TextInput
        multiline
        numberOfLines={10}
        style={styles.input}
        onChangeText={(val) => handleChangeTitle(val)}
        placeholder="useless placeholder"
      /> */}
       <Text
        style={[
          stylesA.commons.text_footer,
          {
            marginTop: 35,
          },
        ]}
      >
        Descripción
      </Text>

      <View style={stylesA.commons.action}>
        <Feather name="file-text" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Password"
          style={stylesA.commons.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handleChangeDescription(val)}
        />
      </View>
      {data.isValidDescription ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={stylesA.commons.errorMsg}>
            Password must be at least 6 characters
          </Text>
        </Animatable.View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    margin: 12,
    borderWidth: 1,
  },
});
