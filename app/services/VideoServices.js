import {
    doc,
    setDoc,
    collection,
    query,
    getDocs,
  } from "firebase/firestore";
  
  export const getVideos = async () => {
    const q = query(collection(global.dbCon, "/Videos"));
    const docSnap = await getDocs(q);
    let tempVideos = [];
    docSnap.forEach((docVideo) => {
      tempVideos.push(docVideo.data());
    });
    console.log("tempVideos", tempVideos);
    return tempVideos;
  };
  
  export const saveVideos=async(video)=>{
    await setDoc(doc(global.dbCon,"/Videos",video.id),video)
  
  }