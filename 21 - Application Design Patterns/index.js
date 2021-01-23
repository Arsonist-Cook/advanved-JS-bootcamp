const onInput = async (event) => {
    const movies = await searchMovie(event.target.value);
    
    console.log(movies);

    for(let movie of movies){

        const div = document.createElement('div');
        if(movie.Poster == "N/A"){
            movie.Poster = "";
        }
        div.innerHTML =`
            <img src="${movie.Poster}"/>
            <h1>${movie.Title}</h1>
            `;

        document.querySelector('#target').appendChild(div);
    }
};

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 1000));
