import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { alertSlice, initAlertState } from './alertSlice';

export function useAlert() {
  const { open, title, text, ok } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();
  const setAlert = (_siteData: initAlertState) => dispatch(alertSlice.actions.setAlert(_siteData));

  return {
    setAlert,
    open, title, text, ok
  };
}
