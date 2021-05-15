import { categoryConstants } from "../actions/constants";

const initialState = {
  fetchLoading: false,
  fetchData: [],
  fetchSuccessful: false,
  fetchError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORIES_REQUEST:
      state = {
        ...state,
        fetchLoading: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_CATEGORIES_SUCCESS:
      state = {
        ...state,
        fetchData: action.payload.data,
        fetchLoading: false,
        fetchSuccessful: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_CATEGORIES_FAILURE:
      state = {
        ...state,
        fetchData: [],
        fetchLoading: false,
        fetchSuccessful: false,
        fetchError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
