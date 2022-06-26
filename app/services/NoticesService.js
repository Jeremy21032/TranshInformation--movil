import {
    collection,
    query,
    getDocs,
    where
  } from "firebase/firestore";

  export const getNotices =async(refreshFn,category)=>{
    const queryNotices = query(collection(global.dbCon,"/Noticias"),where("category","==",category));
    const querySnapshot = await getDocs(queryNotices);
    let tmpNotices = [];
    querySnapshot.forEach((noticeDoc)=>{
        tmpNotices.push(noticeDoc.data());
    })
    console.log("NoticesTmp: ",tmpNotices);
    refreshFn(tmpNotices);
  }
  export const getNotices2 =async(refreshFn)=>{
    const queryNotices = query(collection(global.dbCon,"/Noticias"));
    const querySnapshot = await getDocs(queryNotices);
    let tmpNotices = [];
    querySnapshot.forEach((noticeDoc)=>{
        tmpNotices.push(noticeDoc.data());
    })
    console.log("NoticesTmp: ",tmpNotices);
    refreshFn(tmpNotices);
  }