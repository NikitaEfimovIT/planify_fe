import React from "react";
import { makeStyles } from "tss-react/mui";
import { Container } from "@mui/material";
import { HomePage } from "@src/view/HomePage/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { SchedulePage } from "@src/view/SchedulePage/SchedulePage";
import { RoomOverview } from "@src/view/RoomOverview/RoomOverview";
import { RoomModal } from "@src/view/Modal/RoomModal";
import { useErrorBoundary } from "react-error-boundary";
import { Header } from "@src/components/Header/Header";
import { Imprint } from "@src/view/Imprint/Imprint";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));

function App() {
  const { classes } = useStyles();

  const location = useLocation();

  const { showBoundary } = useErrorBoundary();

  if (location.pathname !== "/") {
    document.body.classList.remove("body_home");
    document.body.classList.add("body_all");
  } else {
    document.body.classList.remove("body_all");
    document.body.classList.add("body_home");
  }

  return (
    <>
      {location.pathname !== "/" && (
        <header>
          <Header />
        </header>
      )}
      <Container className={classes.root}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/room-overview" element={<RoomOverview />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
        <RoomModal />
      </Container>
    </>
  );
}

export default App;
