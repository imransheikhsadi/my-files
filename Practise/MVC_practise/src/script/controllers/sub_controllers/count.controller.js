class CountController {
    constructor(model, view) {
        this.handle = model;
        this.update = view;
        this.select = {
            increase: document.querySelector('.increase'),
            decrease: document.querySelector('.decrease')
        }

        this.events();
    }

    handleIncrease = () => {
        this.update.count(this.handle.increase())
    }
    handleDecrease = () => {
        this.update.count(this.handle.decrease())
    }

    events() {
        this.select.increase.addEventListener('click', this.handleIncrease)
        this.select.decrease.addEventListener('click', this.handleDecrease)
    }
}

export default CountController;