(() => {
	const revealElements = document.querySelectorAll(
		'.reveal, .reveal-left, .reveal-right, .reveal-scale'
	);

	if (revealElements.length === 0) return;

	const revealAll = () => {
		revealElements.forEach(element => element.classList.add('revealed'));
	};

	if (!('IntersectionObserver' in window)) {
		revealAll();
		return;
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

	revealElements.forEach(element => observer.observe(element));
})();
