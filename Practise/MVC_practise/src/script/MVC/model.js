import store from '../redux/store';
import { increase,decrease } from '../redux/reducers/count/count.actions';

class Model {
    decrease(){
        store.dispatch(decrease())
        // console.log(store.getState());
    }

    increase(){
        store.dispatch(increase())
    }
}

export default Model;