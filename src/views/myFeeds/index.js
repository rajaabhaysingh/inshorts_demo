import React from "react";
import { useParams, useHistory } from "react-router-dom";
import clsx from "clsx";
import ReactCardFlip from "react-card-flip";

// components
import Header from "../../components/header";
import Loader from "../../components/loader";

// styling
import { Hidden, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getInshorts } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
  inshortCardWrapper: {
    width: "calc(100% - 4px)",
    minWidth: "calc(100% - 4px)",
    minHeight: "calc(50vh - 130px)",
    maxHeight: "calc(50vh - 130px)",
    height: "calc(50vh - 130px)",
    overflowY: "hidden",
    margin: "0 8px 16px 2px",
    padding: "8px",
    boxShadow: theme.shadows[8],
    boxSizing: "border-box",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
      margin: "0 0 8px 0",
      maxHeight: "calc(80vh - 60px)",
      height: "calc(80vh - 60px)",
    },
  },
  imgWrapper: {
    width: "300px",
    minWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
      height: "100%",
    },
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  inshortImg: {
    width: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "8px 0 0 8px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px 8px 0 0",
      height: "100%",
    },
  },
  linkWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  link: {
    width: "100%",
    color: theme.palette.primary.main,
    padding: "8px",
    background: theme.palette.divider,
    textDecoration: "none",
    borderRadius: "4px",
    textAlign: "center",
  },
  arrowBtn: {
    height: "50px",
    width: "50px",
    padding: "4px",
    boxSizing: "border-box",
    borderRadius: "50px",
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "2rem",
    color: theme.palette.text.tertiary,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      boxShadow: theme.shadows[8],
    },
  },
  arrowBtnMob: {
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "3rem",
    textShadow: "0 4px 8px rgba(0,0,0,0.5)",
    position: "absolute",
    top: "75vh",
    color: theme.palette.text.tertiary,
    background: "#00000000",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const MyFeeds = ({ helper }) => {
  // local state management
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const { categoryName } = useParams();
  const history = useHistory();
  const inshorts = useSelector((state) => state.inshorts);
  const dispatch = useDispatch();

  console.log("Logging activeIndex...", activeIndex);

  // loadin categories on initial render
  React.useEffect(() => {
    dispatch(getInshorts(categoryName));
  }, []);

  // increseActiveIndex
  const increseActiveIndex = () => {
    setIsFlipped(!isFlipped);

    if (activeIndex === 23) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  // decreaseActiveIndex
  const decreaseActiveIndex = () => {
    setIsFlipped(!isFlipped);

    if (activeIndex === 0) {
      setActiveIndex(23);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  // ==================
  // Adding swipe functionality
  let startingY = null;
  let startingX = null;

  // fun handleTouchStart
  const handleTouchStart = (e) => {
    startingY = e.touches[0].clientY;
    startingX = e.touches[0].clientX;
  };

  // fun handleTouchMove
  const handleTouchMove = (e) => {};

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    var changeY = startingY - e.changedTouches[0].clientY;
    var changeX = startingX - e.changedTouches[0].clientX;

    // if swipe is left-right
    if (Math.abs(changeX) > Math.abs(changeY)) {
      if (changeX < 0) {
        //  user swiped left
        history.push("/");
      } else {
        //  user has swiped right
        history.push(inshorts?.inshortsData?.data[activeIndex]["read-more"]);
      }
    } else {
      // if swipe is significant
      if (Math.abs(changeY) > 10) {
        if (changeY > 0) {
          increseActiveIndex();
        } else {
          decreaseActiveIndex();
        }
      }
    }
  };
  // ====== swipe functionality ends =======

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div style={{ overflow: "hidden" }} className={globalCls.bodyRoot}>
        {inshorts.inshortsData?.data?.length > 0 ? (
          <div
            className={clsx(globalCls.pcMarT8, "fcol rel")}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Hidden smDown>
              <button
                className={clsx(cls.arrowBtn, "mar_b-16")}
                onClick={decreaseActiveIndex}
              >
                <i className="fas fa-chevron-up mar_b-2"></i>
              </button>
            </Hidden>
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection="vertical"
              infinite={true}
            >
              <div
                className={clsx(globalCls.pclr_mobtb, cls.inshortCardWrapper)}
              >
                <div
                  style={{
                    backgroundImage: `url(${inshorts.inshortsData.data[activeIndex].images})`,
                  }}
                  className={cls.imgWrapper}
                ></div>
                <div
                  className={clsx(globalCls.pcMarL_mobMarT16, "fcol mar_t-16")}
                >
                  <div className={clsx("fwb", globalCls.txtLgSec)}>
                    {inshorts.inshortsData.data[activeIndex].title}
                  </div>
                  <div className="fc mar_t-4">
                    <div className={clsx("", globalCls.txtSmPriCol)}>
                      - {inshorts.inshortsData.data[activeIndex].author}
                    </div>
                    <div className={clsx("mar_l-4", globalCls.txtSmSec)}>
                      {inshorts.inshortsData.data[activeIndex].time}
                    </div>
                  </div>
                  <div className={clsx("mar_t-16", globalCls.txtMdSec)}>
                    {inshorts.inshortsData.data[activeIndex].decription}
                  </div>
                  <div className={cls.linkWrapper}>
                    <a
                      href={
                        inshorts.inshortsData.data[activeIndex]["read-more"]
                      }
                      className={clsx("mar_t-16", cls.link)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  globalCls.pclr_mobtb,
                  cls.inshortCardWrapper,
                  "sb_hid"
                )}
              >
                <div
                  style={{
                    backgroundImage: `url(${inshorts.inshortsData.data[activeIndex].images})`,
                  }}
                  className={cls.imgWrapper}
                ></div>
                <div
                  className={clsx(globalCls.pcMarL_mobMarT16, "fcol mar_t-16")}
                >
                  <div className={clsx("fwb", globalCls.txtLgSec)}>
                    {inshorts.inshortsData.data[activeIndex].title}
                  </div>
                  <div className="fc mar_t-4">
                    <div className={clsx("", globalCls.txtSmPriCol)}>
                      - {inshorts.inshortsData.data[activeIndex].author}
                    </div>
                    <div className={clsx("mar_l-4", globalCls.txtSmSec)}>
                      {inshorts.inshortsData.data[activeIndex].time}
                    </div>
                  </div>
                  <div className={clsx("mar_t-16", globalCls.txtMdSec)}>
                    {inshorts.inshortsData.data[activeIndex].decription}
                  </div>
                  <div className={cls.linkWrapper}>
                    <a
                      href={
                        inshorts.inshortsData.data[activeIndex]["read-more"]
                      }
                      className={clsx("mar_t-16", cls.link)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </ReactCardFlip>
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection="vertical"
              infinite={true}
            >
              <div
                className={clsx(globalCls.pclr_mobtb, cls.inshortCardWrapper)}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      inshorts.inshortsData.data[activeIndex + 1].images
                    })`,
                  }}
                  className={cls.imgWrapper}
                ></div>
                <div
                  className={clsx(globalCls.pcMarL_mobMarT16, "fcol mar_t-16")}
                >
                  <div className={clsx("fwb", globalCls.txtLgSec)}>
                    {inshorts.inshortsData.data[activeIndex + 1].title}
                  </div>
                  <div className="fc mar_t-4">
                    <div className={clsx("", globalCls.txtSmPriCol)}>
                      - {inshorts.inshortsData.data[activeIndex + 1].author}
                    </div>
                    <div className={clsx("mar_l-4", globalCls.txtSmSec)}>
                      {inshorts.inshortsData.data[activeIndex + 1].time}
                    </div>
                  </div>
                  <div className={clsx("mar_t-16", globalCls.txtMdSec)}>
                    {inshorts.inshortsData.data[activeIndex + 1].decription}
                  </div>
                  <div className={cls.linkWrapper}>
                    <a
                      href={
                        inshorts.inshortsData.data[activeIndex + 1]["read-more"]
                      }
                      className={clsx("mar_t-16", cls.link)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  globalCls.pclr_mobtb,
                  cls.inshortCardWrapper,
                  "sb_hid"
                )}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      inshorts.inshortsData.data[activeIndex + 1].images
                    })`,
                  }}
                  className={cls.imgWrapper}
                ></div>
                <div
                  className={clsx(globalCls.pcMarL_mobMarT16, "fcol mar_t-16")}
                >
                  <div className={clsx("fwb", globalCls.txtLgSec)}>
                    {inshorts.inshortsData.data[activeIndex + 1].title}
                  </div>
                  <div className="fc mar_t-4">
                    <div className={clsx("", globalCls.txtSmPriCol)}>
                      - {inshorts.inshortsData.data[activeIndex + 1].author}
                    </div>
                    <div className={clsx("mar_l-4", globalCls.txtSmSec)}>
                      {inshorts.inshortsData.data[activeIndex + 1].time}
                    </div>
                  </div>
                  <div className={clsx("mar_t-16", globalCls.txtMdSec)}>
                    {inshorts.inshortsData.data[activeIndex + 1].decription}
                  </div>
                  <div className={cls.linkWrapper}>
                    <a
                      href={
                        inshorts.inshortsData.data[activeIndex + 1]["read-more"]
                      }
                      className={clsx("mar_t-16", cls.link)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </ReactCardFlip>
            <Hidden smDown>
              <button className={cls.arrowBtn} onClick={increseActiveIndex}>
                <i className="fas fa-chevron-down mar_t-4"></i>
              </button>
            </Hidden>
            <Hidden mdUp>
              <button className={cls.arrowBtnMob} onClick={increseActiveIndex}>
                <i className="fas fa-chevron-up mar_t-4"></i>
              </button>
            </Hidden>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default MyFeeds;
