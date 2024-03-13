import axios from 'axios';
import { toast } from 'react-toastify';

import type { IErrorResponse } from '@/data-transfer/responses';
import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

interface IHandleThunkApiErrorOptions {
  showToast?: boolean;
}

type ThunkApi<Action, Response> = Parameters<AsyncThunkPayloadCreator<Response, Action>>[1];

const handleShowToast = (e: unknown, options?: IHandleThunkApiErrorOptions) => {
  if (!options?.showToast) {
    return;
  }
  if (axios.isAxiosError(e)) {
    const data = e?.response?.data as IErrorResponse;
    if (data?.message) {
      toast.error(data.message);
    }
  }
  if (e instanceof Error && e.message) {
    toast.error(e.message);
  }
};

export const handleThunkApiError = <Action, Response>(
  service: (action: Action, thunkAPI?: ThunkApi<Response, Action>) => Promise<Response>,
  options?: IHandleThunkApiErrorOptions,
) => {
  return async (action: Action, thunkAPI: ThunkApi<Response, Action>) => {
    try {
      return await service(action, thunkAPI);
    } catch (e) {
      handleShowToast(e, options);

      if (axios.isAxiosError(e)) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw thunkAPI.rejectWithValue(e?.response?.data);
      }

      throw e;
    }
  };
};
