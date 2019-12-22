import axios from "axios";

import store from "../store/index";

import { SET_CONTRACTS_PAYMENTS } from "../constants/action-types";


const serverUrl = "https://localhost:44318/api";

function setContractsPayments(payments){
    return{
        type: SET_CONTRACTS_PAYMENTS,
        payload: payments
    }
}

export function fetchContractsPayments(contractId) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.get(`${serverUrl}/payments`, config).then(res => {
            let payments = res.data.filter(p => p.contractId === contractId);
            dispatch(setContractsPayments(payments));
        })
    }
};