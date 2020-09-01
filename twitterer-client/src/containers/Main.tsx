import React from 'react';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';

//if user is authenticated display timeline, else show login screen
//switch for multiple routes
//on / route we render the Homepage component with props passed to it from the react router
const Main = (props: Object) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={ (props: Object) => <Homepage {...props}/> }>

                </Route>
            </Switch>
        </div>
    )
}

//grab redux state, add a key to props object with info about the current user
//if user is authenticated timeline will be shown, else login form
function mapStateToProps(state: any){
    return {
        currentUser: state.currentUser
    }
}

//export the withRouter to get the props from the router to the component above
//the component also will have access to the history object and redirect
//connect the component to the redux store
export default withRouter(connect(mapStateToProps, null)(Main))