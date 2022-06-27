import { doc, getDoc, setDoc } from "firebase/firestore";
export const getLastItem = async () => {
  const q = doc(global.dbCon, "/Configuracion/GlobalSuggestions/");
  const docSnap = await getDoc(q);
  console.log("docSnap.data().lasitemSuggestion:",docSnap.data().lasitemSuggestion)
  return docSnap.data().lasitemSuggestion;

};
export const saveLastItem = async (number) => {
  await setDoc(doc(global.dbCon, "/Configuracion/GlobalSuggestions/"), number);
};