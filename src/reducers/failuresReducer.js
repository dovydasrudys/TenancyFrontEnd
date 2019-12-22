import { SET_CONTRACTS_FAILURES, SET_FAILURE, CREATE_FAILURE } from "../constants/action-types";

const initialState = {
    contractsFailures: [],
    failure: {}
  };

  export default function failuresReducer(state = initialState, action) {
    if (action.type === SET_CONTRACTS_FAILURES) {
      return Object.assign({}, state, {
        contractsFailures: action.payload
      });
    }
    if (action.type === SET_FAILURE) {
        return Object.assign({}, state, {
          failure: action.payload
        });
    }
    if (action.type === CREATE_FAILURE) {
        return Object.assign({}, state, {
          contractsFailures: [action.payload, ...state.contractsFailures]
        });
    } 
    return state;
  };