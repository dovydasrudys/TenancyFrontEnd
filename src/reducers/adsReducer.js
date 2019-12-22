import { SET_ADS, SET_MY_ADS, SET_AD, CREATE_AD } from "../constants/action-types";

const initialState = {
    ads: [],
    myAds: [],
    ad:{},
  };

  export default function adsReducer(state = initialState, action) {
    if (action.type === SET_ADS) {
      return Object.assign({}, state, {
        ads: action.payload
      });
    }
    if (action.type === SET_MY_ADS) {
      return Object.assign({}, state, {
        myAds: action.payload
      });
    }
    if (action.type === SET_AD) {
      return Object.assign({}, state, {
        ad: action.payload
      });
    }
    if (action.type === CREATE_AD) {
      return {
        ...state,
        myAds: [action.payload, ...state.myAds]
      }
    }
    return state;
  };