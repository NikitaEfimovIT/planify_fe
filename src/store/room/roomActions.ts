import {
  CREATE_ROOM_R,
  CREATE_ROOM_S,
  CreateRoomS,
  JOIN_ROOM_F,
  JOIN_ROOM_R,
  JOIN_ROOM_S,
} from "@src/store/room/roomTypes";
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
      apiClientService.post("api/room", {number: res.data.key}, {
        headers: {
          'Content-Type':"application/json",
          "Access-Control-Allow-Origin":"*"
        }
      }).then(res=>{
        sessionStorage.setItem("room_key", res.data.key)
    dispatch({type:CREATE_ROOM_S, payload: res.data})
  })
  })
}


export const joinRoom = (data: number):any => (dispatch:any)=>{
  dispatch({type: JOIN_ROOM_R})
  apiClientService.post("api/room", {number: data},
    {
      headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    } ).then(res=>{
    console.log(res.data)
    sessionStorage.setItem("room_key", res.data.key)
    dispatch({type:JOIN_ROOM_S, payload: res.data})
  }).catch(e=>{
    console.log(e)
    dispatch({type: JOIN_ROOM_F})
  })
}

