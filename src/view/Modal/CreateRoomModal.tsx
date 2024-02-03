import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL_CREATE } from "@src/store/room/roomTypes";
import { makeStyles } from "tss-react/mui";
import { createRoom } from "@src/store/room/roomActions";
import useDebounce from "@src/hooks/useDebounce";

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
  },
  button:{
    width: "107px",
    height:"42px"
  }
}))

export const CreateRoomModal = () =>{
  const open = useSelector((state:any) => state.room.open)

  const isLoading = useSelector((state:any)=>state.room.isLoading)

  const room = useSelector((state: any)=> state.room.room)

  const isLoadingDebounced = useDebounce(isLoading, 300)

  const {classes} = useStyles()

  const dispatch = useDispatch<any>()
  const closeModal = () => {
    dispatch({type: OPEN_MODAL_CREATE})
  }

  const onCreateRoom = () => {
    dispatch(createRoom())
  }

  useEffect(() => {
    if(room){
      window.location.href="/schedule"
    }
  }, [room]);

  return <Dialog open={open} onClose={closeModal}>
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <h2>Please provide your room name</h2>
        <TextField variant={"outlined"} label={"Party name"} placeholder={"ex. Best party ever"} size={"medium"} fullWidth InputLabelProps={{
          shrink: true,
        }}/>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button className={classes.button} variant={"outlined"} size={"large"} onClick={closeModal}>
          Cancel
        </Button>
        <Button className={classes.button} variant={"contained"} disabled={
          isLoadingDebounced
        } size={"large"} onClick={onCreateRoom}>
          {isLoadingDebounced ? <CircularProgress /> :"Create"}
        </Button>
      </CardActions>
    </Card>
  </Dialog>
}
