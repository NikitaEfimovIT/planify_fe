import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    background: "linear-gradient(98.21568417951349deg, #F1F9EC 0%,#DDC6EC 100%)",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 2em 0 2em",
    alignItems: "center",
    boxShadow: "0px 4px 8px 0px rgba(71, 32, 96, 0.2)",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1em 0 0",
    },
  },

  rootHomePage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2em 4em 0 4em",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  logo: {
    width: "200px",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
  },

  link: {
    fontSize: "2em",
    textDecoration: "none",
    textAlign: "center",
    color: theme.palette.primary.dark,
    fontFamily: "Wendy One",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.3em",
    },
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  listLink: {
    textDecoration: "none",
    fontSize: "1.4em",
    color: theme.palette.primary.dark,
  },
}));
