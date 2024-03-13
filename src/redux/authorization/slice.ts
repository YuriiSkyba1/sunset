import { createSlice } from '@reduxjs/toolkit';

import { sendForgotPassword } from './thunks';

import type IAuthState from './types';

const initialState: IAuthState = {
  isResetPasswordSent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(sendForgotPassword.fulfilled, (state, { payload }) => {
      state.isResetPasswordSent = payload;
    });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
