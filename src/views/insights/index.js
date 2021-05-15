import React from "react";
import clsx from "clsx";
import Swiper from "react-id-swiper";
import "swiper/swiper-bundle.css";

// components
import Header from "../../components/header";
import Loader from "../../components/loader";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// assets
import insights1 from "../../assets/img/insights1.jpg";
import insights2 from "../../assets/img/insights2.jpg";
import insights3 from "../../assets/img/insights3.jpg";
import insights4 from "../../assets/img/insights4.jpg";
import insights5 from "../../assets/img/insights5.jpg";
import insights6 from "../../assets/img/insights6.jpg";
import insights7 from "../../assets/img/insights7.jpg";
import bg2 from "../../assets/img/bg1.jpg";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getInshorts } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  insightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${bg2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imgWrapper: {
    width: "340px",
    minWidth: "340px",
    paddingTop: "40%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      minWidth: "80vw",
      paddingTop: "130%",
    },
  },
  insightImg: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "8px",
  },
}));

const Insights = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  // const inshorts = useSelector((state) => state.inshorts);
  // const dispatch = useDispatch();

  // loadin categories on initial render
  // React.useEffect(() => {
  //   dispatch(getInshorts(categoryName));
  // }, []);

  const params = {
    spaceBetween: 20,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  };

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div
        style={{ overflow: "hidden" }}
        className={clsx(globalCls.bodyRoot, cls.insightContainer, "sb_hid")}
      >
        {1 > 0 ? (
          <Swiper {...params}>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights1} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights2} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights3} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights4} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights5} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights6} alt="" />
            </div>
            <div className={cls.imgWrapper}>
              <img className={cls.insightImg} src={insights7} alt="" />
            </div>
          </Swiper>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Insights;
