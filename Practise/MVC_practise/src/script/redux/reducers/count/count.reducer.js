import {actionTypes} from './count.action.types';

const {INCREASE,DECREASE} = actionTypes;
export const initialState = 100;


const counter = (state = initialState, action)=>{
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}

export default counter;