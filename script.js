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
    
    // For feedback and suggestions
    const btnFeedback = document.querySelector('.feedback-btn');
    const modalFeedback = document.getElementById('modal-feedback');
    const submitFeedback = document.getElementById('submit-feedback');
    
    // Add these alongside your existing button click handlers:
    if (btnFeedback && modalFeedback) {
        btnFeedback.addEventListener('click', () => {
            modalFeedback.style.display = 'flex';
        });
    }

    // Handles the submission validation check
    if (submitFeedback) {
        submitFeedback.addEventListener('click', () => {
            const nameField = document.getElementById('feedback-name');
            const commentField = document.getElementById('feedback-comments');

            if (commentField.value.trim() === "") {
                commentField.classList.add('input-field-error');
                commentField.placeholder = "Please enter your comments before submitting...";
            } else {
                commentField.classList.remove('input-field-error');
                alert("Thank you! Your feedback has been sent to Cheryl and the CSWDD team.");
                
                // Clear and close modal safely
                nameField.value = "";
                document.getElementById('feedback-contact').value = "";
                commentField.value = "";
                modalFeedback.style.display = 'none';
            }
        });
    }

    // for registration process
    const wizardPanels = document.querySelectorAll('.form-wizard-panel');
    const stepIndicators = document.querySelectorAll('.step-tracker .step');
    const progressCircle = document.getElementById('wizard-progress-circle');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');

    function updateWizardProgress(targetStepNum) {
        wizardPanels.forEach(panel => panel.classList.remove('panel-active'));
        const activePanel = document.getElementById(`panel-step-${targetStepNum}`);
        if (activePanel) activePanel.classList.add('panel-active');

        stepIndicators.forEach(indicator => {
            const indStep = parseInt(indicator.getAttribute('data-step'));
            if (indStep === targetStepNum) {
                indicator.classList.add('step-active');
                indicator.style.opacity = "1";
            } else {
                indicator.classList.remove('step-active');
                indicator.style.opacity = "0.5";
            }
        });

        const percentValue = targetStepNum * 25;
        if (progressCircle) {
            progressCircle.textContent = `${percentValue}%`;
            
            progressCircle.style.background = `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(var(--card-green) ${percentValue}%, #EAECEF 0)`;
        }

        for (let i = 1; i <= 4; i++) {
            const sidebarItem = document.getElementById(`sidebar-step-${i}`);
            if (sidebarItem) {
                if (i === targetStepNum) {
                    sidebarItem.classList.add('active-p');
                } else {
                    sidebarItem.classList.remove('active-p');
                }
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Are you sure you want to go home?
    const backToHomeLink = document.querySelector('.back-link');

    if (backToHomeLink) {
        backToHomeLink.addEventListener('click', (event) => {
            // Stop the browser from immediately jumping to index.html
            event.preventDefault();

            // Display a native confirmation prompt with your sample reference code
            const referenceCode = "8228DD1D3A";
            const userConfirmed = confirm(
                `Are you sure you want to leave?\n\nYou can continue your application later using your reference code: ${referenceCode}`
            );

            // If the user clicks "OK", proceed back to the homepage
            if (userConfirmed) {
                window.location.href = backToHomeLink.getAttribute('href');
            }
            // If they click "Cancel", the code does nothing and they stay exactly where they are on the form
        });
    }

    // Attach click listener arrays onto forwarding action controls
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetNextStep = parseInt(btn.getAttribute('data-next'));
            
            // Check HTML5 verification parameters prior to permitting advancement jumps
            const currentForm = btn.closest('.form-wizard-panel');
            const inputsInside = currentForm.querySelectorAll('input[required], select[required]');
            let panelIsValid = true;

            inputsInside.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); // Highlight system validation tooltips
                    panelIsValid = false;
                }
            });

            if (panelIsValid) {
                updateWizardProgress(targetNextStep);
            }
        });
    });

    // Attach click listener arrays onto retreating previous buttons controls
    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPrevStep = parseInt(btn.getAttribute('data-prev'));
            updateWizardProgress(targetPrevStep);
        });
    });

    // Catch final comprehensive form packaging transmission events execution triggers
    const primaryFormAsset = document.getElementById('pwd-application-form');
    if (primaryFormAsset) {
        primaryFormAsset.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard blank page reload loops
            alert("Application Form Packed Successfully! Sent to Persons with Disability Affairs Office (PDAO) for data review validation.");
            window.location.href = "index.html";
        });
    }
});