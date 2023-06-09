import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // LOGOUT_SUCCESS,
  // LOGOUT_FAIL,
  LENDING_REQUEST,
  LENDING_SUCCESS,
  LENDING_RESET,
  LENDING_FAIL,
  DEMOGRAPHICS_REQUEST,
  DEMOGRAPHICS_SUCCESS,
  DEMOGRAPHICS_RESET,
  DEMOGRAPHICS_FAIL,
  BUDGET_GENERATE_REQUEST,
  BUDGET_GENERATE_SUCCESS,
  BUDGET_GENERATE_FAIL,
  SCORES_GENERATE_REQUEST,
  SCORES_GENERATE_SUCCESS,
  SCORES_GENERATE_FAIL,

  // CLEAR_ERRORS,
} from '../constant/constants';
import { callAPI, callAPIWithoutAuth } from '../utlis/Apiutils';
import { apiUrls } from '../utlis/ApiUrl';

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await callAPIWithoutAuth(apiUrls.login, 'post', {
      email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Lending
export const LendingGenerate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LENDING_REQUEST,
    });

    const { data } = await callAPI(apiUrls.lending, 'post', body);
    dispatch({
      type: LENDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LENDING_RESET,
      payload: error.response,
    });
  }
};

// Demographics
export const demographicsGenerate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: DEMOGRAPHICS_REQUEST,
    });

    const { data } = await callAPI(apiUrls.demographics, 'post', body);

    dispatch({
      type: DEMOGRAPHICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEMOGRAPHICS_FAIL,
      payload: error.response,
    });
  }
};

//Buget
export const budgetsGenerate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: BUDGET_GENERATE_REQUEST,
    });

    const { data } = await callAPI(apiUrls.budget, 'post', body);

    dispatch({
      type: BUDGET_GENERATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_GENERATE_FAIL,
      payload: error.response,
    });
  }
};

//Score
export const scoresGenerate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: SCORES_GENERATE_REQUEST,
    });
    const { data } = await callAPI(apiUrls.scores, 'post', body);
    dispatch({
      type: SCORES_GENERATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCORES_GENERATE_FAIL,
      payload: error.response,
    });
  }
};

//   //Logout User
//   export const logout = () => async (dispatch) => {
//     try {
//       // const config = { headers: { 'Content-Type': 'application/json' } };
//       await callAPI(apiUrls.logout, 'post');
//       // await axios.post(`https://crm.creativebuffer.com/api/logout`, config);
//       dispatch({ type: LOGOUT_SUCCESS });
//     } catch (error) {
//       dispatch({ type: LOGOUT_FAIL, payload: error });
//     }
//   };

//   // Clearing Errors
//   export const clearErrors = () => async (dispatch) => {
//     dispatch({
//       type: CLEAR_ERRORS,
//     });
//   };
