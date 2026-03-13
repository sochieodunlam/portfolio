// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Randomize ASCII animation delays slightly for organic feel
document.querySelectorAll('.ascii-element').forEach(el => {
    const baseDelay = parseFloat(el.style.animationDelay) || 0;
    const jitter = (Math.random() - 0.5) * 2;
    el.style.animationDelay = (baseDelay + jitter) + 's';
});

