// Initialize Reveal.js
Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    transition: 'slide',
    backgroundTransition: 'fade'
}).then(() => {
    // No-op: overlays now handled purely via CSS on .slide-top / .slide-bottom
});

// Play video backgrounds from start on slide enter, freeze on last frame
Reveal.on('slidechanged', event => {
    createSparkles();

    const bg = Reveal.getSlideBackground(event.indexh, event.indexv);
    if (bg) {
        const video = bg.querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    }
});

// Create sparkle animation
function createSparkles() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = '2em';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}
