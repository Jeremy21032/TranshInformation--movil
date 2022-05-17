
import {
    doc,
    setDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    collectionGroup,
    getDoc,
    updateDoc,
} from "firebase/firestore";

export const getPersonalRol = async (email) => {
    const q = doc(global.dbCon, "/Roles", email);
    const docSnap = await getDoc(q);
    let tempRol = docSnap.data();

    // console.log("DOC SNAP", docSnap);
    console.log("TEMP ROL", tempRol);
    return tempRol;
};

export const savePersonal = async (person) => {
    console.log("----------- ENTRA AL GUARDAR LOS DATOS ---------------------");
    console.log(person);
    await setDoc(doc(global.dbCon, "/Personas", person.id), person);
};

export const savePersonalRol = async (person) => {
    await setDoc(doc(global.dbCon, "/Roles", person.email), person);
  };