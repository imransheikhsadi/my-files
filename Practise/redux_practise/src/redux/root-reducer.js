import {combineReducers} from 'redux';
import countReducer from './count/count.reducer';

export default combineReducers({
    count: countReducer
})