import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

//action creators for adding and removing errors
//exported to auth.ts for better error handling 
export const addError = (error: object): object => ({
    type: ADD_ERROR,
    error
})

export const removeError = () => ({
    type: REMOVE_ERROR,
})