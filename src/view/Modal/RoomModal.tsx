import { Button, Card, CardActions, CardContent, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@src/hooks/useDebounce";
import { OPEN_MODAL, OPEN_MODAL_CREATE, OPEN_MODAL_JOIN } from "@src/store/room/roomTypes";
import { createRoom, joinRoom } from "@src/store/room/roomActions";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";

interface FormState{
  roomID: string,
  roomName: string,
}

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

const defaultFormState = ():FormState => {
  return {
    roomID: "",
    roomName: ""
  }
}

export const RoomModal = () => {

  const open = useSelector((state:any) => state.room.open)

  const isJoin = useSelector((state:any)=>state.room.isJoin)

  const error = useSelector((state:any)=>state.room.error)

  const isLoading = useSelector((state:any)=>state.room.isLoading)

  const room = useSelector((state: any)=> state.room.room)

  const [formState, setformState] = useState(defaultFormState())


  const isLoadingDebounced = useDebounce(isLoading, 300)

  const errorDebounced = useDebounce(error, 300)

  const {classes} = useStyles()

  const navigate = useNavigate()

  const dispatch = useDispatch<any>()
  const closeModal = () => {
    setformState(defaultFormState())
    dispatch({type: OPEN_MODAL})
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()

    dispatch(isJoin ? joinRoom(parseInt(formState.roomID)) : createRoom(formState.roomName))

  }

  useEffect(() => {
    if(room){
      setformState(defaultFormState())
      navigate("/room-overview")
    }
  }, [room]);

  function handleChange(event: any) {
    const {value, name} = event.target
    setformState((prevState) => ({...prevState, [name]: isJoin ? value.replace(/[^0-9]/g, "") : value}))
  }

  return <Dialog open={open} onClose={closeModal}>
    <form onSubmit={handleSubmit}>
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <h2>Please provide your {isJoin ? "room ID" : "room name"}</h2>
        <TextField variant={"outlined"} value={isJoin ? formState.roomID :formState.roomName} name={isJoin ? "roomID" : "roomName"} label={isJoin ? "Room ID": "Room name"} size={"medium"} error={isJoin && errorDebounced} helperText={isJoin && errorDebounced && "Incorrect room ID"} onChange={handleChange} fullWidth InputLabelProps={{
          shrink: true,
        }}/>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button className={classes.button} variant={"outlined"} size={"large"} onClick={closeModal}>
          Cancel
        </Button>
        <Button className={classes.button} type={"submit"} variant={"contained"} disabled={
          isLoadingDebounced
        } size={"large"}>
          {isLoadingDebounced ? <CircularProgress /> : isJoin ? "Join" : "Create"}
        </Button>
      </CardActions>
    </Card>
    </form>
  </Dialog>
}
