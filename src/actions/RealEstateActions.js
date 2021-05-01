import axios from "axios";

import store from "../store/index";

import { SET_MY_REALESTATES, CREATE_REALESTATE, SET_REALESTATE } from "../constants/action-types";
import { setSnackbar } from "./SnackbarActions";


const serverUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function setMyRealEstates(realEstates) {
    return {
        type: SET_MY_REALESTATES,
        payload: realEstates
    }
}

function createOne(realEstate) {
    return {
        type: CREATE_REALESTATE,
        payload: realEstate
    }
}

export function fetchMyRealEstates() {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.get(`${serverUrl}/realestates`, config).then(res => {
            let realEstates;
            if (user.role === "tenant") {
                return;
            } else {
                realEstates = res.data.filter(r => r.ownerId === user.id)
            }
            dispatch(setMyRealEstates(realEstates));
        })
    }
};

export function createRealEstate(realEstate) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.post(`${serverUrl}/realestates`, realEstate, config).then(res => {

            dispatch(createOne(res.data));
            dispatch(setSnackbar(true, "success", "Real estate created !"));

        }).catch(error => {

        });

    }
};

export function updateRealEstate(realEstate) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.put(`${serverUrl}/realestates/${realEstate.id}`, realEstate, config).then(res => {

            dispatch(fetchMyRealEstates());

            dispatch(setSnackbar(true, "success", "Real estate updated !"));
        }).catch(error => {

        });

    }
};

export function setRealEstate(realEstate) {
    return {
        type: SET_REALESTATE,
        payload: realEstate
    }
}

export function deleteRealEstate(id) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.delete(`${serverUrl}/realestates/${id}`, config).then(res => {

            dispatch(fetchMyRealEstates());
            dispatch(setSnackbar(true, "success", "Real estate deleted !"));

        }).catch(error => {

            dispatch(setSnackbar(true, "error", "Error. Check if real estate isn't linked to any adverts or contracts !"));
        });

    }
};
