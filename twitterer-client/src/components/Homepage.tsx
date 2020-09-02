import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = (props: Object) => (
    <div className="home-hero">
        <h1>What's happening?</h1>
        <h4>New to Twitterer?</h4>
        <Link to="/signup" className="btn btn-primary">Signup here</Link>

    </div>
)

export default Homepage;