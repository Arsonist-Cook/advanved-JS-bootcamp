const input = document.querySelector('#search');
input.addEventListener('focusin',(event)=>{
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
});
input.addEventListener('focusout',(event)=>{
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
});