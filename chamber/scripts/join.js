// Hamburger Menu

const navbutton = document.querySelector('#menu');
const nav = document.querySelector('#nav-bar');

if (navbutton && nav) {
    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        nav.classList.toggle('show');
    });
}
// header info


// Form Info 

const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}


// Modal Membership Cards 

const openButtons = document.querySelectorAll('.modal-link');
const modals = document.querySelectorAll('.modal');

function openModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    const firstFocusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
        firstFocusable.focus();
    }
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);
        openModal(modal);
    });
});

modals.forEach((modal) => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
    }
});


//Footer Info

const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year");

if (yearSpan) {
    yearSpan.textContent = currentYear;
}

const modified = document.lastModified;
const lastModifiedSpan = document.getElementById("lastModified");

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = modified;
}