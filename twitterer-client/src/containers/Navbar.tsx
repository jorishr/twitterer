import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/warbler-logo.png'
import { IProps } from './Main';
import { logout } from '../store/actions/auth';

const Navbar: React.FC = (props: any) => {
    return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="Twitterer Home"></img>    
                    </Link>
                </div>
                {/*show logout/new message links or signin/signup links*/}
                {props.currentUser.isAuthenticated ? (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to={`/users/${props.currentUser.user.id}/messages/new`}>New message</Link>
                        </li>
                        <li>
                            <a onClick={props.logout}>Logout</a>
                        </li>
                    </ul>
                )
                : (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Log in</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

//grab redux state, add a key to props object with info about the current user
//if user is authenticated, different info is displayed in the navbar
function mapStateToProps(state: any){
    return {
        currentUser: state.currentUser
    }

}
//connect Navbar component to Redux store
export default connect(mapStateToProps, { logout })(Navbar);