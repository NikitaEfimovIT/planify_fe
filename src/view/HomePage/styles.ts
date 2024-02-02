import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(theme=>({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "column",
    backgroundImage: "url('images/main_screen.svg')"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  textButton:{
    color: theme.palette.primary.contrastText,
    textAlign:"center",
    "&:hover":{
      textDecoration: "underline",
      cursor: "pointer",
    }
  },
  headerText:{
    fontFamily: "Wendy One",
    fontSize: "5em",
    [theme.breakpoints.down("md")]:{
      fontSize: "3em",
    }
  }
}))
