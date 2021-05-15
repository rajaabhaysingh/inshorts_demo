import { inshortsConstants } from "../actions/constants";

const initialState = {
  inshortsLoading: false,
  inshortsData: [],
  inshortsSuccessful: false,
  inshortsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case inshortsConstants.GET_INSHORTS_REQUEST:
      state = {
        ...state,
        inshortsLoading: true,
        inshortsError: null,
      };
      break;

    case inshortsConstants.GET_INSHORTS_SUCCESS:
      state = {
        ...state,
        inshortsData: action.payload.data,
        inshortsLoading: false,
        inshortsSuccessful: true,
        inshortsError: null,
      };
      break;

    case inshortsConstants.GET_INSHORTS_FAILURE:
      state = {
        ...state,
        inshortsData: [],
        inshortsLoading: false,
        inshortsSuccessful: false,
        inshortsError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
