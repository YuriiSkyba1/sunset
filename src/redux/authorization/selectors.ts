import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const authorizationsStateSelector = ({ auth }: RootState) => auth;

export const resetPasswordSent = createSelector(
  authorizationsStateSelector,
  (state) => state.isResetPasswordSent,
);

