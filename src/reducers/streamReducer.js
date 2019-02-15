import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    default:
      return state;
  }
};
// for the first three we only need one record from the whole list, hence the same syntax.
// for the delete we are using lodash the payload on the action creator only returns the id so no need to single it out.
// for fetchStreams we are creating a new onject that uses a lodash map function that uses
// -- two arguments, the first is what we are mapping over the second it what we want the key of the new object to equal
//-- which will be what is the value of the key we ask for. essentially in this case we will be making a new object that
// takes the id from the old object and makes it the key to reach the same stream with that id. confused? watch merging lists of records video.
