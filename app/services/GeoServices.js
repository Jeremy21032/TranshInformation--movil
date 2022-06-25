import { collection, getDocs } from "firebase/firestore";

export const getLocation = async (direccion) => {
  const queryData = collection(global.dbCon, "/Mapa/Direcciones/", direccion);
  const queryLocation = await getDocs(queryData);
  let tmpMapa = [];
  queryLocation.forEach((document) => {
    tmpMapa.push(document.data());
  });
  if (tmpMapa.length > 0) {
    global.coordenadas = tmpMapa;
    if (global.coordenadas != null && global.coordenadas.length > 0) {
      console.log(tmpMapa);
      return tmpMapa;
    }
  }
};

export const getLocation2 = async (location) => {
  const queryLocation = collection(global.dbCon, "/Mapa/Direcciones", location);
  const querySnapshot = await getDocs(queryLocation);
  let locationTmp = [];
  querySnapshot.forEach((document) => {
    locationTmp.push(document.data());
  });
  return locationTmp;
};
