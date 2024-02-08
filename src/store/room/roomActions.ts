import { CREATE_ROOM_R, CREATE_ROOM_S, CreateRoomS } from "@src/store/room/roomTypes";
import apiClientService from "@src/axios/ApiClientService";

export const createRoom = (data: string):any => (dispatch:any)=>{
  dispatch({type: CREATE_ROOM_R})
  apiClientService.post("api/create/room", {name: data},
    {
      headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    } ).then(res=>{
      console.log(res.data.key)
    dispatch({type:CREATE_ROOM_S, payload: res.data.key})
  })
}

