import { Box, styled, Tab, Tabs, Typography } from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../../pages/Vendor/vendor.module.scss";
import News from "../News";
import Products from "../Products";
import Promotions from "../Promotions";
import Translations from "../Translations";
import VendorFeedbacks from "../VendorFeedbacks";
import VendorPartners from "../VendorPartners";
import VendorProfile from "../VendorProfile";
import VendorQuestions from "../VendorQuestions";

const cx = classNames.bind(styles);

const QTabs = styled(Tabs)({
  marginBottom: "2rem",
  "& .MuiTabScrollButton-root": {
    borderRadius: "50px",
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#EB4F5A",
    height: "4px",
    borderRadius: "4px",
  },
  "& .MuiSvgIcon-fontSizeSmall": {
    fontSize: "2.29rem",
  },
});

const QTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  textTransform: "none",
  minWidth: 72,
  fontWeight: 600,
  fontSize: "1.4rem",
  lineHeight: "1.6rem",
  color: "#757575!important",
  "&:not(:last-child)": {
    marginRight: "4rem",
  },
  "&:hover": {
    color: "#EB4F5A",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#EB4F5A!important",
  },
  "&:focus": {
    color: "#EB4F5A",
  },
  selected: {},
}));

interface StyledTabProps {
  label?: string;
  value?: string;
}

const TabPanel = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  function setQuery(newQuery?: string) {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      tab: newQuery,
    });
  }

  const tab = searchParams.get("tab") ?? "";

  const onTabChange = (event: any, newValue: string) => {
    //setContent(newValue);
    setQuery(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
  }

  function QTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    if (!searchParams.has("tab")) {
      navigate("?tab=products", { replace: true });
    }
  }, [searchParams]);

  return (
    <Box className={cx("tabsContainer")}>
      {/*<Box className={cx("tabLine")} />*/}
      <QTabs
        value={tab || "products"}
        onChange={onTabChange}
        aria-label="vendor-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <QTab label="Все товары" value="products" />
        <QTab label="Профиль" value="profile" />
        <QTab label="Отзывы" value="reviews" />
        <QTab label="Вопросы" value="questions" />
        <QTab label="Новости магазина" value="newses" />
        <QTab label="Трансляции" value="translation" />
        <QTab label="Мои заказы" value="orders" />
        <QTab label="Акции" value="discount" />
        <QTab label="Партнеры" value="partners" />
      </QTabs>

      <QTabPanel value={tab} index="products">
        <Products />
      </QTabPanel>

      <QTabPanel value={tab} index="profile">
        <VendorProfile />
      </QTabPanel>

      <QTabPanel value={tab} index="reviews">
        <VendorFeedbacks />
      </QTabPanel>

      <QTabPanel value={tab} index="questions">
        <VendorQuestions />
      </QTabPanel>

      <QTabPanel value={tab} index="newses">
        <News />
      </QTabPanel>

      <QTabPanel value={tab} index="translation">
        <Translations />
      </QTabPanel>

      <QTabPanel value={tab} index="orders">
        <Typography variant="h2" sx={{ p: 3 }}>
          Заказов пока нет
        </Typography>
      </QTabPanel>

      <QTabPanel value={tab} index="discount">
        <Promotions />
      </QTabPanel>

      <QTabPanel value={tab} index="partners">
        <VendorPartners />
      </QTabPanel>
    </Box>
  );
};

export default TabPanel;
