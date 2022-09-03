import savedDataInLocalStorage from './localstorage';
import eventClickButton from './detail-movies';

const result = document.getElementById('result');
export const input = document.getElementById('search-movie');

// Fetch Movies from API
export default async function getMovies(urlApi, key) {
	result.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" class="animate-spin mx-auto"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill="rgba(37,99,235,1)"/></svg>`;

	// Get url search movies
	const movieName = input.value;
	const combineUrl = `${urlApi}?apikey=${key}&s=${movieName}`;

	const responses = await fetch(combineUrl);
	if (!responses.ok) {
		result.innerHTML = `<h2 class="mb-1 text-xl text-zinc-700 sm:text-2xl dark:text-slate-200">Hasil: </h2>
			<p class="dark:text-slate-300"> API sedang bermasalah, silahkan coba nanti lagi. </p>`;
		savedDataInLocalStorage(movieName, {
			message: 'API sedang bermasalah',
			status: 401,
			titleResult: result.children[0].textContent,
			movieResult: result.children[1].textContent,
		});
	} else {
		const data = await responses.json();

		setTimeout(() => {
			if (data.Response === 'False') {
				result.innerHTML = `<h2 class="mb-1 text-xl text-zinc-700 sm:text-2xl dark:text-slate-200">Hasil: </h2>
				<p class="dark:text-slate-300"> Film tidak ditemukan! </p>
				`;
				savedDataInLocalStorage(movieName, {
					message: 'Film tidak ditemukan',
					status: 404,
					titleResult: result.children[0].textContent,
					movieResult: result.children[1].textContent,
				});
			} else {
				const movies = data.Search;
				let savedMovie = [];
				movies.forEach((movie, index) => {
					savedMovie.push({
						message: 'Berhasil',
						status: 200,
						order: index,
						movies: {
							movie,
						},
					});
				});

				savedDataInLocalStorage(movieName, savedMovie);

				const moviesFromLocalStorage = JSON.parse(localStorage.getItem('result')).map((data) => data.movies);
				loopMovies(moviesFromLocalStorage);
			}

			eventClickButton(urlApi, key);
		}, 1500);
	}
}

// Loop All Movie
function loopMovies(movies) {
	let templateMovies = '';
	for (let i = 0; i < movies.length; i++) {
		templateMovies += templatePrintMovies(movies[i].movie);
	}
	printMovies(templateMovies);
}

function templatePrintMovies(movie) {
	const { Title, Type, Year, Poster, imdbID } = movie;

	return `
      <div class="card-movie pb-4 w-full shadow-md flex flex-col sm:w-80 bg-white dark:ring-1 dark:bg-slate-800 rounded dark:ring-white/10 dark:shadow-lg" id="${imdbID}">
            <div class="h-72">
              <img src="${Poster}" alt="${Title}" class="h-full w-full object-cover object-top rounded-tl rounded-tr" />
            </div>
            <div class="mt-3 px-3 grow shrink basis-auto ">
              <p class="font-semibold text-gray-700 dark:text-slate-200">${Title}</p>
								<div class="mt-3 flex items-center justify-between gap-x-4">
									<p class="text-sm text-gray-600 capitalize dark:text-slate-50">${Type}</p>
									<p class="w-max rounded bg-gray-700 py-1 px-3 text-sm font-semibold text-white">${Year}</p>
								</div>
							</div>
							<div class="px-3"> 
							<button type="button" class="btn-primary mt-8 w-full text-sm">Detail</button>
						</div>
          </div>
      </div>
			`;
}

function printMovies(movie) {
	result.innerHTML = '';

	const movies = document.createElement('div');

	movies.setAttribute('class', 'flex flex-wrap gap-y-10 gap-x-5');
	movies.innerHTML = movie;

	const textResult = document.createElement('h2');
	textResult.setAttribute('class', 'mb-3 text-xl text-zinc-700 sm:text-2xl dark:text-slate-200');
	textResult.textContent = 'Hasil:';

	result.append(textResult, movies);
}

if (localStorage.result !== undefined && localStorage['search-movie'] !== undefined) {
	const resultLocalStorage = JSON.parse(localStorage.getItem('result'));

	const { status, titleResult, movieResult } = resultLocalStorage;

	if (status === 404 || status === 401) {
		result.innerHTML = `<h2 class="mb-1 text-xl text-zinc-700 sm:text-2xl dark:text-slate-200">${titleResult}</h2>
				<p class="dark:text-slate-300">${movieResult}</p>`;
	} else {
		if (resultLocalStorage[0].status === 200) {
			const movies = resultLocalStorage.map((data) => data.movies);
			loopMovies(movies);
		}
	}
	input.value = localStorage.getItem('search-movie');
}
