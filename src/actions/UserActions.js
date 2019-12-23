import axios from "axios";

import { SET_USER, LOGOUT, REGISTER } from "../constants/action-types";
import { setSnackbar } from "./SnackbarActions";

const serverUrl = "https://localhost:44318/api";

function setUser(user){
    return{
        type: SET_USER,
        payload: user
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export function login(userName, password) {

    return function(dispatch){
            return axios.post(`${serverUrl}/users/authenticate`, {
                userName,
                password
            }).then(res => {

                dispatch(setUser(res.data));
                dispatch(setSnackbar(true, "success", "Welcome !"));

            }).catch(error => {

                if(error.response.status == 400){
                    dispatch(setSnackbar(true, "error", "Incorrect credentials !"));
                }

            });
        
    }
};

export function facebookLogin(code) {

    return function(dispatch){

            axios.post(`${serverUrl}/users/facebook`, {
                code: code
            }).then(res => {
                dispatch(setUser(res.data));
            }).catch(error => {

                if(error.response.status == 400){
                    console.log("User could not be found");
                }

            });     
    }
};

export function register(user){
    return function(dispatch){
        return axios.post(`${serverUrl}/users`, user).then(res => {

            dispatch(setSnackbar(true, "success", "Registered !"));
            return{
                type: REGISTER
            };

        }).catch(error => {

            dispatch(setSnackbar(true, "error", "Error !"));
        });
    
    }
};