import './tailwind/tailwind.css';
import getMovies from './js/search-movies';
import eventClickButton from './js/detail-movies';
import events from './js/event';

const urlSearchMovie = 'http://www.omdbapi.com/';
const key = 'a61d4b10';

const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
	e.preventDefault();

	// Fetch data
	getMovies(urlSearchMovie, key);
});

eventClickButton(urlSearchMovie, key);

events();
