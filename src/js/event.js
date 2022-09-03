import * as Themes from './themes';
import * as ClosePopupDetail from './close-popup-detail-movie';
import * as SearchMovies from './search-movies';

export default function events() {
	window.addEventListener('keyup', function (e) {
		e.preventDefault();

		if (e.key === 'Escape') {
			Themes.closeChooseTheme();
			ClosePopupDetail.funcClosePopup();
		}

		if (e.ctrlKey && e.key === '/') {
			SearchMovies.input.focus();
		}
	});
}
