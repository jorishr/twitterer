import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

/* export interface Action {
    type: string,
    error: string,
    messages: any,
} */

export default (state = [], action: any) => {
    switch (action.type){
        case LOAD_MESSAGES:
            //return copy of messge array
            return [...action.messages]
        case REMOVE_MESSAGE:
            return 'temp'
        default:
            return state
    }
}