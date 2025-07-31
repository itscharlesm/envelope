let noClickCount = 0;

function hideAllViews() {
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
}

function goToSecondView() {
    hideAllViews();
    document.getElementById('view-2').classList.remove('hidden');
}

function noThanks() {
    hideAllViews();
    document.getElementById('view-no').classList.remove('hidden');
    noClickCount = 0; // Reset counter
}

function openIt() {
    hideAllViews();
    document.getElementById('view-open').classList.remove('hidden');

    // Play background music
    const music = document.getElementById('bgMusic');
    music.play().catch(error => console.error("Playback failed:", error));

    // Add floating hearts outside the card
    const container = document.querySelector('.floating-hearts-container');
    container.innerHTML = ''; // Clear old hearts

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        const size = Math.random() * 10 + 15; // size between 15px and 25px
        heart.style.width = heart.style.height = `${size}px`;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

function handlePersistentNo(button) {
    const view = document.getElementById('view-no');
    const img = view.querySelector('img');
    const message = view.querySelector('.message');

    noClickCount++;

    if (noClickCount === 1) {
        img.src = "css/images/stitch_cry_2.jpg";
        message.textContent = "sure najuuud? :<<<";
        img.style.border = "3px solid pink";
        img.style.borderRadius = "10px";
    }

    // Move button randomly
    const cardWidth = view.clientWidth - button.offsetWidth;
    const cardHeight = view.clientHeight - button.offsetHeight;

    const randomLeft = Math.floor(Math.random() * cardWidth);
    const randomTop = Math.floor(Math.random() * cardHeight);

    button.style.position = "absolute";
    button.style.left = `${randomLeft}px`;
    button.style.top = `${randomTop}px`;
}