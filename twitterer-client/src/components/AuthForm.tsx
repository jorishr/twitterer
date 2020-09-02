import React, { useState }from 'react';

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
    const handleInput = (e: any) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        //get the type of action to dispatch and pass it to the api call fn
        //also include the current state of the userData
        //onAuth returns a promise
        const authType = props.signup ? 'signup' : 'signin';
        console.log(props.onAuth)
        props.onAuth(authType, userData).then(() => {
                //redirect to other page
                console.log("Logged in");
            })

    }
    return (
        <div className="row justify-content-md-center text-center">
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
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