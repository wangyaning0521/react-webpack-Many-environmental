import { createStore }          from 'redux';  
import { combineReducers }      from 'redux'
import mainAction               from './main.jsx'

const reducer = combineReducers({
    mainAction,
});

export default createStore(reducer)