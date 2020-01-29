import store from '../redux/store';
import { select } from '../base';
import { initialState } from '../redux/reducers/count/count.reducer';

select.value.innerText = initialState;

store.subscribe(()=>{
    const {count} = store.getState()

    select.value.innerText = count;
    
});



