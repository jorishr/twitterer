import axios from 'axios';

/*
- generic way to build AJAX requests
- export a fn that returns a Promise
- the promise that is resolved when the redux action is resolved
- when resolved, it returns a function that makes an Axios http request, 
using the specified http method and called with the specified url path and data
*/

export interface IAxios {
    [key: string]: any
}

const axiosObj: IAxios = axios;

export interface IResponse {
    data?: object,
    error?: object
}

export function apiCall (method: string, path: string, data?: object){
    return new Promise((resolve, reject) => {
        return axiosObj[method](path, data)
            .then((res: IResponse) => {
                return resolve(res.data);
            })
            .catch((err: IResponse) => {
                return reject(err)
            })
    })
}
//axios response data always comes back as an object

//function to attach the JWT token to each HTTP request in the http header

export function setTokenHeader(token: string | boolean){
    if(token){
        //adjust Axios default obj to add token to all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    } else {
        //if token is no longer present in localStorage, remove from http header
        delete axios.defaults.headers.common['Authorization'];
    }
} 