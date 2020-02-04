import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/login', userData)
        .then((res) => {
            if (res.data.error) {
                dispatch({
                    type: SET_ERRORS,
                    payload: res.data
                });
            } else {
                setAuthorizationHeader(res.data.token);
                dispatch({type: SET_AUTHENTICATED})
                axios.defaults.headers.common['AUTH-TOKEN'] = localStorage.getItem("AUTH-TOKEN");
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/');
            }
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });

};

const setAuthorizationHeader = (token) => {
    localStorage.setItem('AUTH-TOKEN', token);
    axios.defaults.headers.common['Authorization'] = token;
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user/getUser')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
    console.log("logout"); 
    localStorage.removeItem('AUTH-TOKEN');
    delete axios.defaults.headers.common['AUTH-TOKEN'];
    dispatch({ type: SET_UNAUTHENTICATED });
};