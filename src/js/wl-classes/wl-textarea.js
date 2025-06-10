export default class TextArea {
    constructor(options) {
        this.area = document.querySelector(options.element) // textarea
        this.counter = document.querySelector(options.counterSpan) // счётчик
        this.max = options.maxLenght; // допустимое кол-во символов  
    }
    listener() {
        if (this.area) {
            this.area.addEventListener('input', e => this.onInput(e));
            this.area.addEventListener('keydown', (e) => {
                if (this.area.value.length > this.max - 1)
                    if (!(e.which == '46' || e.which == '8' || e.which == '13')) // backspace/enter/del
                        e.preventDefault();
            });
        }
    }
    onInput(e) {
        const length = e.target.value.length
        this.counter.textContent = length
    }
}
