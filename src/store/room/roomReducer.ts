import {
  CREATE_ROOM_R,
  CREATE_ROOM_S,
  DefaultState, JOIN_ROOM_F,
  JOIN_ROOM_R,
  JOIN_ROOM_S, OPEN_MODAL,
  OPEN_MODAL_CREATE, OPEN_MODAL_JOIN,
} from "@src/store/room/roomTypes";

const defaultState:DefaultState = {
  room: null,
  isLoading: false,
  error: false,
  isJoin: false,
  open: false,
  responses: null
}

export const roomReducer = ((state=defaultState, action:any)=>{
  switch (action.type){
    case CREATE_ROOM_R:
      return {...state, isLoading: true}
    case CREATE_ROOM_S:
      return {...state, isLoading: false, room: action.payload, open: false}
    case JOIN_ROOM_R:
      return {...state, isLoading: true}
    case JOIN_ROOM_S:
      return {...state, isLoading: false, room: action.payload, open: false, error: false}
    case JOIN_ROOM_F:
      return {...state, isLoading: false, error: true}
    case OPEN_MODAL:
      return {...state, open: !state.open, isJoin: action.payload, error: false, isLoading: false}
    default:
      return state
  }
})
