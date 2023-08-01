import { combineReducers } from 'redux';
import { alertSlice } from './alert/alertSlice';

export const rootReducer = combineReducers({
  alert: alertSlice.reducer,
});

