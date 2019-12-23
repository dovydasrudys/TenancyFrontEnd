import axios from "axios";

import store from "../store/index";

import { SET_CONTRACTS_FAILURES, CREATE_FAILURE, UPDATE_FAILURE, DELETE_FAILURE, SET_FAILURE } from "../constants/action-types";
import { setSnackbar } from "./SnackbarActions";


const serverUrl = "https://localhost:44318/api";

function setContractsFailures(failures){
    return{
        type: SET_CONTRACTS_FAILURES,
        payload: failures
    }
}

export function fetchContractsFailures(contractId) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.get(`${serverUrl}/failures`, config).then(res => {
            let failures = res.data.filter(f => f.contractId === contractId);
            dispatch(setContractsFailures(failures));
        })
    }
};

export function setFailure(failure){
    return {
        type: SET_FAILURE,
        payload: failure
    }
}

function createOne(failure){
    return{
        type: CREATE_FAILURE,
        payload: failure
    }
}

export function createFailure(failure){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.post(`${serverUrl}/failures`, failure, config).then(res => {

            dispatch(createOne(res.data));
            dispatch(setSnackbar(true, "success", "Failure created !"));
        }).catch(error => {

        });
    
    }
};

export function updateFailure(failure){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.put(`${serverUrl}/failures/${failure.id}`, failure, config).then(res => {

            dispatch(fetchContractsFailures(failure.contractId));

            dispatch(setSnackbar(true, "success", "Failure upated !"));
        }).catch(error => {

        });
    
    }
};

export function deleteFailure(failure){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.delete(`${serverUrl}/failures/${failure.id}`, config).then(res => {

            dispatch(fetchContractsFailures(failure.contractId));
            dispatch(setSnackbar(true, "success", "Failure deleted !"));

        }).catch(error => {

        });
    
    }
};