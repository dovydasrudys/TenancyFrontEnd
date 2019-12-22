import { SET_CONTRACTS_PAYMENTS } from "../constants/action-types";

const initialState = {
    contractsPayments: []
  };

  export default function paymentsReducer(state = initialState, action) {
    if (action.type === SET_CONTRACTS_PAYMENTS) {
      return Object.assign({}, state, {
        contractsPayments: action.payload
      });
    }
    return state;
  };