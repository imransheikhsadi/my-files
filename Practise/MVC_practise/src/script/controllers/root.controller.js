import CountController from './sub_controllers/count.controller';
import CounterModel from '../models/Counter.model';
import CounterView from '../views/counter.view';

class RootController {
    constructor(){
        new CountController(new CounterModel,new CounterView)
    }
}

export default RootController;