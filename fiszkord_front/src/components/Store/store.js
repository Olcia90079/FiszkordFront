import { configureStore } from '@reduxjs/toolkit';

// Definiuj początkowy stan
const initialState = {
  isLogged: false
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
    default:
      return state;
  }
};

// Definiuj store
const store = configureStore({
  reducer: userReducer
});

export default store;