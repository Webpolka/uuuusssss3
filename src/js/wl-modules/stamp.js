export default function stampResize() {

    changeText(); 

    window.addEventListener('resize', changeText);
    
    function changeText() {
        let all = document.querySelectorAll('.stamp-resize span')
        // let stampInner = document.querySelector('.stamp-wrap')

        all.forEach(span => {
            spanResize(span)
        })
        function spanResize(span) {
            const min = 0.6;
            const max = 0.8;
            const minscreen = 768;
            const maxscreen = 1200;
            const win = window.innerWidth;

            if (win >= maxscreen) {
                span.style.fontSize = max + 'rem';
            }
            if (win <= minscreen) {
                span.style.fontSize = min + 'rem';
            }
            if (win > minscreen && win < maxscreen) {
                let fz = win / 1200;
                console.log(fz);
                
                if (fz > min) {
                    span.style.fontSize = fz + 'rem';
                }
                if (fz < max) {
                    span.style.fontSize = fz + 'rem';
                }
            }
        }
    }

}