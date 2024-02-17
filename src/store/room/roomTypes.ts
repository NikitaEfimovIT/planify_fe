export const CREATE_ROOM_S = "CREATE_ROOM_S"

export const CREATE_ROOM_R = "CREATE_ROOM_r"

export const JOIN_ROOM_R = "JOIN_ROOM_R"
export const JOIN_ROOM_S= "JOIN_ROOM_S"
export const OPEN_MODAL_CREATE = "OPEN_MODAL_CREATE"
export const OPEN_MODAL_JOIN = "OPEN_MODAL_GET"

export const OPEN_MODAL = "OPEN_MODAL"

export const JOIN_ROOM_F ="JOIN_ROOM_F"
export interface Room{
  key: number;
  responses: any[]
  name: string;
}

export interface DefaultState{
  room: Room;
  isLoading: boolean;
  error: boolean;
  open: boolean
  isJoin: boolean;
  responses:any;
}

export interface CreateRoomS{
  type: typeof CREATE_ROOM_S;
  payload: Room
}

export interface JoinRoomS{
  type: typeof JOIN_ROOM_S;
  payload: Room
}


