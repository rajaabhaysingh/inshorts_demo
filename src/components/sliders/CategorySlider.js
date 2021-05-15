import React from "react";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Alert, AlertTitle } from "@material-ui/lab";

// components
import CategoryCard from "../categoryCard";

// assets

// icons
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CategorySlider = ({ catList }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={clsx("fcol", globalCls.pad_lr_8_16)}>
      <div className={clsx("txtC fwb", globalCls.txtLgSec)}>
        News categories
      </div>
      <div className={clsx("txtC mar_t-", globalCls.txtSmSec)}>
        Select a category to read inshorts.
      </div>
      <div className={clsx("f mar_t-16 of_scr sb_hid")}>
        {catList?.length > 0 ? (
          catList.map((category, i) => (
            <CategoryCard category={category} key={i} />
          ))
        ) : (
          <div className={clsx(globalCls.pad_lr_8_16, "f1")}>
            <Alert className="f1" severity="info">
              <AlertTitle>NO CATEGORIES AVAILABLE</AlertTitle>
              It seems that there isn't any job available under this segment.
              You can check jobs under different categories or if you think this
              is a mistake, please contact website admins.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;
