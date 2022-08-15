import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { Icon } from "react-native-elements";
import * as commonStyles from "../../assets/styles/appStyles";

export const ModalInfoAlerta = ({
  modalVisible,
  setModalVisible,
  message,
  functionE,
  title
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <View style={styles.viewDirrect}>
            <View style={{ paddingLeft: 110 }}>
              <Icon
                name="alert-circle-outline"
                type="ionicon"
                size={90}
                color="#B2ABA4"
              />
            </View>
            <View style={{ paddingLeft: 60 }}>
              <Icon
                name="close"
                type="ionicon"
                size={35}
                color="#00C7B1"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
          <Text style={styles.modalTitle}>SE ELIMINARÁ PERMANENTEMENTE</Text>
          <View style={[styles.viewFlex]}>
            <Text style={styles.textMessage}>{title}</Text>
            <Text style={styles.modalSubtitle}>{message}</Text>
          </View>
          <View style={{ flexDirection: "row-reverse", marginVertical: 20 }}>
            <View style={{ flexDirection: "column", marginHorizontal: 5 }}>
              <Button title="Confirmar" color={commonStyles.colors.darkCyan} onPress={()=>functionE()}/>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 5 }}>
              <Button
                title="Cancelar"
                color={commonStyles.colors.redOrangeColorWheel}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textMessage: {
    fontSize: 18,
    color: "#000000",
    textAlign: "justify",
    fontWeight: "bold",
  },
  viewFlex: {
    alignItems: "flex-start",
  },modalSubtitle: {
    marginBottom: 5,
    color: "#000000",
    textAlign: "justify",
    fontSize: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewDirrect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalText: {
    marginBottom: 15,
    fontSize: 15,
    color: "#979797",
  },
  modalSubTex: {
    marginBottom: 5,
    color: "#979797",
    fontSize: 15,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  viewDirrect: {
    flexDirection: "row",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    color: "#979797",
  },
  modalSubtitle: {
    marginBottom: 5,
    color: "#979797",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  itemModalStyle: {
    flexDirection: "row",
  },
});
