let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');

function updateSlider() {
	const newTransformValue = `translateX(-${currentIndex * 33.333}%)`; // Menggeser 3 gambar sekaligus
	document.querySelector('.slider').style.transform = newTransformValue;

	// Update active dot
	dots.forEach((dot) => dot.classList.remove('active'));
	dots[currentIndex].classList.add('active');
}

// Set up the dot navigation
dots.forEach((dot) => {
	dot.addEventListener('click', (e) => {
		currentIndex = parseInt(e.target.dataset.index);
		updateSlider();
	});
});

// Initialize slider
updateSlider();
