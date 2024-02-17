import React from "react";
import { makeStyles } from "tss-react/mui";
import dark_purpl from "@src/images/icons/logo_purpl.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 2em 0 2em",
    alignItems: "center",
    boxShadow: "0px 4px 8px 0px rgba(71, 32, 96, 0.2)",
  },

  logo: {
    width: "200px",
  },

  link: {
    fontSize: "2em",
    textDecoration: "none",
    textAlign: "center",
    color: theme.palette.primary.dark,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));

export const Header = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Link to={"/"}>
        <img className={classes.logo} alt={"logo"} src={dark_purpl} />
      </Link>
      <Link className={classes.link} to={"/imprint"}>
        Imprint
      </Link>
    </div>
  );
};
