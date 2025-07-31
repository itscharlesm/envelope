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
    noClickCount = 0; // Reset counter if user re-enters view-no
}

function openIt() {
    hideAllViews();
    document.getElementById('view-open').classList.remove('hidden');
}

function handlePersistentNo(button) {
    const view = document.getElementById('view-no');
    const img = view.querySelector('img');
    const message = view.querySelector('.message');

    noClickCount++;

    if (noClickCount === 1) {
        // First "No" click behavior
        img.src = "css/images/stitch_cry_2.jpg";
        message.textContent = "sure najuuud? :<<<";
    }

    // Move the button randomly inside the card
    const cardWidth = view.clientWidth - button.offsetWidth;
    const cardHeight = view.clientHeight - button.offsetHeight;

    const randomLeft = Math.floor(Math.random() * cardWidth);
    const randomTop = Math.floor(Math.random() * cardHeight);

    button.style.position = "absolute";
    button.style.left = `${randomLeft}px`;
    button.style.top = `${randomTop}px`;
}