const { hash } = window.location;


const form = document.querySelector('#secret-message');
const share = document.querySelector('#share');
const translate = document.querySelector('#translate');

if (hash){
    const message = hash.replace('#', '');//recupera a mensagem
    const decod = translate.querySelector('h1');
        decod.appendChild(document.createTextNode(atob(message)));
    form.parentElement.classList.add('hide');
    translate.classList.remove('hide');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    form.parentElement.classList.add('hide');
	const input = form.querySelector('#message');//recebe a mensagem do input
    
    const encripted = btoa(input.value);
   
    const destination = share.querySelector('#destination');
	destination.value = `${window.location}#${encripted}`;
    destination.select();
    share.classList.remove('hide');
    
});
