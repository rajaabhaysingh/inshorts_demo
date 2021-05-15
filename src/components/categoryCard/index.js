import React from "react";
import clsx from "clsx";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";
import { Link } from "react-router-dom";

// components


// assets

// colors

// icons

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    background: theme.palette.background.bg,
    borderRadius: "8px",
    textDecoration: "none",
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
  catImg: {
    height: "80px",
    width: "80px",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "4px",
  },
}));

const CategoryCard = ({ category }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  return (
    <div className={globalCls.hovActive}>
      <Link to={`/${category.slug}`} className={clsx("fccc", cls.root)}>
        <img className={cls.catImg} src={category.categoryImage} alt="" />
        <div className={clsx("mar_t-8", "ellipsis", "fwb", globalCls.txtSmSec)}>
          {category.categoryName || "Unavailable"}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
