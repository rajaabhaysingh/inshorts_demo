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
import insights1 from "../../assets/img/insights1.jpg";
import insights2 from "../../assets/img/insights2.jpg";
import insights3 from "../../assets/img/insights3.jpg";
import insights4 from "../../assets/img/insights4.jpg";
import insights5 from "../../assets/img/insights5.jpg";
import insights6 from "../../assets/img/insights6.jpg";
import insights7 from "../../assets/img/insights7.jpg";
import HomeInsights from "../../components/insights/HomeInsights";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  console.log("Loggging categories...", categories);

  // loadin categories on initial render
  React.useEffect(() => {
    dispatch(getAllCategory());
  }, []);

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

  const insightsArray = [
    insights1,
    insights2,
    insights3,
    insights4,
    insights5,
    insights6,
    insights7,
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
            <CategorySlider catList={categories?.fetchData} />
          </div>
          <div className={globalCls.secContainer}>
            <HomeInsights insightsArray={insightsArray} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
