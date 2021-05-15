import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

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
  inshortContainer: {
    display: "flex",
    alignItems: "center",
    overflowX: "scroll",
  },
  inshortCardWrapper: {
    width: "800px",
    minWidth: "800px",
    minHeight: "200px",
    // maxHeight: "200px",
    overflowY: "scroll",
    margin: "0 8px 16px 2px",
    padding: "8px",
    boxShadow: theme.shadows[8],
    boxSizing: "border-box",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      minWidth: "80%",
      margin: "0 2px 8px 2px",
      minHeight: "540px",
    },
  },
  imgWrapper: {
    width: "200px",
    minWidth: "200px",
    // height: "200px",
    paddingTop: "25%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
      paddingTop: "100%",
    },
  },
  inshortImg: {
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    position: "absolute",
    top: "8px",
    left: "8px",
    borderRadius: "8px 0 0 8px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px 8px 0 0",
    },
  },
}));

const HomeInsights = ({ inshortsArray }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={cls.root}>
      <div className={clsx(cls.pad, "fcol")}>
        <div className={clsx("txtC fwb", globalCls.txtLgSec)}>Inshorts</div>
        <div className={clsx("txtC", globalCls.txtSmSec)}>
          Click an excerpt below to read in INSHORTS mode
        </div>
        <div className={cls.divider}></div>
      </div>
      {inshortsArray ? (
        <div className={clsx(cls.inshortContainer, "sb_hid mar_t-16")}>
          {inshortsArray.map((inshort, i) => (
            <div
              className={clsx(
                globalCls.pclr_mobtb,
                cls.inshortCardWrapper,
                "sb_hid"
              )}
              key={i}
            >
              <div className={cls.imgWrapper}>
                <img className={cls.inshortImg} src={inshort.images} alt="" />
              </div>
              <div className="fcol mar_t-16">
                <div className={clsx("fwb", globalCls.txtMdSec)}>
                  {inshort.title}
                </div>
                <div className="fc mar_t-4">
                  <div className={clsx("", globalCls.txtSmPriCol)}>
                    - {inshort.author}
                  </div>
                  <div className={clsx("mar_l-4", globalCls.txtSmSec)}>
                    {inshort.time}
                  </div>
                </div>
                <div className={clsx("mar_t-16", globalCls.txtSmSec)}>
                  {inshort.decription}
                </div>
              </div>
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
