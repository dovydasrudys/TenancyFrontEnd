import axios from "axios";

import store from "../store/index";

import { SET_ADS, SET_MY_ADS, SET_AD, CREATE_AD } from "../constants/action-types";

import { setSnackbar } from "./SnackbarActions";

const serverUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function setAds(ads) {
    return {
        type: SET_ADS,
        payload: ads
    }
}

export function fetchAds() {

    return function (dispatch) {
        return axios.get(`${serverUrl}/adverts`).then(res => {
            //payload = res.data;
            dispatch(setAds(res.data));
        })
    }
};

function setMyAds(ads) {
    return {
        type: SET_MY_ADS,
        payload: ads
    }
}

export function fetchMyAds() {
    const user = store.getState().userReducer.user;

    return function (dispatch) {
        return axios.get(`${serverUrl}/adverts`).then(res => {
            let ads;
            if (user.role === "tenant") {
                return;
            } else {
                ads = res.data.filter(a => a.ownerId === user.id)
            }
            dispatch(setMyAds(ads));
        })
    }
}

export function setAd(ad) {
    return {
        type: SET_AD,
        payload: ad
    };
}

function createOne(ad) {
    return {
        type: CREATE_AD,
        payload: ad
    }
}

export function createAd(ad) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.post(`${serverUrl}/adverts`, ad, config).then(res => {

            dispatch(setSnackbar(true, "success", "Advert created !"));
            dispatch(createOne(res.data));

        }).catch(error => {
            dispatch(setSnackbar(true, "error", "Error ocurred"));
        });

    }
};

export function updateAd(ad) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.put(`${serverUrl}/adverts/${ad.id}`, ad, config).then(res => {

            dispatch(fetchMyAds());
            dispatch(setSnackbar(true, "success", "Advert updated !"));

        }).catch(error => {

            dispatch(setSnackbar(true, "error", "Error ocurred"));
        });

    }
};

export function deleteAd(ad) {

    const user = store.getState().userReducer.user;

    var config = {
        headers: { 'Authorization': "bearer " + user.token }
    };

    return function (dispatch) {
        return axios.delete(`${serverUrl}/adverts/${ad.id}`, config).then(res => {

            dispatch(fetchMyAds());
            dispatch(setSnackbar(true, "success", "Advert deleted !"));

        }).catch(error => {

        });

    }
};
