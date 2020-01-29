class AppController{
    constructor(model,select){
        this.handle = model;
        this.select = select;

        this.events();
    }

    events(){
        const {decrease,increase} = this.select;
        const handle = this.handle;
        
        decrease.addEventListener('click',handle.decrease)
        increase.addEventListener('click',handle.increase)
        
    }

}

export default AppController;