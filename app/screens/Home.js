import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
const height = Dimensions.get("window").height;
import * as commonStyles from "../../assets/styles/appStyles";

import { mapStyle } from "../../assets/styles/mapStyle";

export const Home = () => {
  const paperTheme = useTheme();
  let coordinates = [];
  useEffect(() => {
    coordinates = null;
    if (global.direccionBase == null) {
      getData(global.direccionBase);
    }
  }, []);
  const [name, setName] = useState("");
  var mapLocation = {
    alt: require("../json/Altamira.json"),
    lg: require("../json/La Granja.json"),
  };
  const getData = (value) => {
    global.direccionBase = value;
    if (global.direccionBase == "alt") {
      coordinates = mapLocation.alt;
    } else if (global.direccionBase == "lg") {
      coordinates = mapLocation.lg;
    }
  };

  if (global.direccionBase == "alt") {
    coordinates = mapLocation.alt;
  } else if (global.direccionBase == "lg") {
    coordinates = mapLocation.lg;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: paperTheme.colors.text }]}>
        {global.name}
      </Text>
      {coordinates.length > 0 ? (
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
