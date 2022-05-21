import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import { useTheme, Sc } from '@react-navigation/native';
import React from 'react'
import { getLocation } from '../services/GeoServices';
import MapView, { Callout, Polygon, PROVIDER_GOOGLE } from 'react-native-maps'
import { Modal } from 'react-native-paper';
import SceneView from 'react-native-scene-view';
// import  SceneView  from 'react-navigation';


const height = Dimensions.get('window').height;
export const HomeScreen = ({ route }) => {

  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [visibleCallOut, setVisibleCallOut] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState(null);
  const [data, setData] = React.useState({
    coordinates: [],

  })
  let final = null;
  if (route != null && route.params != null && route.params.items != null) {
    console.log(route.params)
    setCoordinates(route.params.items);
    final = coordinates.sort((a, b) => a.id - b.id);
  }
  const refreshFn = (val) => {
    setData({ ...data, coordinates: val })
  }
  React.useEffect(() => {
    getLocation(refreshFn, global.direccionBase);
  }, [])
  const showCallout = () => {
    setVisibleCallOut(true);
  }
  const hideCallout = () => {
    setVisibleCallOut(false);
  }
  const funcion = () => {
    console.log("PRESSED", visible);

  }
  return (
    <View>
      {data.coordinates == null ? <ActivityIndicator size="large" /> :
        <>
          <Text style={{ color: colors.text }}>HomeScreen</Text>
          <Text style={{ color: colors.text }}>{data.coordinates.length}</Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled={true}
            showsUserLocation={true}
            zoomTapEnabled={true}
            region={{
              latitude: data.coordinates[0].latitude,
              longitude: data.coordinates[0].longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            <Polygon
              coordinates={data.coordinates.sort((a, b) => a.id - b.id)}
              fillColor={'rgba(100,200,200,0.3)'}
              strokeColor="coral"
              strokeWidth={3}
              tappable={true}
              onPress={() => {
                funcion()
              }} ></Polygon>

            <MapView.Marker
              key={"1"}
              coordinate={{ latitude: -0.17989, longitude: -78.50273 }}
              title={"Titulo"}
              description={"description"}
            >

              <Callout>
                <Text>Ruta: {data.coordinates[0].ruta}</Text>
                <Text>Horario: {data.coordinates[0].horario}</Text>
                <Text>Frecuencia: {data.coordinates[0].frecuencia}</Text>
                <Text>Servicio: {data.coordinates[0].servicio}</Text>
                <Text>ADM_ZONAL: {data.coordinates[0].adm_zonal}</Text>
                <Text>Horas: {data.coordinates[0].horas}</Text>
                <Text>Centro Logístico: {data.coordinates[0].centroLogistico}</Text>
              </Callout>
            </MapView.Marker>
          </MapView>
        </>}
      <Modal visible={visible} />
    </View>
  )
}

const styles = StyleSheet.create({
  map: { width: Dimensions.get('window').width, height: height / 2 }
})