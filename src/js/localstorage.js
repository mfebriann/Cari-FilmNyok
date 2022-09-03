import chooseThemes from './themes';

// Local Storage
export default function savedDataInLocalStorage(input, result) {
	if (typeof Storage !== undefined) {
		localStorage.setItem('search-movie', input);
		localStorage.setItem('result', JSON.stringify(result));
	}
}

if (typeof Storage !== undefined) {
	if (localStorage.theme === undefined) {
		localStorage.setItem('theme', 'light');
	}

	if (localStorage.getItem('theme') === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	chooseThemes();
}
