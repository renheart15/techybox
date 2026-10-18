(() => {
	const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
	const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

	if (!isSmallScreen && !isMobileDevice) return;

	const routes = {
		'/': '/mobile/index.html',
		'/index': '/mobile/index.html',
		'/index.html': '/mobile/index.html',
		'/products': '/mobile/products.html',
		'/products.html': '/mobile/products.html',
		'/services': '/mobile/services.html',
		'/services.html': '/mobile/services.html',
		'/about': '/mobile/about.html',
		'/about.html': '/mobile/about.html',
		'/contact': '/mobile/contact.html',
		'/contact.html': '/mobile/contact.html',
		'/checkout': '/mobile/checkout.html',
		'/checkout.html': '/mobile/checkout.html',
		'/cart': '/mobile/checkout.html',
		'/cart.html': '/mobile/checkout.html',
	};

	const path = window.location.pathname.replace(/\/$/, '') || '/';
	const mobilePath = routes[path];

	if (mobilePath) {
		window.location.replace(mobilePath + window.location.search + window.location.hash);
	}
})();
