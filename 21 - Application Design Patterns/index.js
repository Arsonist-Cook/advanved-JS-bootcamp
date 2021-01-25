/***
 * Este código requer:
	<script src="https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"></script>
	para funcionar corretamente...

 */
function createStatistics(label, statistic){
	const article = document.createElement('article');
		article.classList.add('notification', 'is-primary');
	const title = document.createElement('p');
		title.classList.add('title');
		title.appendChild(document.createTextNode(statistic));
	const subtitle = document.createElement('p');
		subtitle.classList.add('subtitle');
		subtitle.appendChild(document.createTextNode(label));
	article.appendChild(title);
	article.appendChild(subtitle);
	return article;
}
function createSumary(movie) {
	const article = document.createElement('article');
	article.classList.add('media');
	const figure = document.createElement('figure');
	figure.classList.add('media-left');
	const pFig = document.createElement('p');
	const img = document.createElement('img');
	img.setAttribute('src', movie.Poster); //Falta colocar o link da imagem
	const mediaContent = document.createElement('div');
	mediaContent.classList.add('media-content');
	const content = document.createElement('div');
	content.classList.add('content');
	const h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode(movie.Title)); //Precisamos substituir pelo Nome do filme
	const h4 = document.createElement('h4');
	h4.appendChild(document.createTextNode(movie.Genre)); //Precisamos substituir pelo Gênero do filme
	const pCont = document.createElement('p');
	pCont.appendChild(document.createTextNode(movie.Plot)); //precisamos preencher com o plot
	pFig.appendChild(img);
	figure.appendChild(pFig);
	article.appendChild(figure);
	content.appendChild(h1);
	content.appendChild(h4);
	content.appendChild(pCont);
	mediaContent.appendChild(content);
	article.appendChild(mediaContent);
	const div = document.createElement('div');
	div.appendChild(article);
	div.appendChild(createStatistics('Awards', movie.Awards));
	div.appendChild(createStatistics('Box Office', movie.BoxOffice));
	div.appendChild(createStatistics('Metascore', movie.Metascore));
	div.appendChild(createStatistics('IMDB Rating', movie.imdbRating));
	div.appendChild(createStatistics('IMDB Votes', movie.imdbVotes));
	return div;
}


//Função com acoplamento de UI

const sumary = document.querySelector('#sumary');
sumary.addEventListener("DOMNodeInserted",()=>{console.log('Sumary changed')});

function createAutoComplete(anchor){
	const onClick = async (event) => {
		const id = event.target.dataset.mid;
		console.log(id);
		const movie = await getMovie(id);
		console.log(movie);
		inputElem.value = movie.Title;
		dropdown.classList.remove('is-active');
		
			sumary.appendChild(createSumary(movie));
		
	};
	const onInput = async (event) => {
		const movies = await searchMovie(event.target.value);
		dropdownContent.innerHTML = '';
		if (!movies.length) {
			dropdown.classList.remove('is-active');
			return;
		}
		dropdown.classList.add('is-active');
	
		// console.log(movies);
	
		for (let movie of movies) {
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			option.setAttribute('data-mid', movie.imdbID);
			option.addEventListener('click', onClick);
			const img = document.createElement('img');
	
			if (movie.Poster == 'N/A') {
				movie.Poster = '';
			}
	
			img.setAttribute('src', movie.Poster);
			img.setAttribute('data-mid', movie.imdbID);
			option.appendChild(img);
			option.appendChild(document.createTextNode(movie.Title));
	
			dropdownContent.appendChild(option);
		}
	};
	const checkResults = (event) => {
		if (dropdownContent.children.length && !dropdown.classList.contains('is-active')) {
			dropdown.classList.add('is-active');
		}
	};
//Cria o label do formulário de pesquisa
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
inputElem.addEventListener('input', debounce(onInput, 1000)); //Acoplamento por função de callback
inputElem.addEventListener('focus', checkResults); //Acoplamento por função callback

//cria e configura o menu dropdown
const dropdownContent = document.createElement('div');
dropdownContent.classList.add('dropdown-content', 'results');

const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('dropdown-menu');
dropdownMenu.appendChild(dropdownContent);

const dropdown = document.createElement('div');
dropdown.classList.add('dropdown');
dropdown.appendChild(dropdownMenu);

//adiciona os elementos criados ao documento
const autocomplete = document.querySelector(anchor); //Acoplamento por elemento do documento
autocomplete.appendChild(label);
autocomplete.appendChild(inputElem);
autocomplete.appendChild(dropdown);

document.addEventListener('click', (event) => {
	if (!autocomplete.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});
return autocomplete;
}
createAutoComplete('.autocomplete');
createAutoComplete('.autocomplete1');
//event listener para fechar o menu

