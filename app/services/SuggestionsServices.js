import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  collection,
  deleteDoc,
  where,
} from "firebase/firestore";

export const saveSuggestion = async (suggestion, canContinue) => {
  console.log(
    "----------- ENTRA AL GUARDAR LOS DATOS DE SUGERENCIA ---------------------"
  );
  console.log(suggestion);
  await setDoc(doc(global.dbCon, "/Sugerencias", suggestion.id), suggestion);
  canContinue();
};
export const getSuggestion = async (refreshFn) => {
  const q = query(collection(global.dbCon, "/Sugerencias"), where("email","==",global.email));
  const docSnap = await getDocs(q);
  let tmpSuggestions = [];
  docSnap.forEach((docSuggestion) => {
    tmpSuggestions.push(docSuggestion.data());
  });
  console.log("tmpSuggestions", tmpSuggestions);
  refreshFn(tmpSuggestions);
};

export const removeSuggestion = async (suggestion) => {
  deleteDoc(doc(global.dbCon, "/Sugerencias", suggestion.id));
};
