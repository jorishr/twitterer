import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Navbar(){
    return (
        <>
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src="" alt="Twitterer Home"></img>    
                </Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <Link to="/signin">Log in</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

//grab redux state, add a key to props object with info about the current user
//if user is authenticated, different info is displayed in the navbar
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }

}
//connect Navbar component to Redux store
export default connect(mapStateToProps, null)(Navbar);