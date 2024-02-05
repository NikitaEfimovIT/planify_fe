import { CREATE_ROOM_R, CREATE_ROOM_S, DefaultState, OPEN_MODAL_CREATE } from "@src/store/room/roomTypes";

const defaultState:DefaultState = {
  room: null,
  isLoading: false,
  error: false,
  open: false,
  responses: null
}

export const roomReducer = ((state=defaultState, action:any)=>{
  switch (action.type){
    case CREATE_ROOM_R:
      return {...state, isLoading: true}
    case CREATE_ROOM_S:
      return {...state, isLoading: false, room: action.payload, open: false}
    case OPEN_MODAL_CREATE:
      return {...state, open: !state.open}
    default:
      return state
  }
})
