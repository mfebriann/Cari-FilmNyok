import { popupDetailMovie, body } from './detail-movies';

export function funcClosePopup() {
	body.classList.remove('overflow-hidden');
	popupDetailMovie.classList.replace('opacity-100', 'opacity-0');
	popupDetailMovie.classList.replace('scale-100', 'scale-0');
}

export default function closePopupDetail() {
	const btnClosePopup = document.getElementById('btn-close-popup');
	btnClosePopup.addEventListener('click', funcClosePopup);

	popupDetailMovie.addEventListener('click', function ({ target }) {
		if (target.id === 'popup-detail-movie') funcClosePopup();
	});
}
