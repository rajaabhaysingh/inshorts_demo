import axios from "axios";
import { inshortsConstants } from "./constants";

// getInshorts
export const getInshorts = (category = "all") => {
  return async (dispatch) => {
    dispatch({
      type: inshortsConstants.GET_INSHORTS_REQUEST,
    });

    await axios
      .get(
        `https://cors-proxy-ras.herokuapp.com/https://inshorts-news.vercel.app/${category}`
      )
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;

          dispatch({
            type: inshortsConstants.GET_INSHORTS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: inshortsConstants.GET_INSHORTS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: inshortsConstants.GET_INSHORTS_FAILURE,
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
