import { Button, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { Room } from "@src/store/room/roomTypes";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { joinRoom } from "@src/store/room/roomActions";
import { useNavigate } from "react-router-dom";
import useDebounce from "@src/hooks/useDebounce";

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    height: "100%",
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
    height: "70%",
  },
}));

export const RoomOverview = () => {
  const room: Room = useSelector((state: any) => state.room.room);

  const debouncedRoom = useDebounce(room, 600);
  const dispatch = useDispatch<any>();
  const { classes } = useStyles();

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

  return (
    <Container className={classes.root}>
      {debouncedRoom ? (
        <>
          <section className={classes.topSection}>
            <h1 className={classes.roomName}>{room.name}</h1>
            <Button variant={"contained"}>Select time</Button>
          </section>
          <section className={classes.tableSection}>
            {room.responses.length ? (
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Available time</TableCell>
                </TableHead>
                <TableBody>
                  {room.responses.map((response: any, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{response.name}</TableCell>
                        <TableCell>
                          {Object.keys(response.availableTimes).map((date) => {
                            return (
                              <div>
                                <span>{date}:</span>
                                <div>
                                  {response.availableTimes[date].map((time: string) => {
                                    return <p>{time}</p>;
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <h1 className={classes.noResponses}>There are no responses</h1>
            )}
          </section>
        </>
      ) : (
        <div className={classes.preloader}>
          <CircularProgress />
          <h1 style={{ fontWeight: 400 }}>Please wait...</h1>
        </div>
      )}
    </Container>
  );
};
