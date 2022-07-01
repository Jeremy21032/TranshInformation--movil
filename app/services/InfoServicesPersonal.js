import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const getPersonalRol = async (email) => {
  const q = doc(global.dbCon, "/Roles", email);
  const docSnap = await getDoc(q);
  let tempRol = docSnap.data();
  console.log("TEMP ROL", tempRol);
  return tempRol;
};

export const savePersonal = async (person) => {
  console.log("----------- ENTRA AL GUARDAR LOS DATOS ---------------------");
  console.log(person);
  await setDoc(doc(global.dbCon, "/Personas", person.email), person);
};

export const savePersonalRol = async (person) => {
  let email=person.email.toLowerCase;
  console.log(email)
  await setDoc(doc(global.dbCon, "/Roles", person.email), person);
};

export const getPersonalInfomation = async () => {
  const q = doc(global.dbCon, "/Personas/" + global.email);
  const docSnap = await getDoc(q);
  let person = docSnap.data();
  console.log("------- TRAE LA INFORMACION PERSONAL ---------");
  console.log(person);
  return person;
};

export const getPlaces = async () => {
  const q = doc(global.dbCon, "/Mapa/Direcciones");
  const docSnap = await getDoc(q);
  let places = docSnap.data();
  console.log(places.lugares);
  return places.lugares;
};
export const getDireccionBase = async (refreshFn, continueFn) => {
  const q = doc(global.dbCon, "/Personas/" + global.email);
  const docSnap = await getDoc(q);
  let person = docSnap.data();
  console.log("------- TRAE LA INFORMACION DIRECCION  ---------");
  console.log(person.direccionBase);
  refreshFn(person.direccionBase);
  continueFn();
};

export const aniadirDireccionBase = async (direccion, birthdate) => {
  const docRef = doc(global.dbCon, "/Personas/" + global.email);

  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, {
    direccionBase: direccion,
    birthdate: birthdate,
  });
};

export const updatePersona =async(persona)=>{
  const docRef = doc(global.dbCon, "/Personas/" + global.email);
  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, persona);
}
export const updatePersonaRol =async(persona, canContinue)=>{
  const docRef = doc(global.dbCon, "/Roles/" + global.email);
  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, persona);
  canContinue();
}