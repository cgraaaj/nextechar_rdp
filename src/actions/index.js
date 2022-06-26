import { JPH_API } from '../utils/api';
import * as constants from '../utils/constants';
import {
  LOG_IN,
  LOG_OUT,
  HAMBURGER,
  GET_USERS,
  GET_PHOTOS,
  SET_TOAST,
} from './types';
import history from '../history';

const onError = (dispatch, err) => {
  if (err.response) {
    if (err.response.status === 401) {
      dispatch({
        type: LOG_OUT,
        payload: {},
      });
      history.push('/login');
    }
  }
  if (err.message) {
    setToast(dispatch, { message: err.message, type: 'warn' });
  }
};

export const login = (credentials) => async (dispatch) => {
  let response = '';
  try {
    response = await JPH_API.get(`${constants.USER_DATA}`);
    let user = response.data.filter(
      (user) => user.email === credentials.email
    )[0];
    if (user) {
      dispatch({
        type: LOG_IN,
        payload: user,
      });
      setToast(dispatch, { message: 'Logged In', type: 'success' });
    } else {
      throw new Error('User not found');
    }

    history.push('/');
  } catch (err) {
    onError(dispatch, err);
  }
};

export const logout = () => async (dispatch) => {
  history.push('/login');
  dispatch({
    type: LOG_OUT,
    payload: {},
  });
  setToast(dispatch, { message: 'Logged Out', type: 'success' });
};

export const getUsers = () => async (dispatch) => {
  let response = '';
  try {
    response = await JPH_API.get(`${constants.USER_DATA}`);
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  } catch (err) {
    onError(dispatch, err);
  }
};

export const getPhotos =
  (page, limit = 10) =>
  async (dispatch) => {
    let response = '';
    try {
      response = await JPH_API.get(
        `${constants.PHOTO_DATA}?_page=${page}&_limit=${limit}`
      );
      let payload = {
        photos: response.data,
        total: response.headers['x-total-count'],
      };
      dispatch({
        type: GET_PHOTOS,
        payload,
      });
    } catch (err) {
      onError(dispatch, err);
    }
  };

export const onClickHamburger = () => {
  return {
    type: HAMBURGER,
    payload: {},
  };
};

export const setToast = (dispatch, toast) => {
  dispatch({
    type: SET_TOAST,
    payload: toast,
  });
};
