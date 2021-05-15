import axiosIntance from "../../helpers/axios";
import { categoryConstants } from "./constants";

// getAllCategory
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_CATEGORIES_REQUEST,
    });

    await axiosIntance
      .get("/categories")
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          dispatch({
            type: categoryConstants.GET_CATEGORIES_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: categoryConstants.GET_CATEGORIES_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: categoryConstants.GET_CATEGORIES_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};
