const togglebtn = document.querySelector('.togglebtn');
const leftSide = document.querySelector('.left-side');

togglebtn.addEventListener('click', () => {
    leftSide.classList.toggle('collapsed');
});