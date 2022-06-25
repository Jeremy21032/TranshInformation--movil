import {  collection, getDocs, query } from "firebase/firestore";

export const getContacts = async (refreshFn) => {
    const queryContacts = query(collection(global.dbCon,"/Contactos"));
    const querySnapshot = await getDocs(queryContacts);
    let tmpContacts = [];
    querySnapshot.forEach((noticeDoc)=>{
        tmpContacts.push(noticeDoc.data());
    })
    console.log("Contacts---------------------------: ",tmpContacts);
    refreshFn(tmpContacts);
};