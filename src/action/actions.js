import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  BUDGET_GENERATE_REQUEST,
  BUDGET_GENERATE_SUCCESS,
  BUDGET_GENERATE_FAIL,
  SCORES_GENERATE_REQUEST,
  SCORES_GENERATE_SUCCESS,
  SCORES_GENERATE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  //     // UPDATE_PROFILE_REQUEST,
  //     // UPDATE_PROFILE_SUCCESS,
  //     // UPDATE_PROFILE_FAIL,
  //     UPDATE_TICKET_REQUEST,
  //     UPDATE_TICKET_SUCCESS,
  //     UPDATE_TICKET_FAIL,
  CLEAR_ERRORS,
} from '../constant/constants';
import axios from 'axios';
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
    console.log(data.data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
// export const budgetsGenerate = (body) => async (dispatch) => {
//   try {
//     dispatch({
//       type: BUDGET_GENERATE_REQUEST,
//     });
//     const { data } = await axios.post(
//       `https://api2.spendid.io/v1.0/budgets/generate`,
//       body
//     );

//     // const { data } = await callAPIWithoutAuth(apiUrls.login, 'post', {
//     // body,
//     // });
//     console.log('todo>>>>>>>>>>>>>', data);
//     dispatch({
//       type: BUDGET_GENERATE_SUCCESS,
//       payload: data.data.projectTasks,
//     });
//   } catch (error) {
//     dispatch({
//       BUDGET_GENERATE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const scoresGenerate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: SCORES_GENERATE_REQUEST,
    });
    // const { data } = await axios.post(
    //   `https://api2.spendid.io/v1.0/scores/generate`,
    //   body
    // );
    console.log(body);
    const { data } = await callAPI(apiUrls.scores, 'post', body);
    dispatch({
      type: SCORES_GENERATE_SUCCESS,
      payload: data,
    });
    console.log('data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
  } catch (error) {
    dispatch({
      type: SCORES_GENERATE_FAIL,
      payload: error.response.data.message,
    });
    console.log(error.response.data.message);
    console.log('error>>>>>>>>>>', error);
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

//   // // Update Profile
//   // export const updateProfile = (userData) => async (dispatch) => {
//   //   try {
//   //     dispatch({ type: UPDATE_PROFILE_REQUEST });

//   //     const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//   //     const { data } = await axios.put(`/api/v1/me/update`, userData, config);
//   //     console.log(data);
//   //     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//   //   } catch (error) {
//   //     dispatch({
//   //       type: UPDATE_PROFILE_FAIL,
//   //       payload: error.response.data.message,
//   //     });
//   //   }
//   // };

//   // Update User
//   export const updateTicketStatus = (ticket_id, status) => async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_TICKET_REQUEST });
//       // const config = { headers: { 'Content-Type': 'application/json' } };
//       const data = await callAPI(
//         `${apiUrls.updateTicketStatus}${ticket_id}`,
//         'post',
//         {
//           status,
//         }
//       );

//       // const { data } = await axios.put(
//       //   `/api/v1/admin/user/${id}`,
//       //   userData,
//       //   config
//       // );

//       dispatch({ type: UPDATE_TICKET_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_TICKET_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };

//   // Clearing Errors
//   export const clearErrors = () => async (dispatch) => {
//     dispatch({
//       type: CLEAR_ERRORS,
//     });
//   };
