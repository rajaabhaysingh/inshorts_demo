import React from "react";

// components
import Header from "../../components/header";
import HomeCarousel from "../../components/carousel/HomeCarousel";
import CategorySlider from "../../components/sliders/CategorySlider";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// assets
import insight_banner from "../../assets/img/insights_banner.jpg";
import polls_banner from "../../assets/img/polls_banner.jpg";
import covid_banner from "../../assets/img/covid_banner.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();

  const bannerArray = [
    {
      banner: covid_banner,
      actionUrl: "/insights",
    },
    {
      banner: insight_banner,
      actionUrl: "/insights",
    },
    {
      banner: polls_banner,
      actionUrl: "/insights",
    },
    {
      banner: insight_banner,
      actionUrl: "/insights",
    },
  ];

  const catList = [
    {
      _id: "s223",
      slug: "science",
      categoryName: "Science",
      categoryImage: "",
    },
  ];

  return (
    <div className={cls.root}>
      <Header helper={helper} />
      <div className={globalCls.bodyRoot}>
        <div className="fcol">
          <div className={globalCls.secContainer}>
            <HomeCarousel bannerArray={bannerArray} />
          </div>
          <div className={globalCls.secContainer}>
            <CategorySlider catList={catList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
