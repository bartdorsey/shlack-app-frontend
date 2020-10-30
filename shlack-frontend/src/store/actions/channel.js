import { baseUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
export const HIDE_FORM = 'channel/authentication/HIDE_FORM';
export const SHOW_FORM = 'channel/authentication/SHOW_FORM';

export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });

export const createChannel = data => async (dispatch, getState) => {
  const ownerId = window.localStorage.getItem(USER_ID)
  const { authentication: { token } } = getState();
  data.ownerId = ownerId;
  const response = await fetch(`${baseUrl}/channels`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
  }
}
