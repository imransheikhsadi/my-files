import CountActionTypes from './count.types';

const initialState = {
    count: 100
}

const countReducer = (state = initialState, { type }) => {
    switch (type) {

        case CountActionTypes.SUB:
            return {
                count: state.count - 1
            }

        case CountActionTypes.ADD:
            return {
                count: state.count + 1
            }

        default:
            return state
    }
}

export default countReducer;