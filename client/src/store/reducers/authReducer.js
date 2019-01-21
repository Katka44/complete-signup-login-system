import {
  START_FETCHING,
  AUTH_USER_FAIL,
  SIGN_UP_USER_FAIL,
  AUTH_USER_SUCCESS,
  SIGN_UP_USER_SUCCESS,
  LOG_OUT
} from "../actions/types";

const initState = {
  loading: false,
  authErrors: null,
  signUpErrors: null,
  user: null,
  signUpMsg: ""
};

export default function(state = initState, action) {
  switch (action.type) {
    //   case START_FETCHING:
    //     return {
    //       ...state,
    //       loading: true,
    //     };
    //   case AUTH_USER_SUCCESS:
    //     return {
    //       ...state,
    //       user: action.payload,
    //       loading: false,
    //       authErrors: null,
    //       signUpErrors: null,
    //       signUpMsg: '',
    //     };
    //   case AUTH_USER_FAIL:
    //     return {
    //       ...state,
    //       loading: false,
    //       authErrors: action.payload,
    //     };
    //   case SIGN_UP_USER_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       signUpErrors: null,
    //       signUpMsg: action.payload,
    //     };
    //   case SIGN_UP_USER_FAIL:
    //     return {
    //       ...state,
    //       loading: false,
    //       signUpErrors: action.payload,
    //       signUpMsg: '',
    //     };
    //   case LOG_OUT:
    //     return {
    //       ...state,
    //       user: null,
    //       loading: false,
    //     };

    default:
      return state;
  }
}
