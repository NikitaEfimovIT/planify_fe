export const CREATE_ROOM_S = "CREATE_ROOM_S"

export const CREATE_ROOM_R = "CREATE_ROOM_r"
export const JOIN_ROOM= "JOIN_ROOM"

export const OPEN_MODAL_CREATE = "OPEN_MODAL_CREATE"
export const OPEN_MODAL_JOIN = "OPEN_MODAL_GET"
export interface Room{
  id: string;
}

export interface DefaultState{
  room: Room;
  isLoading: false;
  error: false;
  open: false
  responses:any
}

export interface CreateRoomR{
  type: typeof CREATE_ROOM_R;
}

export interface CreateRoomS{
  type: typeof CREATE_ROOM_S;
  payload: Room
}

export interface JoinRoom{
  type: typeof JOIN_ROOM;
  payload: Room
}


