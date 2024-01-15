import { configureStore } from '@reduxjs/toolkit';

// Definiuj początkowy stan
const initialState = {
  isLogged: false,
  flag: true
};

// Definiuj reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      // console.log("login action in reducer");
      return {
        ...state,
        isLogged: true,
        tokens: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false
      };
    case 'SET_USER_GROUPS':
      return {
        ...state,
        flag: !state.flag
      };
    default:
      return state;
  }
};

// Definiuj store
const store = configureStore({
  reducer: userReducer
});

export default store;