import { SET_CURRENT_USER } from '../actionTypes';

export interface IUserState {
    isAuthenticated: boolean,
    user: object
}

export interface IUserAction {
    type: string,
    user: object
}

const DEFAULT_STATE: IUserState = {
  isAuthenticated: false, 
  user: {} 
};

/*
SET_CURRENT_USER reducer: 
populates the state object with user values upon succesfull login
*/ 
export default (state: IUserState = DEFAULT_STATE, action: IUserAction): object => {
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