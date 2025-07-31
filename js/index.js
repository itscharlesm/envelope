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
}

function openIt() {
    hideAllViews();
    document.getElementById('view-open').classList.remove('hidden');
}