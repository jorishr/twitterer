import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

export interface Action {
    type: string,
    error: string,
}

export default (state = { message: null }, action: Action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};