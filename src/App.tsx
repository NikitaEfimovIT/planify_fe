import React from 'react';
import { makeStyles } from "tss-react/mui";
import { Container } from "@mui/material";
import { HomePage } from "@src/view/HomePage/HomePage";
import { CreateRoomModal } from "@src/view/Modal/CreateRoomModal";


const useStyles = makeStyles()(theme=>({
  root: {
    width: "100%",
    height: "100%",
  }
}))

function App() {
  const {classes} = useStyles()

  return (
    <Container className={classes.root}>
      <HomePage/>
      <CreateRoomModal/>
    </Container>
  );
}

export default App;
