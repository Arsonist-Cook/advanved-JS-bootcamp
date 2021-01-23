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
