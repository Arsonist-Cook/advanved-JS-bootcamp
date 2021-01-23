const onClick = async (event) => {
	// const id = event.target.getAttibute('src');
	const id = event.target.getAttribute('src');
	console.log(id);
	const movie = await getMovie(id);
	console.log(movie);
};

const onInput = async (event) => {
	const movies = await searchMovie(event.target.value);
	dropdownContent.innerHTML = '';
	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
	dropdown.classList.add('is-active');
	

	console.log(movies);

	for (let movie of movies) {
		const option = document.createElement('a');
		option.classList.add('dropdown-item');
		option.setAttribute('src', movie.imdbID);
		option.addEventListener('click', onClick);
		const img = document.createElement('img');

		if (movie.Poster == 'N/A') {
			movie.Poster = '';
		}
		img.setAttribute('src', movie.Poster);
		option.appendChild(img);
		option.appendChild(document.createTextNode(movie.Title));
		// option.innerHTML = `
		//     <img src="${movie.Poster}"/>
		//     ${movie.Title}
		//     `;

		dropdownContent.appendChild(option);
	}
};

const checkResults = (event) => {
	if (dropdownContent.children.length && !dropdown.classList.contains('is-active')) {
		dropdown.classList.add('is-active');
	}
};

const autocomplete = document.querySelector('.autocomplete');

const label = document.createElement('label');
label.innerHTML = '<b>Search For a Movie</b>';
// autocomplete.parentElement.prepend(label);

const inputElem = document.createElement('input');
inputElem.classList.add('input');
inputElem.addEventListener('input', debounce(onInput, 1000));
inputElem.addEventListener('click', checkResults);

const dropdown = document.createElement('div');
dropdown.classList.add('dropdown');

const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('dropdown-menu');

const dropdownContent = document.createElement('div');
dropdownContent.classList.add('dropdown-content', 'results');

autocomplete.appendChild(label);
autocomplete.appendChild(inputElem);

autocomplete.appendChild(dropdown);
// dropdown.appendChild(label)
// dropdown.appendChild(inputElem);
dropdown.appendChild(dropdownMenu);
dropdownMenu.appendChild(dropdownContent);

document.addEventListener('click', (event) => {
	if (!autocomplete.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});
