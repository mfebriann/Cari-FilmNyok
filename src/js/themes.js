const themes = document.querySelectorAll('#choose-theme li');
const [light, dark] = themes;

const buttonChooseTheme = document.getElementById('theme');
export default function chooseThemes() {
	buttonChooseTheme.addEventListener('click', function () {
		this.classList.toggle('[&~#choose-theme]:block');
	});

	themes.forEach((theme) => {
		theme.addEventListener('click', function () {
			buttonChooseTheme.classList.remove('[&~#choose-theme]:block');

			themes.forEach((themeNonActive) => {
				themeNonActive.classList.remove('active-theme');
			});
			theme.classList.add('active-theme');
			themeActive(theme, light, dark);
		});
	});
}

function themeActive(theme, light, dark) {
	if (theme === light) {
		localStorage.setItem('theme', 'light');
		document.documentElement.classList.remove('dark');
		light.classList.add('active-theme');
	} else if (theme === dark) {
		localStorage.setItem('theme', 'dark');
	}

	if (localStorage.getItem('theme') === 'dark') {
		document.documentElement.classList.add('dark');
		light.classList.remove('active-theme');
		dark.classList.add('active-theme');
	} else {
		dark.classList.remove('active-theme');
		light.classList.add('active-theme');
		document.documentElement.classList.remove('dark');
	}
}

themeActive(null, light, dark);

export function closeChooseTheme() {
	buttonChooseTheme.classList.remove('[&~#choose-theme]:block');
}
