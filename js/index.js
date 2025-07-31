let highestZ = 1;
let currentIndex = 0;
let noClickCount = 0;

const paperElements = Array.from(document.querySelectorAll('.paper'));
const bgMusic = document.getElementById('bgMusic');

// Hide all papers except the first (if any)
paperElements.forEach((paper, index) => {
    if (index !== 0) {
        paper.style.display = 'none';
    } else {
        animateParagraphsSequentially(paper);
    }
});

function animateParagraphsSequentially(paper) {
    const paragraphs = paper.querySelectorAll('p');
    let current = 0;

    function showNext() {
        if (current < paragraphs.length) {
            const p = paragraphs[current];
            p.style.display = 'block';
            p.classList.remove('animate-type');
            void p.offsetWidth;
            p.classList.add('animate-type');

            setTimeout(() => {
                current++;
                showNext();
            }, 2000);
        } else {
            const img = paper.querySelector('img');
            if (img) img.style.display = 'block';
        }
    }

    paragraphs.forEach(p => (p.style.display = 'none'));
    const img = paper.querySelector('img');
    if (img) img.style.display = 'none';

    showNext();
}

class Paper {
    constructor(paper, index) {
        this.paper = paper;
        this.index = index;
        this.holdingPaper = false;
        this.hasMoved = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.velX = 0;
        this.velY = 0;
        this.rotation = Math.random() * 30 - 15;
        this.currentPaperX = 0;
        this.currentPaperY = 0;
        this.rotating = false;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('touchmove', (e) => this.handleMove(e.touches[0]));

        this.paper.addEventListener('mousedown', (e) => this.startDrag(e));
        this.paper.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));

        window.addEventListener('mouseup', () => this.endDrag());
        window.addEventListener('touchend', () => this.endDrag());
    }

    handleMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;

        if (this.holdingPaper) {
            this.currentPaperX += this.velX;
            this.currentPaperY += this.velY;
            this.hasMoved = true;

            this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
    }

    startDrag(e) {
        if (this.holdingPaper) return;

        this.holdingPaper = true;
        this.paper.style.zIndex = highestZ++;

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        this.rotating = false;
    }

    endDrag() {
        if (this.holdingPaper && this.hasMoved && this.index === currentIndex) {
            currentIndex++;
            const next = paperElements[currentIndex];
            if (next) {
                next.style.display = 'block';
                animateParagraphsSequentially(next);
            }
        }

        this.holdingPaper = false;
        this.rotating = false;
    }
}

paperElements.forEach((paper, index) => {
    new Paper(paper, index);
});

// View navigation functions
function hideAllViews() {
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
}

function goToSecondView() {
    // Play music on first interaction
    if (bgMusic.paused) {
        bgMusic.play().catch(err => console.warn("Autoplay failed:", err));
    }

    hideAllViews();
    document.getElementById('view-2').classList.remove('hidden');
}

function noThanks() {
    hideAllViews();
    document.getElementById('view-no').classList.remove('hidden');
    noClickCount = 0;
}

function handlePersistentNo(button) {
    noClickCount++;
    if (noClickCount >= 3) {
        button.disabled = true;
        button.innerText = "Okay 😭";
    }
}

function openIt() {
    hideAllViews();
    document.getElementById('view-open').classList.remove('hidden');
}