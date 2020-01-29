import {combineReducers} from 'redux';
import counter from './count/count.reducer';

export default combineReducers({
    count: counter
})
