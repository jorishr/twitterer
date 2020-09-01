import { SET_CURRENT_USER } from '../actionTypes';

export interface State {
    isAuthenticated: boolean,
    user: object
}

export interface Action {
    type: string,
    user: object
}

const DEFAULT_STATE: State = {
  isAuthenticated: false, // true when logged in
  user: {} // all the user info when logged in
};

export default (state: State = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
        /* 
          (!!0 -> !true -> false)
          alternatives: 
            - isAuthenticated: Object.keys(action.user).length > 0
            - isAuthenticated: Boolean(Object.keys(action.user).length)
          turns empty object into false (keys results into arr with length 0 if empty)
        */
      };
    default:
      return state;
  }
};