import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useCallback, useReducer } from "react";
import AppContext from "./AppContext";
import { AppReducer } from "./AppReducer";
import {
  FILL_RECOMENDATIONS,
  FILL_SERVICES,
  SEND_EMAIL,
  FIREBASE_USER,
  UPDATE_USER_INFO,
  FONT_SIZE,
} from "./AppTypes";

export const AppStates = ({ children }) => {
  const initialValue = {
    userInfo: null,
    userFirebase: null,
    isLoading: false,
    recomendations: null,
    services: null,
    videos: null,
    suggestions: null,
    notices: null,
    sendEmail: null,
    fontSize: 18,
  };
  const [state, dispatch] = useReducer(AppReducer, initialValue);
  const signInUser = useCallback(async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        handleFirebaseUser(user);
        console.log(user);
        console.log("Sign in!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error>>>>: ", (errorCode, errorMessage));
      });
  }, []);
  const sendEmail = useCallback(async (email) => {
    const auth = getAuth();

    await sendPasswordResetEmail(auth, email);
  }, []);
  const handleFirebaseUser = useCallback((firebaseUser) => {
    dispatch({
      type: FIREBASE_USER,
      payload: firebaseUser,
    });
  }, []);
  const handleUserInfo = useCallback(async(infoUser) => {
    console.log("datos a actualizar",infoUser)
    dispatch({
      type: UPDATE_USER_INFO,
      payload: infoUser,
    });
  }, []);
  const handleFillRecomendations = useCallback((recomendationsInfo) => {
    dispatch({
      type: FILL_RECOMENDATIONS,
      payload: recomendationsInfo,
    });
  }, []);
  const handleFillContacts = useCallback((contactsInfo) => {
    dispatch({
      type: FILL_SERVICES,
      payload: contactsInfo,
    });
  }, []);
  const handleSendEmail = useCallback((emailInfo) => {
    dispatch({
      type: SEND_EMAIL,
      payload: emailInfo,
    });
  }, []);
  const handleChangeFontSize = useCallback((value) => {
    handleSetFontSize(value);
  }, []);
  const handleSetFontSize = useCallback((fontSize) => {
    dispatch({
      type: FONT_SIZE,
      payload: fontSize,
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        userInfo: state.userInfo,
        userFirebase: state.userFirebase,
        isLoading: state.isLoading,
        recomendations: state.recomendations,
        services: state.services,
        videos: state.videos,
        suggestions: state.suggestions,
        notices: state.notices,
        fontSize: state.fontSize,
        handleFirebaseUser,
        handleUserInfo,
        signInUser,
        handleFillRecomendations,
        handleFillContacts,
        sendEmail,
        handleSetFontSize,
        handleChangeFontSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
