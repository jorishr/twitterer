import { apiCall } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';


//action creator function, dispatches and sends user object data to redux reducer
export function setCurrentUser(user: object){   
    return {
        type: SET_CURRENT_USER,
        user
    }
}

//login user: type is either signup or signin; userData comes in from the api request response
//return a fn with dispatch using redux-thunk
//use a promise to wait for the api to finish
//when the userData comes back from the API call, we can set the JWT token in localStorage
//dispatch action creator which creates the current user in the redux store
//then resolve
export function authUser(type: string, userData: object){
    return async (dispatch: Function) => {
        try {
            const result: any = await apiCall('post', `/api/auth/${type}`, userData);
            localStorage.setItem('JwtToken', result.token);
            const {...user} = result;
            dispatch(setCurrentUser(user));
        } catch(err){
            console.log(err);
        }
    }
}

/* export function authUser(type: string, userData: object){
    return (dispatch: Function) => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
                .then((res: any) => {
                    const { token, ...user } = res;
                    localStorage.setItem('JwtToken', token);
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch();
        })
    }
} */
