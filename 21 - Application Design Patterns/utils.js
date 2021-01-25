const debounce = (fn, delay) => {
	let timeoutId;

	return (...evts) => {
        
        if (timeoutId) {
			clearTimeout(timeoutId);
        }
        
		timeoutId = setTimeout(() => {
			fn.apply(null, evts);
        }, delay);
        
		console.log(delay);
	};
};

//função com acoplamento por gerar elementos da UI
//Função com repetição de elementos de configuração
const searchMovie = async (search) => {
	const url = 'http://www.omdbapi.com/';
	const params = {
		apikey: 'd75c8e1d',
		s: search
    };
    
	const response = await axios.get(url, { params });
    
    console.log(response);
    if(response.data.Error){
        return [];
    }
    return response.data.Search;
};
//Função com repetição de elementos de configuração e código
const getMovie = async (id) => {
	const url = 'http://www.omdbapi.com/';
	const params = {
		apikey: 'd75c8e1d',
		i: id
    };
    
	const response = await axios.get(url, { params });
    
    // console.log(response);
    if(response.data.Error){
        return [];
    }
    return response.data;
};
