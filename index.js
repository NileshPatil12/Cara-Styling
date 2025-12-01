// Theme toggle script
(function(){
	function setTheme(theme){
		if(theme === 'dark'){
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
		localStorage.setItem('theme', theme);
		updateToggleIcon();
	}

	function toggleTheme(){
		const isDark = document.body.classList.contains('dark-mode');
		setTheme(isDark ? 'light' : 'dark');
	}

	function updateToggleIcon(){
		const btn = document.getElementById('theme-toggle');
		if(!btn) return;
		const icon = btn.querySelector('i');
		if(document.body.classList.contains('dark-mode')){
			icon.className = 'fa fa-sun-o';
			btn.title = 'Switch to Light Mode';
			btn.setAttribute('aria-pressed', 'true');
		} else {
			icon.className = 'fa fa-moon-o';
			btn.title = 'Switch to Dark Mode';
			btn.setAttribute('aria-pressed', 'false');
		}
	}

	document.addEventListener('DOMContentLoaded', function(){
		// read persisted theme or system preference
		const persisted = localStorage.getItem('theme');
		if(persisted){
			setTheme(persisted);
		} else {
			const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const prefersDark = prefersDarkQuery.matches;
			setTheme(prefersDark ? 'dark' : 'light');
			// If user changes system preference and no persisted preference exists, update theme
			prefersDarkQuery.addEventListener && prefersDarkQuery.addEventListener('change', function(e){
				const persistedLater = localStorage.getItem('theme');
				if(!persistedLater) setTheme(e.matches ? 'dark' : 'light');
			});
		}

		// attach listener
		const toggle = document.getElementById('theme-toggle');
		if(toggle){
			toggle.addEventListener('click', function(){
				toggleTheme();
			});
		}
	});
})();
