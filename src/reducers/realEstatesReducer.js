import { SET_MY_REALESTATES, SET_REALESTATE, CREATE_REALESTATE, UPDATE_REALESTATE } from "../constants/action-types";

const initialState = {
    myRealEstates: [],
    realEstate: {}
  };

  export default function realEstatesReducer(state = initialState, action) {
    if (action.type === SET_MY_REALESTATES) {
      return Object.assign({}, state, {
        myRealEstates: action.payload
      });
    }
    if (action.type === SET_REALESTATE) {
        return Object.assign({}, state, {
          realEstate: action.payload
        });
    }
    if (action.type === CREATE_REALESTATE) {
        return {
            ...state,
            myRealEstates: [action.payload, ...state.myRealEstates]
        }
    }

    if (action.type === UPDATE_REALESTATE) {
        var filtered = state.myRealEstates.filter(rl => rl.id !== action.payload.id);
        return {
            ...state,
            myRealEstates: [action.payload, ...filtered]
        }
    }
    return state;
  };