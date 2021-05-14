/* eslint-disable import/no-anonymous-default-export */
import { helperConstants } from "../actions/constants";

const initialState = {
  themeName: "light",
  marginTop: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case helperConstants.THEME_CHANGE_REQUEST:
      state = {
        ...state,
        themeName: action.payload.themeName,
      };
      break;
      
    case helperConstants.MARGIN_CHANGE_REQUEST:
      state = {
        ...state,
        marginTop: action.payload.marginTop,
      };
      break;

    default:
      break;
  }

  return state;
};
