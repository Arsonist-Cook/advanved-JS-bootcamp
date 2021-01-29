/**
 * Configura a transformação do dataset, associando os campos de origem e destino, no formato
{origem:destino}
 */
const searchResultConfig = {
	fields: {
		imdbID: '_id',
		Poster: 'poster',
		Title: 'title',
		Type: 'type',
		Year: 'year'
	}
};

const movieDetailConfig = {
	fields: {
		...searchResultConfig.fields,
		Genre: 'genre',
		Plot: 'plot'
	},
	statistics: {
		fields: {
			Awards: 'awards',
			BoxOffice: 'boxOffice',
			Metascore: 'metascore',
			imdbRating: 'imdbRating',
			imdbVotes: 'imdbVotes'
		},
		dataset: {
			intFields: [ 'boxOffice', 'metascore', 'imdbVotes' ],
			floatFields: [ 'imdbRating' ],
			specialFields: [ 'awards' ]
		}
	}
};

class ConfigurableFields {
	constructor(origin, { fields }) {
		// const fields = config.fields;
		if (fields) {
			for (const key in fields) {
				const destiny = fields[key];
				this[destiny] = origin[key] && origin[key].toLowerCase() === 'n/a' ? '' : origin[key];
			}
		}
	}
}

class Result extends ConfigurableFields {
	constructor(result, config) {
		super(result, config);
	}
}

class Statistics extends ConfigurableFields {
	constructor(result, { fields, dataset }) {
		super(result, { fields });
		//Cria o dataset vazio
		this._dataset = {};

		if (dataset) {
			const { intFields, floatFields, specialFields } = dataset;
			this._setSpecialFields(intFields, this._getIntData);
			this._setSpecialFields(floatFields, parseFloat);
			this._setSpecialFields(specialFields, this._awardAssembler);
		}
	}

	_setSpecialFields(fieldList = [], handler) {
		for (const dataField of fieldList) {
			this._dataset[dataField] = handler(this[dataField]);
		}
	}

	_getIntData(data) {
		return parseInt(data.replaceAll(/[\$\,]/g, ''));
	}

	_awardAssembler(awards) {
		const words = awards.split(' ');

		const data = words.reduce((total, word) => {
			let number = parseInt(word);
			if (isNaN(number)) {
				number = 0;
			}
			return total + number;
		}, 0);

		return data;
	}

	_comparison(field, compared) {
		let result = 0; //mismatch Value
		const dataset = this._dataset;
		if (dataset[field] > compared[field]) {
			result = 1; //local wins
		} else if (dataset[field] < compared[field]) {
			result = -1; //locals loose
		}

		return result;
	}

	compare({ _dataset: compared }) {
		const result = {};
		for (const field in compared) {
			// if (field !== '_dataset') {
			result[field] = this._comparison(field, compared);
			// }
		}
		return result;
	}
}

class ResultDetail extends ConfigurableFields {
	constructor(result, { fields, statistics }) {
		super(result, { fields });

		if (statistics) {
			this.statistics = new Statistics(result, statistics);
		}
	}
}

//Base Code Experimentation
const movie = {
	Actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth',
	Awards: 'Nominated for 1 Oscar. Another 38 wins & 79 nominations.',
	BoxOffice: '$623,357,910',
	Country: 'USA',
	DVD: 'N/A',
	Director: 'Joss Whedon',
	Genre: 'Action, Adventure, Sci-Fi',
	Language: 'English, Russian, Hindi',
	Metascore: '69',
	Plot:
		"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
	Poster:
		'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
	Production: 'Marvel Studios',
	Rated: 'PG-13',
	Released: '04 May 2012',
	Response: 'True',
	Runtime: '143 min',
	Title: 'The Avengers',
	Type: 'movie',
	Website: 'N/A',
	Writer: 'Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)',
	Year: '2012',
	imdbID: 'tt0848228',
	imdbVotes: '1,257,956',
	imdbRating: '8.0'
};

const resDet = new ResultDetail(movie, movieDetailConfig);
