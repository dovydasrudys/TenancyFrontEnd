import { SET_USER, LOGOUT } from "../constants/action-types";

const initialState = {
    user: {}
  };

  export default function userReducer(state = initialState, action) {
    if (action.type === SET_USER) {
      return Object.assign({}, state, {
        user: action.payload
      });
    }
    if (action.type === LOGOUT) {
      return Object.assign({}, state, {
        user: {}
      });
    }
    return state;
  };