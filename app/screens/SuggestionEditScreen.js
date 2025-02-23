import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import * as commonStyles from "../../assets/styles/appStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { saveSuggestion } from "../services/SuggestionsServices";
import { getLastItem, saveLastItem } from "../services/GlobalServices";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoCorrect } from "../components/ModalInfoCorrect";
import { ModalInfoError } from "../components/ModalInfoError";
import AppContext from "../context/AppContext";
import { formattedDate } from "../Functions";

export const SuggestionEditScreen = ({ navigation, route }) => {
  const [modalVisibleError, setModalVisibleError] = React.useState(false);
  const [modalVisibleCorrect, setModalVisibleCorrect] = React.useState(false);
  const [messageCorrect, setMessageCorrect] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const { userInfo } = useContext(AppContext);
  let component = (
    <LoadingOverlay
      isVisible={isLoading}
      setIsLoading={setIsLoading}
      setModalVisibleError={setModalVisibleError}
      setMessageError={setMessageError}
    />
  );

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
    if (val.length >= 20) {
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
    setModalVisibleCorrect(true);
    setMessageCorrect("Sugerencia registrada con exito");
    setIsLoading(false);
    navigation.goBack();
  };
  const saveData = async () => {
    setIsLoading(true);
    let lastItem = await getLastItem();
    let newLastItem = parseInt(lastItem) + 1 + "s";
    let actualDate=formattedDate(new Date());
    let suggestion = {
      id: editing == true ? data.id : newLastItem,
      comment: data.description,
      section: data.title,
      name: userInfo.name,
      lastName: userInfo.lastName,
      email: userInfo.email,
      timeStamp:actualDate,
    };
    if (data.isValidDescription && data.isValidTitle) {
      await saveLastItem({ lasitemSuggestion: parseInt(lastItem) + 1 });
      await saveSuggestion(suggestion, canContinue);
    } else {
      setIsLoading(false);
      setModalVisibleError(true);
      setMessageError("Por favor, revisa el contenido de los campos");
    }
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
            La descripción debe cumplir con al menos 20 caracteres.
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
