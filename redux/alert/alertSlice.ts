import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initAlertState {
  open?: boolean;
  title?: string;
  text?: string;
  ok?: () => void;
}

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState: {
    open: false,
    title: "false",
    text: "false",
    ok: undefined,
  } as initAlertState,
  reducers: {
    setAlert: (state, action: PayloadAction<initAlertState>) => {
      state.open = action.payload.open
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.ok = action.payload.ok;
    }
}}
);
