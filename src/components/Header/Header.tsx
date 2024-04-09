import React, { useState } from "react";
import dark_purpl from "@src/images/icons/logo_purpl.svg";
import { Link } from "react-router-dom";
import { Box, Button, Divider, Drawer, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useStyles } from "@src/components/Header/headerStyle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export const DrawerList: React.FC<{ handler: any }> = ({ handler }) => {
  const { classes } = useStyles();
  return (
    <Box maxWidth={"400px"}>
      <Link to={"/"}>
        <img className={classes.logo} alt={"logo"} src={dark_purpl} />
      </Link>
      <Divider />
      <List>
        <ListItem className={classes.listItem}>
          <HomeOutlinedIcon />
          <Link className={classes.listLink} to={"/"} onClick={handler}>
            Home
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ArticleOutlinedIcon />
          <Link className={classes.listLink} to={"/imprint"} onClick={handler}>
            Impressum
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export const Header = () => {
  const { classes } = useStyles();

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const isHomePage = location.pathname === "/";

  return (
    <div className={isHomePage && !isMdDown ? classes.rootHomePage : classes.root}>
      {isMdDown ? (
        <>
          <Button onClick={onOpen}>
            <MenuIcon fontSize={"large"} />
          </Button>
          <Link to={"/"}>
            <img className={classes.logo} alt={"logo"} src={dark_purpl} />
          </Link>
          <Link className={classes.link} to={"/imprint"}>
            Impressum
          </Link>
          <Drawer open={open} onClose={onClose}>
            <DrawerList handler={() => setOpen(false)} />
          </Drawer>
        </>
      ) : (
        <>
          <Link to={"/"}>
            <img className={classes.logo} alt={"logo"} src={dark_purpl} />
          </Link>
          <Link className={classes.link} to={"/imprint"}>
            Impressum
          </Link>
        </>
      )}
    </div>
  );
};
