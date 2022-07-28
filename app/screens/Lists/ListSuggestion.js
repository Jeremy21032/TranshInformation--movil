import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as commonStyles from "../../../assets/styles/appStyles";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { removeSuggestion } from "../../services/SuggestionsServices";
import { ModalInformation } from "../../components/ModalInformation";

export const ListSuggestion = ({ infoSuggestion, refresh }) => {
  const navigation = useNavigation();
  const [visible, isVisible] = useState(false);
  const [messageSelected, setMessageSelected] = useState("false");
  const [titleSelected, setTitleSelected] = useState("false");
  const [date,setDate]=useState("");
  const paperTheme = useTheme();
  const showModal = () => {
    console.log("Entra")
    isVisible(true)
    setMessageSelected(infoSuggestion.comment);
    setTitleSelected(infoSuggestion.section);
    setDate(infoSuggestion.timeStamp)
    console.log("Sale")
  };
  return (
    <View
      style={[
        styles.rowDes,
        {
          backgroundColor: paperTheme.colors.background,
          shadowColor: paperTheme.dark
            ? commonStyles.colors.white
            : paperTheme.colors.dark,
        },
      ]}
    >
      <View style={[{ flex: 1 }, styles.columnR]}>
        <MaterialCommunityIcons
          name="form-dropdown"
          size={30}
          color={paperTheme.colors.text}
        />
      </View>
      <View style={[{ flex: 4 }, styles.columnR]}>
        <Text style={{ color: paperTheme.colors.text }}>
          {infoSuggestion.section}
        </Text>
      </View>
      <View style={[{ flex: 1 }, styles.columnR]}>
        <TouchableOpacity onPress={() => showModal()}>
          <MaterialCommunityIcons
            name="eye"
            size={30}
            color={paperTheme.colors.text}
          />
        </TouchableOpacity>
      </View>
      <View style={[{ flex: 1 }, styles.columnR]}>
        <TouchableOpacity
          onPress={() => {
            removeSuggestion(infoSuggestion);
            refresh();
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
      <ModalInformation
        modalVisible={visible}
        setModalVisible={isVisible}
        message={messageSelected}
        title={titleSelected}
        date={date}
      ></ModalInformation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowDes: {
    flexDirection: "row",
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  columnR: {
    justifyContent: "center",
    alignItems: "center",
  },
});
