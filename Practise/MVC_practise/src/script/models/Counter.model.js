class CounterModel {
    constructor(){
        this.select ={
            value: document.querySelector('.value')
        }
    }
    increase(){
        let num = Number(this.select.value.innerText)
        return num +1;   
    }
    decrease(){
        let num = Number(this.select.value.innerText)
        return num -1;   
    }
}

export default CounterModel;