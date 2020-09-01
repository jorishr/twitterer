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
function AuthForm (props: any){
    const [ userData, setUserData ] = useState<UserData>(defaultUserData);
    const handleInput = (e: any) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    }
    return (
        <div className="row justify-content-md-center text-center">
            <div className="col-md-6">
                <form action="" method="post">
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
                </form>
            </div>
        </div>
    )
}

export default AuthForm;