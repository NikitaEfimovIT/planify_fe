import { Button, Card, CardActions, CardContent, CardHeader, Dialog, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL_CREATE } from "@src/store/room/roomTypes";
import { makeStyles } from "tss-react/mui";
import { createRoom } from "@src/store/room/roomActions";

const useStyles = makeStyles()((theme)=>({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0 1em 1em",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  cardActions:{
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row"

  }
}))

export const CreateRoomModal = () =>{
  const open = useSelector((state:any) => state.room.open)

  const {classes} = useStyles()

  const dispatch = useDispatch<any>()
  const closeModal = () => {
    dispatch({type: OPEN_MODAL_CREATE})
  }

  const onCreateRoom = () => {
    dispatch(createRoom())
  }

  return <Dialog open={open} onClose={closeModal}>
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <h2>Please provide your room name</h2>
        <TextField variant={"outlined"} label={"Party name"} placeholder={"ex. Best party ever"} size={"medium"} fullWidth InputLabelProps={{
          shrink: true,
        }}/>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant={"outlined"} size={"large"} onClick={closeModal}>
          Cancel
        </Button>
        <Button variant={"contained"} size={"large"} onClick={onCreateRoom}>
          Create
        </Button>
      </CardActions>
    </Card>
  </Dialog>
}
