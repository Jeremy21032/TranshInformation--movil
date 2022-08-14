import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const getPersonalRol = async (email) => {
  console.log("EMAIL→ ", email);
  console.log("ENTRA A VERIIFICAR EL ROL");
  const docSnap = await getDoc(doc(global.dbCon, "/Roles", email));
  console.log(
    "----------------------------------------------------------------------"
  );
  console.log(docSnap.data());
  console.log(
    "----------------------------------------------------------------------"
  );
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
  let email = person.email.toLowerCase;
  console.log(email);
  await setDoc(doc(global.dbCon, "/Roles", person.email), person);
};

export const getPersonalInfomation = async (email) => {
  const q = doc(global.dbCon, "/Personas/" + email);
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
export const getDireccionBase = async (email, refreshFn, setModalVisibleCorrect,setMessageCorrect,continueFn) => {
  const q = doc(global.dbCon, "/Personas/" + email);
  const docSnap = await getDoc(q);
  let person = docSnap.data();
  console.log("------- TRAE LA INFORMACION DIRECCION  ---------");
  console.log(person.direccionBase);
  refreshFn(person.direccionBase);
  setModalVisibleCorrect(true);
  setMessageCorrect(
    "Información actualizada con éxito \n Por favor, inicie sesión con sus credenciales."
  );
  continueFn();
};

export const aniadirDireccionBase = async (
  email,
  direccionBase,
  direccion,
  birthdate
) => {
  const docRef = doc(global.dbCon, "/Personas/" + email);

  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, {
    direccionBase: direccionBase,
    birthdate: birthdate,
    direccion: direccion,
  });
};

export const updatePersona = async (persona, canContinue) => {
  console.log("-----------ENTRA A updatePersona------------", persona);
  const docRef = doc(global.dbCon, "/Personas/" + persona.email);
  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, persona);
  canContinue();
};
export const updatePersonaRol = async (persona, canContinue) => {
  const docRef = doc(global.dbCon, "/Roles/" + persona.email);
  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();
  console.log(docResultData);
  await updateDoc(docRef, persona);
  canContinue();
};
