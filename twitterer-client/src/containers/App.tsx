import React from 'react';
import '../App.css';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

//create the store
const store = configureStore();

/*
'HYDRATION': if server goes down or after unexpected page refresh or Redux reset, 
check for token in localStorage and repopulate the STATE with the currentUser info
found in the token
Use try-catch to prevent manual tampering with the JWT token
*/
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  try {
    //decode the toke
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch({});
  }
}

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
