document.addEventListener('DOMContentLoaded', () => {
    // Select the cards
    const btnContinue = document.getElementById('btn-continue');
    const btnStatus = document.getElementById('btn-status');

    // Select the modals
    const modalContinue = document.getElementById('modal-continue');
    const modalStatus = document.getElementById('modal-status');

    // Select close buttons
    const closeBtns = document.querySelectorAll('.close-btn');

    // Open Modals
    btnContinue.addEventListener('click', () => {
        modalContinue.style.display = 'flex';
    });

    btnStatus.addEventListener('click', () => {
        modalStatus.style.display = 'flex';
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Close when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});