import colors from './colors';
import { PaletteMode } from '@mui/material';
import { getGlobalDesignTokens } from '@qwangy/styles';

export const getDesignTokens: any = (mode: PaletteMode) => {
  const global = getGlobalDesignTokens(mode);
  return ({
    ...global,
    components: {
      ...global.components,
      //Rating
      MuiRating:{
        styleOverrides: {
          iconEmpty: {
            color: colors.secondary
          }
        }
      },
      // Buttons
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            textTransform: 'unset',
            '&.Mui-disabled': {
              //backgroundColor: colors.primary,
              color: 'white'
            },
            borderWidth: 2,
            borderRadius: '4rem',
            '&:hover': {
              borderWidth: 2,
              boxShadow: 'none'
            },
            boxShadow: 'none'
          },
          contained: {
            '&:hover': {
              // backgroundColor: colors.primaryHover,
            }
          },
          outlined: {
            border: `2px solid ${colors.primary}`,
          },
          sizeMedium: {
            padding: '1rem 2rem',
            fontSize: '1.4rem',
            lineHeight: 1.2,
            fontWeight: '600'
          },
        },
      },
      // TextFields
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            //borderColor: colors.gray,
            borderRadius: '3rem',
            '& input': { padding: '1.5rem 1.6rem' }
          },
          notchedOutline: {
            borderWidth: '2px',
            //borderColor: QColors.gray,
          },
        },
      },
      typography: {
        fontSize: 10,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        allVariants: {
          fontSize: '16px',
        },
        h1: {
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.2
        },
        h2: {
          fontSize: 26,
          fontWeight: 700,
        },
        h3: {
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1.2
        },
        h4: {
          fontSize: 20,
        },
        h5: {
          fontSize: 17
        },
        h6: {
          fontSize: 14
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
          ? {
            ...global.palette,
            // palette values for light mode
            secondary:{
              ...global.palette.secondary,
              main: colors.secondary
            }

          }
          : {
            // palette values for dark mode
          }
      ),
    },
  })
}
