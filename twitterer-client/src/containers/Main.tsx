import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import { AuthForm } from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/error';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';

export interface IMainProps {
    authUser: (type: string, userData: object) => Promise<unknown>,
    errors: object,
    removeError: () => object,
    currentUser: object
}

//if user is authenticated display timeline, else show login screen
//switch for multiple routes
//on / route we render the Homepage component with props passed to it from the react router

const Main: React.FC<IMainProps> = (props) => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch>
                <Route  exact path="/" 
                        render={ (props: any) => <Homepage currentUser={currentUser} {...props}/> }>
                </Route>
                <Route  exact path="/signin"
                        render={ (props: any) => {
                            return (
                                <AuthForm   {...props} 
                                            errors={errors}
                                            removeError={removeError}
                                            onAuth={authUser}
                                            btn="Log in" 
                                            heading="Welcome back"/>
                            )
                        }}
                >
                </Route>
                <Route  exact path="/signup"
                        render={ (props: any) => {
                            return (
                                <AuthForm   {...props} 
                                            signup
                                            errors={errors}
                                            removeError={removeError}
                                            onAuth={authUser}
                                            btn="Sign me up" 
                                            heading="Join Twitterer today."/>
                            )
                        }}
                >
                </Route>
                {/* Higher order component that only allows signed in users to proceed */}
                <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
            </Switch>
        </div>
    )
}

//grab redux state, add a key to props object with info about the current user
//if user is authenticated timeline will be shown, else login form
function mapStateToProps(state: any){
    return {
        currentUser: state.currentUser,
        errors: state.error
    }
}

//export the withRouter to get the props from the router to the component above
//the component also will have access to the history object and redirect
//connect the component to the redux store
export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main))