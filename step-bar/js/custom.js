const prevEl = document.getElementById('prev');
const nextEl = document.getElementById('next');
const bar = document.getElementById('bar');
const steps = document.querySelectorAll('.step-bar');

let activeIndex = 1;

nextEl.addEventListener('click', () => {
    activeIndex++;
    if (activeIndex > steps.length) {
        activeIndex = steps.length;
    }
    update();
});
prevEl.addEventListener('click', () => {
    activeIndex--;
    if (activeIndex < 1) {
        activeIndex = 1;
    }
    update();
});


function update() {
    steps.forEach((step, index) => {
        if (activeIndex > index) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }

        const actives = document.querySelectorAll('.active');
        bar.style.width = ((actives.length - 1) / (steps.length - 1) * 100 + '%');

        if (activeIndex === 1) {
            prevEl.classList.add('disable');
        }
        else if (activeIndex === steps.length) {
            nextEl.classList.add('disable');
        }
        else {
            prevEl.classList.remove('disable');
            nextEl.classList.remove('disable');
        }
    });
}