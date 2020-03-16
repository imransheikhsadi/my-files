const element = document.querySelector('#select');

document.querySelector('.btn').addEventListener('click',()=>{
    element.classList.remove('animate');
    void element.offsetWidth;
    element.classList.add('animate');
});

