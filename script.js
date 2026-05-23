document.addEventListener('DOMContentLoaded', () => {

    const btnContinue = document.getElementById('btn-continue');
    const btnStatus = document.getElementById('btn-status');
    const modalContinue = document.getElementById('modal-continue');
    const modalStatus = document.getElementById('modal-status');
    const closeBtns = document.querySelectorAll('.close-btn');

    if (btnContinue && modalContinue) {
        btnContinue.addEventListener('click', () => modalContinue.style.display = 'flex');
    }
    if (btnStatus && modalStatus) {
        btnStatus.addEventListener('click', () => modalStatus.style.display = 'flex');
    }
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            window.location.href = 'registration.html';
        });
    }

    const submitContinue = document.getElementById('submit-continue');
    const submitStatus = document.getElementById('submit-status');
    const continueInput = document.getElementById('continue-input');
    const statusInput = document.getElementById('status-input');

    const VALID_SAMPLE_CODE = "8228DD1D3A";

    function validateField(inputElement) {
        const value = inputElement.value.trim();

        // Check if field is blank or doesn't match the valid tracking sample format
        if (value === "" || value !== VALID_SAMPLE_CODE) {
            inputElement.classList.add('input-field-error');
            inputElement.placeholder = "Please input a valid code...";
            return false;
        }

        inputElement.classList.remove('input-field-error');
        return true;
    }

    // Remove the error styling layout instantly when the user begins retyping data entries
    [continueInput, statusInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('input-field-error');
            });
        }
    });

    function clearErrors() {
        [continueInput, statusInput].forEach(input => {
            if (input) {
                input.classList.remove('input-field-error');
                input.value = "";
            }
        });
    }

    // Capture submit events
    if (submitContinue && continueInput) {
        submitContinue.addEventListener('click', () => {
            if (validateField(continueInput)) {
                // Successful verification match route link
                window.location.href = 'registration.html';
                
                // Clear out the input state field if they click back later
                clearErrors(); 
            }
        });
    }

    if (submitStatus && statusInput) {
        submitStatus.addEventListener('click', () => {
            if (validateField(statusInput)) {
                alert("Valid Code! Redirecting to tracking records lookup panel...");
                
                // FIXED: Automatically wipes out the valid code and error markers from the view popup modal
                clearErrors(); 
            }
        });
    }

    // Listen for keys pressed while typing in the "Continue Registration" field
    if (continueInput && submitContinue) {
        continueInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Stop the browser from firing generic reload actions
                submitContinue.click(); // Programmatically fire the button's verification logic
            }
        });
    }

    // Listen for keys pressed while typing in the "Registration Status" field
    if (statusInput && submitStatus) {
        statusInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitStatus.click();
            }
        });
    }

    const sidebarAnchors = document.querySelectorAll('.sidebar-anchor');
    const contentBlocks = document.querySelectorAll('.doc-content-block');
    
    let isClickScrolling = false;

    sidebarAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            isClickScrolling = true;

            // Highlight the clicked menu item
            sidebarAnchors.forEach(link => link.classList.remove('active-anchor'));
            this.classList.add('active-anchor');

            setTimeout(() => {
                isClickScrolling = false;
            }, 500);
        });
    });

    window.addEventListener('scroll', () => {
        if (isClickScrolling) return;

        let currentActiveId = "";
        
        contentBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            
            if (rect.top <= 160) {
                currentActiveId = block.getAttribute('id');
            }
        });

        if (currentActiveId) {
            sidebarAnchors.forEach(anchor => {
                if (anchor.getAttribute('href') === `#${currentActiveId}`) {
                    anchor.classList.add('active-anchor');
                } else {
                    anchor.classList.remove('active-anchor');
                }
            });
        }
    });
});