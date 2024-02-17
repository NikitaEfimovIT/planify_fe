import React from "react"
import { Button, Container } from "@mui/material";
import { useStyles } from "./styles";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, OPEN_MODAL_CREATE, OPEN_MODAL_JOIN } from "@src/store/room/roomTypes";

export const HomePage = () => {

  const {classes} = useStyles()
  const dispatch = useDispatch<any>()
  const onCreateClick = () => {
    dispatch({type: OPEN_MODAL, payload: false})
  }

  const onJoinRoom = () => {
    dispatch({type: OPEN_MODAL, payload: true})
  }

  return <Container maxWidth={"xl"} className={classes.root}>
    <h1 className={classes.headerText}>
     PLANIFY
    </h1>
    <div className={classes.buttonContainer}>
      <Button variant={"contained"} size={"large"} onClick={onCreateClick}>
        Create lobby
      </Button>
      <p className={classes.textButton} onClick={onJoinRoom}>
        I have a room ID
      </p>
    </div>
  </Container>
}
