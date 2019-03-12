const axios = require("axios");

const initialState = {
  user: {}
};

const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/auth/user")
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data,
        isLoading: false
      };
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
