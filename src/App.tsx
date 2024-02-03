import React from 'react';
import { makeStyles } from "tss-react/mui";
import { Container } from "@mui/material";
import { HomePage } from "@src/view/HomePage/HomePage";
import { CreateRoomModal } from "@src/view/Modal/CreateRoomModal";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { SchedulePage } from "@src/view/SchedulePage/SchedulePage";


const useStyles = makeStyles()(theme=>({
  root: {
    width: "100%",
    height: "100%",
  }
}))

function App() {
  const {classes} = useStyles()
  const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
    {path:"/schedule", element: <SchedulePage/>}
  ])
  return (

    <Container className={classes.root}>
      <RouterProvider router={router}/>
      <CreateRoomModal/>
    </Container>

  );
}

export default App;
