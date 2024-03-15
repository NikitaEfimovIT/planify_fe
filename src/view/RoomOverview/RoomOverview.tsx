import {
  Button,
  CircularProgress,
  Container,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Room } from "@src/store/room/roomTypes";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { joinRoom } from "@src/store/room/roomActions";
import { useNavigate } from "react-router-dom";
import useDebounce from "@src/hooks/useDebounce";
import { CHANGE_SHARE_MODAL_STATE } from "@src/store/modals/modalsTypes";
import { ShareModal } from "@src/view/Modal/ShareModal";
import IosShareIcon from "@mui/icons-material/IosShare";
import { TimeTable } from "@src/components/TimeTable/TimeTable";
import { OPEN_RESPONSE_MODAL } from "@src/store/response/responseTypes";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  tableSection: {
    width: "100%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  roomName: {
    fontSize: "2.5em",
    fontWeight: 600,
  },

  noResponses: {
    fontSize: "1.9em",
    fontWeight: 500,
  },

  preloader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const RoomOverview = () => {
  const room: Room = useSelector((state: any) => state.room.room);

  const debouncedRoom = useDebounce(room, 600);
  const dispatch = useDispatch<any>();
  const { classes } = useStyles();

  const isSuccess = useSelector((state: any) => state.response.success);
  const debouncedIsSuccess = useDebounce(isSuccess, 300);

  const [isSelectedMode, setIsSelectedMode] = useState(false);

  const navigation = useNavigate();
  useEffect(() => {
    if (!room) {
      const room_key = sessionStorage.getItem("room_key");
      if (room_key) dispatch(joinRoom(parseInt(room_key)));
      else {
        navigation("/", { replace: true });
      }
    }
  }, [room]);

  useEffect(() => {
    if (debouncedIsSuccess) {
      setIsSelectedMode((prevState) => !prevState);
      dispatch(joinRoom(parseInt(String(room.key))));
    }
  }, [debouncedIsSuccess]);

  return (
    <Container className={classes.root}>
      {debouncedRoom ? (
        <>
          <section className={classes.topSection}>
            <div className={classes.headerContainer}>
              <h1 className={classes.roomName}>{room.name}</h1>
              <Button
                variant={"outlined"}
                style={{ height: "40px", marginLeft: "1em" }}
                onClick={() => dispatch({ type: CHANGE_SHARE_MODAL_STATE })}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-evenly" }}>
                  <span style={{ marginRight: "0.5em" }}>Share</span> <IosShareIcon fontSize={"small"} />
                </div>
              </Button>
            </div>
            <Button
              variant={isSelectedMode ? "outlined" : "contained"}
              onClick={() => setIsSelectedMode((prevState) => !prevState)}
            >
              {isSelectedMode ? "Cancel selection mode" : "Select time"}
            </Button>
          </section>
          <section className={classes.tableSection}>
            <TimeTable isSelectMode={isSelectedMode} room={room} />
          </section>
        </>
      ) : (
        <div className={classes.preloader}>
          <CircularProgress />
          <h1 style={{ fontWeight: 400 }}>Please wait...</h1>
        </div>
      )}
      <ShareModal />
    </Container>
  );
};
