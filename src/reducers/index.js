import { combineReducers } from 'redux'; // we use the brackets because we just want the function
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// USING---> as: RENAMES the import name so you dont repeat names or just make it more specific


export default combineReducers({
  auth : authReducer,
  form: formReducer,
  streams: streamReducer
});
// when using form-reducer you have to use this syntax with form being the name
