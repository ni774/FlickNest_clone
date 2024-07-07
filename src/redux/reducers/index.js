import { combineReducers } from "redux";
import { myPlaylistReducer } from "./playlistReducers.js";

export const reducers = combineReducers({
  myPlaylist: myPlaylistReducer,
});