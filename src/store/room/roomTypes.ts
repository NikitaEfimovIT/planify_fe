export const CREATE_ROOM_S = "CREATE_ROOM_S"

export const CREATE_ROOM_R = "CREATE_ROOM_r"
export const GET_ROOM= "GET_ROOM"

export const OPEN_MODAL_CREATE = "OPEN_MODAL_CREATE"
export const OPEN_MODAL_GET = "OPEN_MODAL_GET"
export interface Room{
  id: string;
}

export interface DefaultState{
  room: Room;
  isLoading: false;
  error: false;
  open: false
}

export interface CreateRoomR{
  type: typeof CREATE_ROOM_R;
}

export interface CreateRoomS{
  type: typeof CREATE_ROOM_S;
  payload: Room
}

export interface GetRoom{
  type: typeof GET_ROOM;
  payload: Room
}


