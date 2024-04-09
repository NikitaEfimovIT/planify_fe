import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  root: {
    background: "linear-gradient(98.21568417951349deg, #F1F9EC 0%,#DDC6EC 100%)",
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBox: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    maxWidth: "55%",
    gap: "20px",
    "& h1": {
      fontSize: "4em",
      marginBottom: 0,
      [theme.breakpoints.down("md")]: {
        fontSize: "2.5em",
        textAlign: "center",
      },
    },

    "& p": {
      fontSize: "1.5em",
      [theme.breakpoints.down("md")]: {
        fontSize: "1.3em",
        margin: 0,
        textAlign: "center",
      },
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
  brandName: {
    fontFamily: "Wendy One",
    color: theme.palette.primary.dark,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  buttonCreate: {
    fontSize: "1.5em",
    fontFamily: "Wendy One",
    color: theme.palette.primary.dark,
  },

  textButton: {
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    fontSize: "1.3em!important",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
