import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useEffect } from "react";
import { useTheme } from "react-native-paper";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
const height = Dimensions.get("window").height;
import { mapStyle } from "../../assets/styles/mapStyle";
import AppContext from "../context/AppContext";

export const Home = () => {
  const { userInfo } = useContext(AppContext);
  const paperTheme = useTheme();
  let coordinates = [];
  useEffect(() => {
    coordinates = null;
    if (userInfo.direccionBase == null) {
      getData(userInfo.direccionBase);
    }
  }, []);
  let mapLocation = {
    alt: require("../json/Altamira.json"),
    batal: require("../json/Batan Alto.json"),
    bat: require("../json/Batan.json"),
    bel: require("../json/Belisario.json"),
    chori: require("../json/Centro Historico Oriental.json"),
    eggo: require("../json/El Giron-Guapulo.json"),
    frta: require("../json/Floresta.json"),
    jpjp: require("../json/Jipijapa.json"),
    lgsa: require("../json/La Gasca.json"),
    lg: require("../json/La Granja.json"),
    lcom: require("../json/laComuna.json"),
    mlsc: require("../json/Manuel Larrea-Santa Clara.json"),
    pnclo: require("../json/Panecillo.json"),
    prds: require("../json/Periodistas.json"),
    pdra: require("../json/Pradera.json"),
    tmyo: require("../json/Tamayo.json"),
  };
  const getData = (value) => {
    userInfo.direccionBase = value;
    switch (userInfo.direccionBase) {
      case "alt":
        coordinates = mapLocation.alt;
        break;
      case "lg":
        coordinates = mapLocation.lg;
        break;
      case "pdra":
        coordinates = mapLocation.pdra;
        break;
      case "pnclo":
        coordinates = mapLocation.pnclo;
        break;
      case "bat":
        coordinates = mapLocation.bat;
        break;
      case "batal":
        coordinates = mapLocation.batal;
        break;
      case "bel":
        coordinates = mapLocation.bel;
        break;
      case "chori":
        coordinates = mapLocation.chori;
        break;
      case "eggo":
        coordinates = mapLocation.eggo;
        break;
      case "frta":
        coordinates = mapLocation.frta;
        break;
      case "jpjp":
        coordinates = mapLocation.jpjp;
        break;
      case "lgsa":
        coordinates = mapLocation.lgsa;
        break;
      case "lcom":
        coordinates = mapLocation.lcom;
        break;
      case "mlsc":
        coordinates = mapLocation.mlsc;
        break;
      case "prds":
        coordinates = mapLocation.prds;
        break;
      default:
        break;
    }
  };

  getData(userInfo.direccionBase);

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.text, { color: paperTheme.colors.text }]}>
        {userInfo.name}
      </Text> */}
      {coordinates.length > 0 ? (
        <View>
          <MapView
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={{
              latitude: coordinates[0].calloutlatitude,
              longitude: coordinates[0].calloutlongitude,
              latitudeDelta: 0.01922,
              longitudeDelta: 0.00421,
            }}
            mapType="standard"
          >
            <Polygon
              coordinates={coordinates}
              fillColor={"rgba(100,200,200,0.3)"}
              strokeColor="coral"
              strokeWidth={3}
              tappable={true}
            ></Polygon>
          </MapView>
        </View>
      ) : (
        <MapView
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: -0.2755586,
            longitude: -78.5433207,
            latitudeDelta: 0.01922,
            longitudeDelta: 0.00421,
          }}
          mapType="standard"
        ></MapView>
      )}
      {coordinates.length > 0 ? (
        <View
          style={[
            { shadowColor: paperTheme.dark ? "white" : "#2e2e2e" },
            styles.box,
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: paperTheme.colors.text,
                marginVertical: 5,
                fontSize: 20,
              },
            ]}
          >
            {coordinates[0].ruta.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORARIO: {coordinates[0].horario.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            FRECUENCIA: {coordinates[0].frecuencia.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            Servicio: {coordinates[0].servicio.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            ADM_ZONAL: {coordinates[0].adm_zonal.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORAS: {coordinates[0].horas}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            CENTRO LOGÍSTICO: {coordinates[0].centroLogistico.toUpperCase()}
          </Text>
        </View>
      ) : (
        <View
          style={[
            { shadowColor: paperTheme.dark ? "white" : "#2e2e2e" },
            styles.box,
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: paperTheme.colors.text,
                marginVertical: 5,
                fontSize: 20,
              },
            ]}
          ></Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORARIO:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            FRECUENCIA:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            Servicio:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            ADM_ZONAL:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORAS:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            CENTRO LOGÍSTICO:
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
    borderWidth: 1,
    borderColor: "transparent",
    width: 350,
    height: 175,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: height / 2,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
