import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import clsx from "clsx";

// styling
import {
  Button,
  Hidden,
  IconButton,
  makeStyles,
  Modal,
} from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components
import { Divide as Hamburger } from "hamburger-react";
import SideDrawer from "./SideDrawer";

// assets
import logoLight from "../../assets/img/logo_light.png";
import logoDark from "../../assets/img/logo_dark.png";

// colors

// icons
import {
  Brightness4TwoTone,
  BrightnessHighTwoTone,
  CloseTwoTone,
  SearchTwoTone,
} from "@material-ui/icons";

// redux
import { themeAction, changeMargin } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// variables for popup
let firstTime = true;

const useStyles = makeStyles((theme) => ({
  searchVisible: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "84px",
      transition: "ease-in 0.25s",
    },
  },
  searchHidden: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  },
  headerMain: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    minHeight: "60px",
    boxShadow: theme.shadows[1],
    padding: "0 8px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      color: theme.palette.text.white,
      borderBottom:
        theme.palette.type === "light"
          ? "none"
          : `1px solid ${theme.palette.divider}`,
    },
  },
  logo: {
    marginLeft: "16px",
    height: "32px",
    width: "172px",
    backgroundImage:
      theme.palette.type === "light" ? `url(${logoDark})` : `url(${logoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "24px",
      width: "135px",
      marginLeft: "8px",
      backgroundImage: `url(${logoLight})`,
    },
  },
  subheader: {
    width: "100%vw",
    height: "32px",
    padding: "0 24px",
    boxShadow: theme.shadows[6],
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.background.bg
        : theme.palette.background.paperLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  locationText: {
    fontSize: "0.85rem",
    color: theme.palette.primary.main,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px",
      height: "28px",
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  searchBar: {
    marginRight: "16px",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding:
        theme.palette.type === "light" ? "0 8px 8px 8px" : "8px 8px 8px 8px",
      boxSizing: "border-box",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      boxShadow: `0 4px 4px -2px rgba(0,0,0,0.35)`,
      width: "100vw",
    },
  },
  modal: {
    backgroundColor: theme.palette.background.bg,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90vw",
    maxWidth: "620px",
    maxHeight: "70vh",
    overflowY: "scroll",
    zIndex: 99999,
    marginTop: "60px",
  },
  link: {
    alignSelf: "flex-end",
    width: "100%",
    color: theme.palette.primary.main,
    padding: "8px",
    textDecoration: "none",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

const Header = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const helper = useSelector((state) => state.helper);

  // local state management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(firstTime);
  const [moreOptAnchorEl, setMoreOptAnchorEl] = useState(null);
  const [mobSearchVisible, setMobSearchVisible] = useState(
    helper.marginTop ? true : false
  );

  const moreOptionOpen = Boolean(moreOptAnchorEl);

  // headerlinks
  const headerlinks = [
    {
      title: "Discover",
      link: "/",
      icon: <i className="fas fa-home mar_r-4"></i>,
    },
    {
      title: "My Feeds",
      link: "/all",
      icon: <i className="fas fa-th mar_r-4"></i>,
    },
    {
      title: "Insights",
      link: "/insights",
      icon: <i className="fas fa-info-circle mar_r-4"></i>,
    },
  ];

  // handleThemeToggle
  const handleThemeToggle = () => {
    if (helper.themeName === "light") {
      dispatch(themeAction("dark"));
    } else {
      dispatch(themeAction("light"));
    }
  };

  // handleSearchSubmit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    history.push(`/jobs?q=${searchText}`);
  };

  // handleMobSearchToggle
  const handleMobSearchToggle = () => {
    setMobSearchVisible(!mobSearchVisible);

    if (mobSearchVisible) {
      dispatch(changeMargin(false));
    } else {
      dispatch(changeMargin(true));
    }

    if (moreOptionOpen) {
      setMoreOptAnchorEl(null);
    }
  };

  // renderSearchBar
  const renderSearchBar = () => {
    return (
      <form className={cls.searchBar} onSubmit={handleSearchSubmit}>
        <input
          className={globalCls.inputSearch}
          type="text"
          name="searchText"
          placeholder="Search for news"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className={globalCls.searchBtn}>
          <SearchTwoTone />
        </button>
      </form>
    );
  };

  return (
    <div className={cls.searchHidden} style={{ zIndex: "9999" }}>
      <div className={cls.headerMain}>
        <div className="fc">
          {/* mob view */}
          <Hidden mdUp implementation="css">
            <Hamburger
              rounded
              size={24}
              label="Show menu"
              toggled={isMenuOpen}
              toggle={setMenuOpen}
              hideOutline={false}
            />
            <SideDrawer
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
              headerlinks={headerlinks}
            />
          </Hidden>
          <Link to="/" className="fc">
            <div className={cls.logo}></div>
          </Link>
          <Hidden smDown implementation="css">
            <div className="mar_l-32 tagline">Because time is precious</div>
          </Hidden>
        </div>
        <div className="fc">
          {/* for mobile */}
          <Hidden mdUp implementation="css">
            <IconButton color="inherit" onClick={handleMobSearchToggle}>
              {mobSearchVisible ? <CloseTwoTone /> : <SearchTwoTone />}
            </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {helper.themeName === "light" ? (
                <Brightness4TwoTone />
              ) : (
                <BrightnessHighTwoTone />
              )}
            </IconButton>
          </Hidden>
          {/* for pc */}
          <Hidden smDown implementation="css">
            <div className="fc">
              {renderSearchBar()}
              <IconButton color="primary" onClick={handleThemeToggle}>
                {helper.themeName === "light" ? (
                  <Brightness4TwoTone />
                ) : (
                  <BrightnessHighTwoTone />
                )}
              </IconButton>
            </div>
          </Hidden>
        </div>
      </div>
      <div className={cls.subheader}>
        <div className="fc">
          {headerlinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
            >
              {link.icon} {link.title}
            </NavLink>
          ))}
        </div>
        <div className={clsx(cls.locationText, "sb_hid")}>
          <a className={cls.link} href="https://www.twitter.com/raja_ras">
            Connect on Twitter
          </a>
        </div>
      </div>
      {/* mob visible - search bar */}
      <Hidden mdUp implementation="css">
        {mobSearchVisible ? renderSearchBar() : null}
      </Hidden>
      <Modal
        open={isModelOpen}
        onClose={() => {
          firstTime = false;
          setIsModelOpen(false);
        }}
        className="fccc"
      >
        <div className={clsx(cls.modal, "sb_hid")}>
          <div className={globalCls.txtLgSec}>
            <strong>Feature instructions:</strong>
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-24")}>
            The website has 3 sections:
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-8 mar_l-8")}>
            <strong>- Home</strong>: Contains Inshorts app's "Discover" feature.
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-2 mar_l-8")}>
            <strong>- My Feeds</strong>: Swipe-up news reading feature like
            Inshorts app.
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-2 mar_l-8")}>
            <strong>- Insights</strong>: The Inshorts carousel feature of
            Inshorts app.
          </div>
          <div className={clsx(globalCls.txtSmSec, "mar_t-8")}>
            For better experience, view this website in a mobile device.
          </div>
          <div className="fcol">
            <Button
              className={globalCls.marT32}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                firstTime = false;
                setIsModelOpen(false);
              }}
            >
              Okay, Let me explore!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
