import streams from '../apis/streams';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
  } from './types';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};
// by making our payload the userId we can then assign later changes to
// streams in the application to be with the speicific signed in user.
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
// Both of these action creators will return True once they have been called.

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data});
    history.push('/');
  };
};
// history uses push which essentially naviagates to where we want to go it has been put here instead
// using a link this makes it so that it waits until the stream is created sucessfully before moving on.

//^^^^^ the above code can also be written: export const createStream = formValues => dispatch => {};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data})
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({type: DELETE_STREAM, payload: id });
  history.push("/");
};
