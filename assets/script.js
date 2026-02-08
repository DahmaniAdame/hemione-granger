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

// Reset vertical stacks to first sub-slide when navigating away horizontally
let previousH = 0;
let resetting = false;
Reveal.on('slidechanged', event => {
    if (resetting) return;

    createSparkles();

    // Detect horizontal movement
    const movedHorizontally = event.indexh !== previousH;

    // If we moved horizontally, reset the previous stack to its first sub-slide
    if (movedHorizontally && event.previousSlide) {
        resetting = true;
        Reveal.slide(previousH, 0);
        Reveal.slide(event.indexh, event.indexv);
        resetting = false;
    }
    previousH = event.indexh;

    // Play video from start only on horizontal navigation, not vertical
    // Delay ensures reveal.js internal state has settled after the reset
    if (movedHorizontally) {
        const h = event.indexh;
        const v = event.indexv;
        setTimeout(() => {
            const bg = Reveal.getSlideBackground(h, v);
            if (bg) {
                const video = bg.querySelector('video');
                if (video) {
                    video.currentTime = 0;
                    video.play();
                }
            }
        }, 100);
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
