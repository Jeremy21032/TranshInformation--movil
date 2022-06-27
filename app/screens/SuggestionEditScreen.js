import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../assets/styles/appStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { saveSuggestion } from "../services/SuggestionsServices";
import { getLastItem, saveLastItem } from "../services/GlobalServices";

export const SuggestionEditScreen = ({ navigation, route }) => {
  console.log("-------------ROUTE-----------------", route);
  let suggestionSelected = null;
  let editing = useState(false);
  const [data, setData] = React.useState({
    title: null,
    description: null,
    isValidTitle: true,
    isValidDescription: true,
    id: suggestionSelected != null ? suggestionSelected.id : null,
  });
  if (route != null && route.params != null && suggestionSelected != null) {
    suggestionSelected = route.params.suggestionSelected;
    data.title = suggestionSelected.section;
    data.description = suggestionSelected.comment;
    data.id = suggestionSelected.id;
    editing = true;
  }
  console.log("Data", data);
  const paperTheme = useTheme();

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
    if (val.trim().length >= 50) {
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
  const canContinue = () => {
    navigation.goBack();
  };
  const saveData = async () => {
    let lastItem = await getLastItem();
    let newLastItem = parseInt(lastItem) + 1 + "s";
    let suggestion = {
      id: editing == true ? data.id : newLastItem,
      comment: data.description,
      section: data.title,
      name: global.name,
      lastName: global.lastName,
      email:global.email,
    };
    await saveLastItem({ lasitemSuggestion: parseInt(lastItem) + 1 });
    await saveSuggestion(suggestion, canContinue);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: paperTheme.colors.text }]}>
        Sus ideas y sugerencias son importantes para nostros, gracias a sus
        comentarios podemos identificar las áreas que podemos mejorar.
      </Text>
      <Text
        style={[
          commonStyles.commons.text_footer,
          {
            marginTop: 35,
            color: paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.darkBlue,
          },
        ]}
      >
        ¿Su opinión es acerca de....?
      </Text>

      <View style={commonStyles.commons.action}>
        <Feather
          name="file-text"
          color={
            paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.darkBlue
          }
          size={20}
        />
        <TextInput
          placeholder="Ingrese un título"
          style={[
            commonStyles.commons.textInput,
            {
              color: paperTheme.dark
                ? commonStyles.colors.white
                : commonStyles.colors.darkBlue,
            },
          ]}
          placeholderTextColor={
            paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.lightGray
          }
          autoCapitalize="none"
          onChangeText={(val) => handleChangeTitle(val)}
          value={data.title}
        />
      </View>
      {data.isValidTitle ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={commonStyles.commons.errorMsg}>
            El título debe constar de al menos 6 caracteres.
          </Text>
        </Animatable.View>
      )}

      <Text
        style={[
          commonStyles.commons.text_footer,
          {
            marginTop: 35,
            color: paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.darkBlue,
          },
        ]}
      >
        Descripción
      </Text>

      <View style={commonStyles.commons.action}>
        <Feather
          name="file-text"
          color={
            paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.darkBlue
          }
          size={20}
        />
        <TextInput
          placeholder="Ingrese una descripción"
          multiline={true}
          numberOfLines={5}
          style={[
            commonStyles.commons.textInput,
            {
              color: paperTheme.dark
                ? commonStyles.colors.white
                : commonStyles.colors.darkBlue,
              borderBottomWidth: 1,
            },
          ]}
          placeholderTextColor={
            paperTheme.dark
              ? commonStyles.colors.white
              : commonStyles.colors.lightGray
          }
          autoCapitalize="none"
          onChangeText={(val) => handleChangeDescription(val)}
          value={data.description}
        />
      </View>
      {data.isValidDescription ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={commonStyles.commons.errorMsg}>
            La descripción debe cumplir con al menos 50 caracteres.
          </Text>
        </Animatable.View>
      )}
      <View style={styles.button}>
        <TouchableOpacity
          disabled={
            data.title == null && data.description == null ? true : false
          }
          onPress={() => {
            saveData();
          }}
        >
          <LinearGradient
            colors={[
              commonStyles.colors.gradient2,
              commonStyles.colors.gradient1,
            ]}
            style={styles.signIn}
          >
            <Text style={styles.textSign}>Guardar</Text>
            <MaterialIcons name="save" color="#fff" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        <Divider />
      </View>

      <ScrollView>
        <Text>Historial</Text>
      </ScrollView>
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
  header: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "justify",
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
});
