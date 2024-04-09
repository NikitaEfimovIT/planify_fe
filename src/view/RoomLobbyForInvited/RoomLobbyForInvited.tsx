import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Alert, CircularProgress, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { joinRoom } from "@src/store/room/roomActions";
import useDebounce from "@src/hooks/useDebounce";
export const RoomLobbyForInvited = () => {
  const { key } = useParams();
  const dispatch = useDispatch<any>();
  const roomInfo = useSelector((state: any) => state.room);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const debouncedRoom = useDebounce(roomInfo, 500);

  useEffect(() => {
    // console.log(parseInt(key));
    dispatch(joinRoom(parseInt(key)));
  }, []);

  useEffect(() => {
    if (debouncedRoom.room) {
      if (debouncedRoom.room.key === parseInt(key)) {
        navigate("/room-overview");
      }
    }
    if (debouncedRoom.error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        navigate("/");
      }, 5000);
    }
  }, [debouncedRoom]);

  return (
    <Container
      maxWidth={"lg"}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      Please wait, we are preparing the room for you
      {error && (
        <Alert severity="error">
          Provided invite url is not valid. You will be redirected to the main page after 5 seconds.
        </Alert>
      )}
    </Container>
  );
};
