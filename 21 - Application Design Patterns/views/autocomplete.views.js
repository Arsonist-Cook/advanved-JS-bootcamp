/**
 * @title Criação do input com label
 * @block_begin
 */
const labelId = uuidv4();
const bold = document.createElement('b');
bold.appendChild(document.createTextNode('Search'));

const label = document.createElement('label');
label.setAttribute('for', labelId);
label.appendChild(bold);

//Cria e configura o input
const inputElem = document.createElement('input');
inputElem.classList.add('input');
inputElem.setAttribute('type', 'text');
inputElem.setAttribute('id', labelId);
inputElem.setAttribute('name', labelId);
/**
 * @title -Criação do input com label
 * @block_end
 */

/**
 * @title Criação do Menu dropdown
 * @block_begin
 */
//cria e configura o menu dropdown
const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('dropdown-menu');
// dropdownMenu.appendChild(dropdownContent);

const dropdown = document.createElement('div');
dropdown.classList.add('dropdown');
dropdown.appendChild(dropdownMenu);
/**
 * @title Criação do Menu dropdown
 * @block_end
 */
const sumary = document.createElement('div');

const autocomplete = document.querySelector(anchor); //Acoplamento por elemento do documento
autocomplete.appendChild(label);
autocomplete.appendChild(inputElem);
autocomplete.appendChild(dropdown);
autocomplete.appendChild(sumary);
