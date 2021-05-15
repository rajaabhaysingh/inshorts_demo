import React from "react";

// components
import Header from "../../components/header";
import HomeCarousel from "../../components/carousel/HomeCarousel";
import CategorySlider from "../../components/sliders/CategorySlider";
import HomeInsights from "../../components/insights/HomeInsights";
import HomeInshorts from "../../components/inshorts/HomeInshorts";

// styling
import { makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// assets
import banner1 from "../../assets/img/banner1.jpg";
import banner2 from "../../assets/img/banner2.jpg";
import banner3 from "../../assets/img/banner3.jpg";
import banner4 from "../../assets/img/banner4.jpg";
import insights1 from "../../assets/img/insights1.jpg";
import insights2 from "../../assets/img/insights2.jpg";
import insights3 from "../../assets/img/insights3.jpg";
import insights4 from "../../assets/img/insights4.jpg";
import insights5 from "../../assets/img/insights5.jpg";
import insights6 from "../../assets/img/insights6.jpg";
import insights7 from "../../assets/img/insights7.jpg";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getInshorts } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.bg,
  },
}));

const Home = ({ helper }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const categories = useSelector((state) => state.categories);
  const inshorts = useSelector((state) => state.inshorts);
  const dispatch = useDispatch();

  console.log("Loggging inshorts...", inshorts);

  // loadin categories on initial render
  React.useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getInshorts());
  }, []);

  const bannerArray = [
    {
      banner: banner2,
      actionUrl: "/all",
    },
    {
      banner: banner1,
      actionUrl: "/insights",
    },
    {
      banner: banner3,
      actionUrl: "/",
    },
    {
      banner: banner4,
      actionUrl: "/",
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
            <HomeInshorts inshortsArray={inshorts?.inshortsData?.data} />
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
