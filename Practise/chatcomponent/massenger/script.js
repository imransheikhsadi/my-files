document.querySelector('.textarea').addEventListener('input',(event)=>{
    console.log(event);
    event.target.style.height = 'auto';
    event.target.style.height = (event.target.scrollHeight + 10)+ 'px';
    
});