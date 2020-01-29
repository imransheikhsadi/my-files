class CounterView{
    constructor(){
        this.select ={
            value: document.querySelector('.value')
        }
    }

    count(value){
        this.select.value.innerText = value
    }
}

export default CounterView;