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
  // UPDATE_PROFILE_REQUEST,
  // UPDATE_PROFILE_SUCCESS,
  // UPDATE_PROFILE_FAIL,
  // UPDATE_PROFILE_RESET,
  // UPDATE_TICKET_REQUEST,
  // UPDATE_TICKET_SUCCESS,
  // UPDATE_TICKET_FAIL,
  // UPDATE_TICKET_RESET,
  CLEAR_ERRORS,
} from '../constant/constants';

export const userReducer = (state = { user: {} }, action) => {
  console.log('satet >> ', state);

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      console.log(' Login reducer >>>>>', action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const scoresGenerateReducer = (state = { scores: {} }, action) => {
  switch (action.type) {
    case SCORES_GENERATE_REQUEST:
      return {
        loadingScore: true,
        // isAuthenticated: false,
      };
    case SCORES_GENERATE_SUCCESS:
      console.log('REDUCER INSIDE', action.payload);
      return {
        ...state,
        loadingScore: false,
        isAuthenticated: true,
        scores: action.payload,
      };
    case SCORES_GENERATE_FAIL:
      return {
        loadingScore: false,
        isAuthenticated: false,
        scores: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// export const userInProccessTicketReducer = (
//   state = { ticketInProccess: {} },
//   action
// ) => {
//   switch (action.type) {
//     case LOAD_USER_REQUEST_INPROCCESS:
//       return {
//         loadingInProcess: true,
//         // isAuthenticated: false,
//       };
//     case LOAD_USER_SUCCESS_INPROCCESS:
//       return {
//         ...state,
//         loadingInProcess: false,
//         isAuthenticated: true,
//         ticketInProccess: action.payload,
//       };
//     case LOAD_USER_FAIL_INPROCCESS:
//       return {
//         loadingInProcess: false,
//         isAuthenticated: false,
//         ticketInProccess: null,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

//   export const statusReducer = (state = {}, action) => {
//     switch (action.type) {
//       case UPDATE_TICKET_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case UPDATE_TICKET_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           isUpdated: action.payload,
//         };

//       case UPDATE_TICKET_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };

//       case UPDATE_TICKET_RESET:
//         return {
//           ...state,
//           isUpdated: false,
//         };

//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };

//       default:
//         return state;
//     }
//   };
