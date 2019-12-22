import axios from "axios";

import store from "../store/index";

import { SET_MY_CONTRACTS, SET_CONTRACT, CREATE_CONTRACT, UPDATE_CONTRACT, DELETE_CONTRACT } from "../constants/action-types";


const serverUrl = "https://localhost:44318/api";

function setMyContracts(contracts){
    return{
        type: SET_MY_CONTRACTS,
        payload: contracts
    }
}

export function fetchMyContracts() {

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.get(`${serverUrl}/contracts`, config).then(res => {
            let contracts;
            if(user.role === "tenant"){
                contracts = res.data.filter(c => c.tenantId === user.id);
            }else{
                contracts = res.data.filter(c => c.landlordId === user.id)
            }
            dispatch(setMyContracts(contracts));
        })
    }
};

export function setContract(contract){
    return {
        type: SET_CONTRACT,
        payload: contract
    }
}

function createOne(contract){
    return{
        type: CREATE_CONTRACT,
        payload: contract
    }
}

export function createContract(contract){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.post(`${serverUrl}/contracts`, contract, config).then(res => {

            dispatch(createOne(res.data));

        }).catch(error => {

        });
    
    }
};

export function updateContract(contract){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.put(`${serverUrl}/contracts/${contract.id}`, contract, config).then(res => {

            dispatch(fetchMyContracts());

        }).catch(error => {

        });
    
    }
};

export function deleteContract(contract){

    const user = store.getState().userReducer.user;

    var config = {
        headers: {'Authorization': "bearer " + user.token}
    };

    return function(dispatch){
        return axios.delete(`${serverUrl}/contracts/${contract.id}`, config).then(res => {

            dispatch(fetchMyContracts());

        }).catch(error => {

        });
    
    }
};