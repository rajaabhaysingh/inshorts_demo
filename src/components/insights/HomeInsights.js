import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Link } from "react-router-dom";

// components
import Loader from "../loader";

// assets

// colors

// icons

// misc

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    marginTop: "4px",
    height: "1px",
    background: theme.palette.divider,
    width: "100%",
  },
  pad: { padding: "8px", boxSizing: "border-box" },
  insightsSlider: {
    display: "flex",
    alignItems: "center",
    overflowX: "scroll",
  },
  insightsBannerWrapper: {
    width: "200px",
    minWidth: "200px",
    height: "320px",
    // paddingTop: "200%",
    position: "relative",
    margin: "0 2px 8px 2px",
    padding: "4px",
    boxShadow: theme.shadows[4],
    boxSizing: "border-box",
    borderRadius: "8px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "175px",
      minWidth: "175px",
      height: "280px",
    },
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all ease-in 0.15s",
    },
  },
  insightsBanner: {
    width: "calc(100% - 8px)",
    height: "calc(100% - 8px)",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    position: "absolute",
    top: "4px",
    left: "4px",
    borderRadius: "6px",
  },
}));

const HomeInsights = ({ insightsArray }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const history = useHistory();

  return (
    <div className={cls.root}>
      <div className={clsx(cls.pad, "fcol")}>
        <div className={clsx("txtC fwb", globalCls.txtLgSec)}>Insights</div>
        <div className={clsx("txtC", globalCls.txtSmSec)}>
          Thse insights are by inshorts.
        </div>
        <div className={cls.divider}></div>
      </div>
      {insightsArray ? (
        <div className={clsx(cls.insightsSlider, "sb_hid")}>
          {insightsArray.map((banner, i) => (
            <div
              className={cls.insightsBannerWrapper}
              key={i}
              onClick={() => history.push("/insights")}
            >
              <img className={cls.insightsBanner} src={banner} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HomeInsights;
