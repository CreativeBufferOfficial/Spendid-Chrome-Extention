import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
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
  CLEAR_ERRORS
} from '../constant/constants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
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

export const lendingReducer = (state = { lendings: {} }, action) => {
  switch (action.type) {
    case LENDING_REQUEST:
      return {
        loadingScore: true,
        // isAuthenticated: false,
      };
    case LENDING_SUCCESS:
      return {
        ...state,
        loadingScore: false,
        isAuthenticated: true,
        lendings: action.payload,
      };
    case LENDING_FAIL:
      return {
        loadingScore: false,
        isAuthenticated: false,
        lendings: null,
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


export const demographicsGenerateReducer = (state = { demographics: {} }, action) => {
  switch (action.type) {
    case DEMOGRAPHICS_REQUEST:
      return {
        loadingScore: true,
        // isAuthenticated: false,
      };
    case DEMOGRAPHICS_SUCCESS:
      return {
        ...state,
        loadingScore: false,
        isAuthenticated: true,
        demographics: action.payload,
      };
    case DEMOGRAPHICS_FAIL:
      return {
        loadingScore: false,
        isAuthenticated: false,
        demographics: null,
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


export const budgetGenerateReducer = (state = { budgets: {} }, action) => {
  switch (action.type) {
    case BUDGET_GENERATE_REQUEST:
      return {
        loadingScore: true,
        // isAuthenticated: false,
      };
    case BUDGET_GENERATE_SUCCESS:
      return {
        ...state,
        loadingScore: false,
        isAuthenticated: true,
        budgets: action.payload,
      };
    case BUDGET_GENERATE_FAIL:
      return {
        loadingScore: false,
        isAuthenticated: false,
        budgets: null,
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
