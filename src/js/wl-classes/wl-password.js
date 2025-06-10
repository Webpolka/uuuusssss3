
export default class PasswordEye {
    constructor(options) {
        this.inp = document.querySelector(options.input);
        this.togle = document.querySelector(options.toggle);
        this.inp2 = document.querySelector(options.input2);

    }
    listener() {        
        this.inp && this.togle.addEventListener('click', e => this.change(e))
    }
    change(e) {      
        
        e.preventDefault();
        // Переключаем атрибут на инпуте
        const type = this.inp.getAttribute('type') === 'password' ? 'text' : 'password';
        this.inp.setAttribute('type', type);

        // Для второго инпута если он есть
        if (this.inp2) {
            const type2 = this.inp2.getAttribute('type') === 'password' ? 'text' : 'password';
            this.inp2.setAttribute('type', type2);
        }

        // Переключаем видимую иконку
        if (this.togle.querySelector('i').classList.contains('open-eye')) {
            this.togle.querySelector('i').classList.replace('open-eye', 'close-eye')
            this.inp.focus();
        } else {
            this.togle.querySelector('i').classList.replace('close-eye', 'open-eye')
            this.inp.focus();
        }
    }
}
