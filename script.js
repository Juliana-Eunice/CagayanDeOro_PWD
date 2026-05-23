
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

        if (value === "" || value !== VALID_SAMPLE_CODE) {
            inputElement.classList.add('input-field-error');
            inputElement.placeholder = "Please input a valid code...";
            return false;
        }

        inputElement.classList.remove('input-field-error');
        return true;
    }

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

    if (submitContinue && continueInput) {
        submitContinue.addEventListener('click', () => {
            if (validateField(continueInput)) {
                window.location.href = 'registration.html';
                clearErrors(); 
            }
        });
    }

    if (submitStatus && statusInput) {
        submitStatus.addEventListener('click', () => {
            if (validateField(statusInput)) {
                alert("Valid Code! Redirecting to tracking records lookup panel...");
                clearErrors(); 
            }
        });
    }

    if (continueInput && submitContinue) {
        continueInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitContinue.click();
            }
        });
    }

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
    
    const btnFeedback = document.querySelector('.feedback-btn');
    const modalFeedback = document.getElementById('modal-feedback');
    const submitFeedback = document.getElementById('submit-feedback');
    
    if (btnFeedback && modalFeedback) {
        btnFeedback.addEventListener('click', () => {
            modalFeedback.style.display = 'flex';
        });
    }

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
                nameField.value = "";
                document.getElementById('feedback-contact').value = "";
                commentField.value = "";
                modalFeedback.style.display = 'none';
            }
        });
    }

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

    const backToHomeLink = document.querySelector('.back-link');

    if (backToHomeLink) {
        backToHomeLink.addEventListener('click', (event) => {
            event.preventDefault();
            const referenceCode = "8228DD1D3A";
            const userConfirmed = confirm(
                `Are you sure you want to leave?\n\nYou can continue your application later using your reference code: ${referenceCode}`
            );

            if (userConfirmed) {
                window.location.href = backToHomeLink.getAttribute('href');
            }
        });
    }

    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetNextStep = parseInt(btn.getAttribute('data-next'));
            const currentForm = btn.closest('.form-wizard-panel');
            if (!currentForm) return;

            const inputsInside = currentForm.querySelectorAll('input[required], select[required]');
            let panelIsValid = true;

            inputsInside.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); 
                    panelIsValid = false;
                }
            });

            // --- OUR NEW CHECK FOR STEP 2 START ---
            if (currentForm.getAttribute('id') === 'panel-step-2' && panelIsValid) {
                const checkedBoxes = currentForm.querySelectorAll('input[name="disability_types"]:checked');
                if (checkedBoxes.length === 0) {
                    alert("Error: You must check at least one type of disability category to proceed.");
                    panelIsValid = false;
                }
            }
            // --- OUR NEW CHECK FOR STEP 2 END ---

            if (panelIsValid) {
                updateWizardProgress(targetNextStep);
            }
        });
    });

    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPrevStep = parseInt(btn.getAttribute('data-prev'));
            updateWizardProgress(targetPrevStep);
        });
    });

    const primaryFormAsset = document.getElementById('pwd-application-form');
    if (primaryFormAsset) {
        primaryFormAsset.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Application Form Packed Successfully! Sent to Persons with Disability Affairs Office (PDAO) for data review validation.");
            window.location.href = "index.html";
        });
    }

    // ── FORGOT REFERENCE CODE INTERACTIVE FLOW ──
    const triggerForgotLinks = document.querySelectorAll('.forgot-code-link');
    const modalForgotCode = document.getElementById('modal-forgot-code');
    const forgotStepPhone = document.getElementById('forgot-step-phone');
    const forgotStepSuccess = document.getElementById('forgot-step-success');
    const forgotPhoneInput = document.getElementById('forgot-phone-input');
    const submitForgotPhone = document.getElementById('submit-forgot-phone');

    triggerForgotLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const activeModal = link.closest('.modal');
            const isFromStatus = activeModal && activeModal.id === 'modal-status';
            
            if (activeModal) activeModal.style.display = 'none';
            
            forgotStepPhone.style.display = 'block';
            forgotStepSuccess.style.display = 'none';
            if (forgotPhoneInput) {
                forgotPhoneInput.value = "";
                forgotPhoneInput.classList.remove('input-field-error');
                forgotPhoneInput.placeholder = "e.g. 09XXXXXXXXX";
            }
            
            // Dynamic Color Selection Theme
            if (isFromStatus) {
                forgotStepPhone.className = "modal-content modal-red";
                submitForgotPhone.className = "modal-submit btn-red";
            } else {
                forgotStepPhone.className = "modal-content modal-blue";
                submitForgotPhone.className = "modal-submit btn-blue";
            }
            
            if (modalForgotCode) modalForgotCode.style.display = 'flex';
        });
    });

    if (submitForgotPhone && forgotPhoneInput) {
        submitForgotPhone.addEventListener('click', () => {
            const phoneValue = forgotPhoneInput.value.trim();
            const phoneRegex = /^(09|\+639)\d{9}$/;

            if (!phoneRegex.test(phoneValue)) {
                forgotPhoneInput.classList.add('input-field-error');
                forgotPhoneInput.value = "";
                forgotPhoneInput.placeholder = "Please enter a valid 11-digit phone number...";
                return;
            }

            forgotPhoneInput.classList.remove('input-field-error');
            forgotStepPhone.style.display = 'none';
            forgotStepSuccess.style.display = 'block';
        });

        forgotPhoneInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitForgotPhone.click();
            }
        });
    }

    if (forgotPhoneInput) {
        forgotPhoneInput.addEventListener('input', () => {
            forgotPhoneInput.classList.remove('input-field-error');
        });
    }
});
