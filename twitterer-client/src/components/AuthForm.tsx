import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

export interface UserData {
    username: string,
    email: string,
    password: string,
    profileImgUrl: string
}

//set default state for User
const defaultUserData: UserData = {
    username: "",
    email: "",
    password:"",
    profileImgUrl: ""
}

export function AuthForm (props: any){
    const [ userData, setUserData ] = useState<UserData>(defaultUserData);
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //get the type of action to dispatch and pass it to the api call fn
        //also include the current state of the userData
        //onAuth returns a promise
        const authType = props.signup ? 'signup' : 'signin';
        console.log(props)
        //onAuth fn returns a promise
        props.onAuth(authType, userData)
            .then(() => {
                //redirect to other page using the react router history
                //push back to home route where timeline will be shown
                //console.log("Logged in");
                props.history.push('/');
            })
            .catch(() => {
                return
            })

    }
    //listen for route changes and remove existing error messages
    props.history.listen(() => {
        //console.log("route change detected")
        //console.log(props)
        props.removeError();
    })
    return (
        <div className="row justify-content-md-center text-center">
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                    {/* error reporting */}
                    {props.errors.message && (
                        <div className="alert alert-danger">
                            {props.errors.message}
                        </div>
                    )}
                    {/* base version: login form */}
                    <h2>{props.heading}</h2>
                    <label htmlFor="email">Email:</label>
                    <input  type="text" name="email" id="email" 
                            className="form-control"
                            value={userData.email}
                            onChange={handleInput}/>
                    <label htmlFor="password">Password:</label>
                    <input  type="password" name="password" id="password" 
                            className="form-control"
                            onChange={handleInput}/>
                    {/* extended form version: signup fields */}
                    {props.signup && (
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input  type="text" name="username" id="username" 
                                    className="form-control"
                                    value={userData.username}
                                    onChange={handleInput}/>
                            <label htmlFor="profileImgUrl">Profile Image Url:</label>
                            <input  type="text" name="profileImgUrl" id="profileImgUrl" 
                                    className="form-control"
                                    onChange={handleInput}/>                            
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                        {props.btn}
                    </button>
                </form>
            </div>
        </div>
    )
}