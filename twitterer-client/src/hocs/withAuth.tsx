/*
This HOC handles validation to ensure a user is logged in before 
the wrapped component -MessageFrom- is rendered on the page
A new message can thus only be created by a logged in user

Whether a user is loggedin or not is data that can be found in the redux store
Thus use connect.
*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

export default function withAuth(Component: any) {
    const Authenticate = (props: any) => {
        useEffect(() => {
            if (!props.isAuthenticated) {
                props.history.push('/signin');
            }
        }, []);
        return <Component {...props} />;
    };
    const mapStateToProps = (state: any) => ({
        isAuthenticated: state.currentUser.isAuthenticated,
    });
    return connect(mapStateToProps)(Authenticate);
}