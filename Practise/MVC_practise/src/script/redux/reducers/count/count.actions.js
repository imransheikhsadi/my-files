import {actionTypes} from './count.action.types';

const {INCREASE,DECREASE} = actionTypes;

export const increase = ()=>({
    type: INCREASE
})
export const decrease = ()=>({
    type: DECREASE
})