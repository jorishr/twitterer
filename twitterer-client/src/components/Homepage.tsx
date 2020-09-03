import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

//redux state tells us wether user is logged in or not
//if so, display timeline
const Homepage: React.FC = (props: any) => {
    //console.log(props)
    if(props.currentUser.isAuthenticated){
        return (
            <div>
                <MessageTimeline {...props}/>
            </div>
        )
    }
    return (
    <div className="home-hero">
        <h1>What's happening?</h1>
        <h4>New to Twitterer?</h4>
        <Link to="/signup" className="btn btn-primary">Signup here</Link>

    </div>
    )
}
export default Homepage;