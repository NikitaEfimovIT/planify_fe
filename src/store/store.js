import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { roomReducer } from "@src/store/room/roomReducer";
import { modalsReducer } from "@src/store/modals/modalsReducer";
import { responseReducer } from "@src/store/response/responseReducer";

export const rootReducer = combineReducers({
  room: roomReducer,
  modals: modalsReducer,
  response: responseReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
