import { FILL_NOTICES, FILL_RECOMENDATIONS, FILL_SERVICES, FILL_SUGGESTIONS, FILL_VIDEOS, FIREBASE_USER, IS_LOADING, UPDATE_USER_INFO } from "./AppTypes";

export const AppReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    case FILL_RECOMENDATIONS:
      return {
        ...state,
        recomendations: payload,
      };
    case FILL_SERVICES:
      return {
        ...state,
        services: payload,
      };
    case FILL_VIDEOS:
      return {
        ...state,
        videos: payload,
      };
    case FILL_SUGGESTIONS:
      return {
        ...state,
        suggestions: payload,
      };
    case FILL_NOTICES:
      return {
        ...state,
        notices: payload,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case FIREBASE_USER:
      return {
        ...state,
        userFirebase: payload,
      };

    default:
      return state;
  }
};
