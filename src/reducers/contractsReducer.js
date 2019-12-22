import { SET_MY_CONTRACTS, SET_CONTRACT, CREATE_CONTRACT } from "../constants/action-types";

const initialState = {
    myContracts: [],
    contract: {},
    editContract: {}
  };

  export default function userReducer(state = initialState, action) {
    if (action.type === SET_MY_CONTRACTS) {
      return Object.assign({}, state, {
        myContracts: action.payload
      });
    }
    if (action.type === SET_CONTRACT) {
        return Object.assign({}, state, {
          contract: action.payload
        });
    }
    if (action.type === CREATE_CONTRACT) {
        return Object.assign({}, state, {
          myContracts: [action.payload, ...state.myContracts]
        });
    } 
    return state;
  };