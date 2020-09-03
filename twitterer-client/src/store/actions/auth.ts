import { apiCall, setTokenHeader} from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from '../actions/error';

//abstract setTokenHeader fn
//used in login fn and log out fn
//see also in App.js for 'hydration' and JWT tampering prevention
export function setAuthToken(token: string | boolean){
    setTokenHeader(token);
}

//action creator function, dispatches and sends user object data to redux reducer
export function setCurrentUser(user: object): object{   
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
            setAuthToken(result.token);
            localStorage.setItem('jwtToken', result.token);
            const {...user} = result;
            dispatch(setCurrentUser(user));
            //remove previously existing errors
            dispatch(removeError());
        } catch(err){
            //if err occurs during auth, dispatch the error
            //in main.ts these errors are sent to the form via state and props
            //console.log(err);
            dispatch(addError(err.message));
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
                    //dispatch(removeError());
                    resolve();
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(addError(err));
                    reject();
                })
        })
    }
} */

export function logout(){
    return (dispatch: Function) => {
        //remove Authentication token from future http headers
        setAuthToken(false);
        localStorage.clear();
        dispatch(setCurrentUser({}))
    }
}