import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
//compose to combine functions together, as second argument in createStore()
//thunk middleware to delay evaluation of expressions (async code in redux)
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(){
    const store = createStore(
        rootReducer, 
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
    return store;
}