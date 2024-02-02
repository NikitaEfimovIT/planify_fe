import { applyMiddleware , combineReducers , createStore } from "redux";
import { thunk } from "redux-thunk";
import { roomReducer } from "@src/store/room/roomReducer";

export const rootReducer = combineReducers({
  room: roomReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))
