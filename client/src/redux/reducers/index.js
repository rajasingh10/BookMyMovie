import { combineReducers } from "redux";
import currentUser from "./currentUser";
import selectedMovie from "./selectedMovie";

const rootReducer = combineReducers({
  currentUser,
  selectedMovie,
});

export default rootReducer;
