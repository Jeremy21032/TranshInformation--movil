import { StyleSheet, Text, View, Modal } from "react-native";
import { Icon } from "react-native-elements";

export const ModalInformation = ({ modalVisible, setModalVisible }) => {
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
                name="information-circle-outline"
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
          <Text style={styles.modalTitle}>CRÉDITO INDIVIDUAL SIMPLE</Text>
          <View style={[styles.viewFlex]}>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Edad: </Text>
              <Text style={styles.modalSubTex}> 25 a 50 años</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Plazos: </Text>
              <Text style={styles.modalSubTex}> 6 meses</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Frecuencia de pagos: </Text>
              <Text style={styles.modalSubTex}>Catorcenal y mensual</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Tasa: </Text>
              <Text style={styles.modalSubTex}> {global.rate}% + IVA</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Monto: </Text>
              <Text style={styles.modalSubTex}> Desde $5000 hasta $6000</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Ingreso mínimo: </Text>
              <Text style={styles.modalSubTex}> $1500</Text>
            </View>
            <View style={styles.itemModalStyle}>
              <Text style={styles.modalSubtitle}>Comisión por atraso: </Text>
              <Text style={styles.modalSubTex}> $180 + IVA </Text>
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
  viewFlex: {
    alignItems: "flex-start",
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
