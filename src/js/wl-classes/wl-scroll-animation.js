
export class ScrollAnimation {
    constructor(options) {
        this.point = options.point
        this.delay = options.delay         
    }

    colAnimation() {       
        let point = this.point;
        let activeClass = 'active';
        let revels = document.querySelectorAll('[data-animation]');        
        var revealpoint = point;

        reveal()
        window.addEventListener('scroll', reveal);

        function reveal() {           
            var windowheight = window.innerHeight
            for (var j = 0; j < revels.length; j++) {               
                let revealtop = revels[j].getBoundingClientRect().top;
                if (revealtop < windowheight - revealpoint) {
                    revels[j].classList.add(activeClass)
                } else {
                    revels[j].classList.remove(activeClass)
                }
            }
        }
    }

    rowAnimation() {
        let point = this.point;
        let delay = this.delay;
        let activeClass = 'active';
        let parent = '[data-wrapAnimation]';
        let child = '[data-itemAnimation]';       
        let revels = document.querySelectorAll(parent)        
        var revealpoint = point;

        revealRow()
        window.addEventListener('scroll', revealRow);
        
        function revealRow() {           
            var windowheight = window.innerHeight
            for (var j = 0; j < revels.length; j++) {                
                var revealtop = revels[j].getBoundingClientRect().top;                
                if (revealtop < windowheight - revealpoint) {
                    revels[j].classList.add(activeClass)
                    if (revels[j].classList.contains(activeClass)) {
                        let cc = 0
                        revels[j].querySelectorAll(child).forEach(el => {
                            el.classList.add(activeClass)
                            el.style.transitionDelay = (cc * delay) + 'ms'
                            cc++;
                        })
                        cc = 0
                    }
                } else {
                    revels[j].classList.remove(activeClass)
                    if (!revels[j].classList.contains(activeClass)) {
                        revels[j].querySelectorAll(child).forEach(el => {
                            el.classList.remove(activeClass)
                            el.style.transitionDelay = 0 + 'ms'
                        })

                    }
                }
            }
        }
    }
    init() {
        const parent = document.querySelector('[data-wrapAnimation]')
        const child = document.querySelector('[data-itemAnimation]')
        const lonely = document.querySelector('[data-animation]')

        if (parent && this.delay && child) {
            this.rowAnimation();           
        } 
        if (lonely){
            this.colAnimation();          
        }

    }
}

