import { CREATE_ROOM_S, CreateRoomS } from "@src/store/room/roomTypes";
import apiClientService from "@src/axios/ApiClientService";

export const createRoom = ():any => (dispatch:any)=>{
  apiClientService.post("api/create/room").then(res=>{
    console.log(res)
  })
}
