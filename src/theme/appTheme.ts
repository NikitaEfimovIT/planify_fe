import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    primary: {
      dark:"#632D86",
      main: "#C6A0DF",
      light: "#f4ecf9",
    },
    secondary:{
      light: "#f1f9ec",
      main: "#d5ecc6",
      dark: "#b9dfa0",
      contrastText: "#50862d"
    },
    success:{
      main: "#c6ecc6",
      contrastText: "#2d862d"
    },
    error: {
      main: "#bc1212",
      contrastText: "#862d2d",
    },
    background:{
      default:"#f0eff1"
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        contained:{
          "&:hover":{
            color:"#f4ecf9",
          }
        }
      }
    }
  }
})
