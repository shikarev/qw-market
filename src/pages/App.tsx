import { Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { Loading } from '@qwangy/styles';
import React, { Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import WishesPopup from '../components/common/WishesPopup';
import Footer from '../components/Footer';
import '../index.scss';
import { store } from '../store';
import { getDesignTokens } from '../theme';
import ScrollToTop from '../utils/scrollToTop';
import MainRoutes from './MainRoutes';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createTheme(
      //getDesignTokens(prefersDarkMode ? 'dark' : 'light')
      getDesignTokens('light')
    ), [ prefersDarkMode ]);

  return (
    <Provider store={store}>
      <CookiesProvider>
        {/*<Auth />*/}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loading />}>
              <BrowserRouter basename="marketplace/">
                <ScrollToTop />
                <WishesPopup />
                <Navigation />
                <Footer />
              </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  );
};

const Navigation = () => {
  return (
    <Box className={'main-container'}>
      <MainRoutes />
    </Box>
  )
}

export default App;
