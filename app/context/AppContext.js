import React, { useReducer, useState } from "react";
const AppContext = React.createContext();

const initialState = {
  user: {
    birthdate: "",
    direccionBase: "",
    id: "",
    lastName: "",
    name: "",
    profilePic: "",
    direccionBase:""
  },
  activo: false,
};

const userReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case "sign-in":
      console.log("Bienvenidos al sistema");
      return {
        ...state,
        user: payload.data,
        activo: true,
      };
    case "sign":
      return console.log("Usuario guardado");

    case "sign-out":
      return console.log("Sesión cerrada");
  }
};

function AppProvider({ children }) {
  const [login, loginAction] = useReducer(userReducer, initialState);
  return (
    <AppContext.Provider value={{  login, loginAction }}>
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
