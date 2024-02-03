import { CREATE_ROOM_R, CREATE_ROOM_S, CreateRoomS } from "@src/store/room/roomTypes";
import apiClientService from "@src/axios/ApiClientService";

export const createRoom = ():any => (dispatch:any)=>{
  dispatch({type: CREATE_ROOM_R})
  apiClientService.post("api/create/room").then(res=>{
    dispatch({type:CREATE_ROOM_S, payload: res.data.key})
  })
}

