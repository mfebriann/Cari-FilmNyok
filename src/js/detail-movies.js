import closePopupDetail from './close-popup-detail-movie';

export default function eventClickButton(urlMovie, key) {
	const buttonsCardMovie = document.querySelectorAll('.card-movie button');
	for (let i = 0; i < buttonsCardMovie.length; i++) {
		buttonsCardMovie[i].addEventListener('click', function () {
			const imdbID = buttonsCardMovie[i].parentElement.parentElement.getAttribute('id');

			buttonsCardMovie[
				i
			].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="animate-spin mx-auto"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" fill="rgba(255,255,255,1)"/></svg>`;

			setTimeout(() => {
				getURLMovie(urlMovie, key, imdbID);
				buttonsCardMovie[i].innerHTML = 'Detail';
			}, 2000);
		});
	}
}

function getURLMovie(urlApi, key, imdbID) {
	const url = `${urlApi}?apikey=${key}&i=${imdbID}`;
	fetchIdMovie(url);
}

async function fetchIdMovie(url) {
	const fetchData = await fetch(url);
	const data = await fetchData.json();

	if (data.Response === 'False') {
		alert('Detail film sedang bermasalah, silahkan coba nanti lagi.');
		return;
	} else {
		printUIPopupDetailMovie(data);
	}
}

const popupDetailMovie = document.getElementById('popup-detail-movie');
const body = document.body;

function printUIPopupDetailMovie(data) {
	const { Poster, Title, Director, Genre, Plot, Actors, Awards, Released, imdbRating } = data;

	body.classList.add('overflow-hidden');

	popupDetailMovie.classList.replace('opacity-0', 'opacity-100');
	popupDetailMovie.classList.replace('scale-0', 'scale-100');

	popupDetailMovie.innerHTML = `<div class="relative h-full w-full overflow-auto bg-white sm:h-[90%] sm:w-[496px]">
					<img src="${Poster}" alt="${Title}" class="w-full" />

					<div class="py-4 px-3">
						<p class="mb-3 text-xl font-semibold text-gray-700">Detail Film:</p>
						<div class="flex flex-col gap-y-3">
							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Nama Film:</p>
								<p class="font-medium text-gray-800">${Title}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Direktor:</p>
								<p class="font-medium text-gray-800">${Director}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Genre:</p>
								<p class="font-medium text-gray-800">${Genre}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Alur:</p>
								<p class="font-medium text-gray-800">${Plot}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Aktor:</p>
								<p class="font-medium text-gray-800">${Actors}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Penghargaan:</p>
								<p class="font-medium text-gray-800">${Awards}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Rilis:</p>
								<p class="font-medium text-gray-800">${Released}</p>
							</div>

							<div class="grid gap-y-1 border-b border-dashed border-black/50 pb-3 sm:grid-cols-[1fr,2fr]">
								<p class="w-max text-gray-700">Rating imdb:</p>
								<p class="font-medium text-gray-800">${imdbRating}</p>
							</div>

							<button type="button" class="mx-auto mt-8 flex cursor-pointer items-center justify-center rounded bg-red-600 px-5 py-2 text-sm font-medium uppercase text-white hover:bg-red-500" id="btn-close-popup">Tutup</button>
						</div>
					</div>
				</div>`;

	closePopupDetail();
}

export { popupDetailMovie, body };
