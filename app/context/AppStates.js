import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useReducer } from "react";
import AppContext from "./AppContext";
import { AppReducer } from "./AppReducer";
import { FILL_RECOMENDATIONS, FILL_SERVICES, FIREBASE_USER, UPDATE_USER_INFO } from "./AppTypes";

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

  const handleFirebaseUser = useCallback((firebaseUser) => {
    dispatch({
      type: FIREBASE_USER,
      payload: firebaseUser,
    });
  }, []);
  const handleUserInfo = useCallback((infoUser) => {
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
      type:FILL_SERVICES,
      payload:contactsInfo,
    })
  },[]);
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
        handleFirebaseUser,
        handleUserInfo,
        signInUser,
        handleFillRecomendations,
        handleFillContacts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
