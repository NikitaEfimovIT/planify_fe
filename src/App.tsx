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
import { RoomLobbyForInvited } from "@src/view/RoomLobbyForInvited/RoomLobbyForInvited";
import { NewHomePage } from "@src/view/NewHomePage/NewHomePage";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  rootHomePage: {
    width: "100%",
    height: "100%",
    padding: "0!important",
  },
}));

function App() {
  const { classes } = useStyles();

  const location = useLocation();

  const { showBoundary } = useErrorBoundary();

  // if (location.pathname !== "/") {
  //   document.body.classList.remove("body_home");
  //   document.body.classList.add("body_all");
  // } else {
  //   document.body.classList.remove("body_all");
  //   document.body.classList.add("body_home");
  // }

  return (
    <>
      <header style={location.pathname === "/" ? { position: "absolute", width: "100%" } : null}>
        <Header />
      </header>
      <Container
        className={location.pathname === "/" ? classes.rootHomePage : classes.root}
        maxWidth={location.pathname === "/" ? false : "xl"}
      >
        <Routes>
          <Route path="/" element={<NewHomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/room-overview" element={<RoomOverview />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path={"/invite/:key"} element={<RoomLobbyForInvited />} />
        </Routes>
        <RoomModal />
      </Container>
    </>
  );
}

export default App;
