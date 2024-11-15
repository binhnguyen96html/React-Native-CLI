import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  firstName: 'Binh',
  lastName: 'Nguyen',
  userId: 1,
  profileImage:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};


const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      return {...state, ...{isLogin: true}, ...action.payload}
    },
    resetToInitialState: () => {
      return initialState;
    },
    updateToken: (state, action) => {
      state.token = action.payload
    }
  },
});

export const {resetToInitialState, logIn, updateToken} = User.actions;
export default User.reducer;