import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
const height = Dimensions.get("window").height;

export const Home = () => {
  var language = {
    en: require(`../json/Altamira.json`),
    lg: require(`../json/La Granja.json`),
  };

  console.log("Direccion global", global.direccionBase);
  const urlLocation = "../" + `json/${global.direccionBase}.json`;
  console.log("************************", urlLocation, typeof urlLocation);
  let coordinates;
  if (global.direccionBase == "en") {
    coordinates = language.en;
  } else if (global.direccionBase == "lg") {
    coordinates = language.lg;
    
  }
  const paperTheme = useTheme();

  useEffect(() => {
    coordinates = [];
  }, [coordinates]);
  const [data, setData] = useState({
    ruta: "",
    horario: "",
    frecuencia: "",
    servicio: "",
    adm_zonal: "",
    horas: "",
    centroLogistico: "",
  });
  const [location, setLocation] = useState({
    latitude: -0.2755586,
    longitude: -78.5433207,
  });

  const ComponenteFalso = () => {
    return <ActivityIndicator size="large" />;
  };
  const ComponenteVerdadero = () => {
    return (
      <ScrollView>
        <View
          style={{ flex: 1, height: Dimensions.get("window").height / 1.65 }}
        >
          <Text style={{ color: paperTheme.colors.text }}>
            Bienvenido {global.name} {global.lastName}
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled={true}
            showsUserLocation={true}
            zoomTapEnabled={true}
            region={{
              latitude: coordinates[0].calloutlatitude,
              longitude: coordinates[0].calloutlongitude,
              latitudeDelta: 0.01922,
              longitudeDelta: 0.00421,
            }}
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
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {coordinates != null && coordinates.length > 0 ? (
        <ComponenteVerdadero />
      ) : (
        <ComponenteFalso />
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
});
