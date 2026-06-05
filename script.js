document.addEventListener('DOMContentLoaded', () => {

    /* ── Hamburger menu toggle ── */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

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
            const targetModal = e.target.closest('.modal');
            if (targetModal) targetModal.style.display = 'none';
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    /* ==========================================================================
       ── AUTOMATIC BIRTHDATE CALENDAR MAXIMUM CEILING CONSTRAINT ──
       ========================================================================== */
    const birthDateInput = document.getElementById('birth-date');
    if (birthDateInput) {
        // Sets the date picker constraint to today's exact date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        birthDateInput.setAttribute('max', today);
    }

    /* ==========================================================================
       ── NEW REGISTRATION ENTRY ROUTER ──
       ========================================================================== */
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            localStorage.removeItem('isDraftSaved');
            localStorage.removeItem('isApplicationSubmitted'); 
            localStorage.removeItem('activeStepNum');
            localStorage.removeItem('pwdFormDraftData');
            window.location.href = 'registration.html';
        });
    }

    const submitContinue = document.getElementById('submit-continue');
    const submitStatus = document.getElementById('submit-status');
    const continueInput = document.getElementById('continue-input');
    const statusInput = document.getElementById('status-input');

    const VALID_SAMPLE_CODE = "8228DD1D3A";
    
    // --- APP STATE PERSISTENT STORAGE TRACKING MANAGEMENT ---
    let isDraftSaved = localStorage.getItem('isDraftSaved') === 'true';
    let isApplicationSubmitted = localStorage.getItem('isApplicationSubmitted') === 'true';

    function validateField(inputElement) {
        if (!inputElement) return false;
        const value = inputElement.value.trim().toUpperCase(); 
        
        const isContinueField = inputElement.id === 'continue-input';
        const isStatusField = inputElement.id === 'status-input';

        const modalExitConfirm = document.getElementById('modal-exit-confirm');
        const exitModalText = document.getElementById('exit-modal-text');
        const btnConfirmExit = document.getElementById('btn-confirm-exit');
        const btnCancelExit = document.getElementById('btn-cancel-exit');

        if (value === "" || value !== VALID_SAMPLE_CODE) {
            inputElement.value = "";
            inputElement.classList.add('input-field-error');
            inputElement.placeholder = "Please input a valid code...";
            return false;
        }

        if (isContinueField && !isDraftSaved) {
            inputElement.value = "";
            inputElement.classList.add('input-field-error');
            inputElement.placeholder = "No active draft found!";
            
            if (modalExitConfirm && exitModalText && btnConfirmExit && btnCancelExit) {
                modalExitConfirm.querySelector('.modal-header h3').textContent = "No Draft Found";
                exitModalText.innerHTML = `<strong>No active draft found for this reference code.</strong><br><br>Please click 'Start New Registration' to begin a completely fresh application profile.`;
                btnConfirmExit.style.display = "none";
                btnCancelExit.textContent = "Close";
                btnCancelExit.className = "modal-submit btn-red";
                modalExitConfirm.style.display = 'flex';
            }
            return false;
        }

        if (isStatusField && !isApplicationSubmitted) {
            inputElement.value = "";
            inputElement.classList.add('input-field-error');
            inputElement.placeholder = "Invalid code or application not submitted yet!";
            
            if (modalExitConfirm && exitModalText && btnConfirmExit && btnCancelExit) {
                modalExitConfirm.querySelector('.modal-header h3').textContent = "Application Not Found";
                exitModalText.innerHTML = `<strong>Your application is not submitted yet.</strong><br><br>If you have a saved draft, click 'Continue Existing Application' to complete and click the final submit button inside the wizard dashboard panel first.`;
                btnConfirmExit.style.display = "none";
                btnCancelExit.textContent = "Close";
                btnCancelExit.className = "modal-submit btn-red";
                modalExitConfirm.style.display = 'flex';
            }
            return false;
        }

        inputElement.classList.remove('input-field-error');
        return true;
    }

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
                window.location.href = `registration.html?step=1`;
                clearErrors(); 
            }
        });
    }

    const modalStatusSuccess = document.getElementById('modal-status-success');
    const btnStatusProceed = document.getElementById('btn-status-proceed');
    const closeStatusSuccessModal = document.getElementById('close-status-success-modal');

    if (submitStatus && statusInput) {
        submitStatus.addEventListener('click', () => {
            if (validateField(statusInput)) {
                const modalStatusCard = document.getElementById('modal-status');
                if (modalStatusCard) modalStatusCard.style.display = 'none';
                if (modalStatusSuccess) modalStatusSuccess.style.display = 'flex';
            }
        });
    }

    if (btnStatusProceed) {
        btnStatusProceed.addEventListener('click', () => {
            if (modalStatusSuccess) modalStatusSuccess.style.display = 'none';
            clearErrors();
        });
    }

    if (closeStatusSuccessModal) {
        closeStatusSuccessModal.addEventListener('click', () => {
            if (modalStatusSuccess) modalStatusSuccess.style.display = 'none';
            clearErrors();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalStatusSuccess) {
            modalStatusSuccess.style.display = 'none';
            clearErrors();
        }
    });

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
            setTimeout(() => { isClickScrolling = false; }, 500);
        });
    });

    window.addEventListener('scroll', () => {
        if (isClickScrolling || contentBlocks.length === 0) return;

        let currentActiveId = "";
        const isMobileSize = window.innerWidth <= 960;
        const detectionThreshold = isMobileSize ? 280 : 160; 

        contentBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            if (rect.top <= detectionThreshold) {
                currentActiveId = block.getAttribute('id');
            }
        });
        
        if (window.scrollY < 50) {
            currentActiveId = contentBlocks[0].getAttribute('id');
        }

        if (currentActiveId) {
            sidebarAnchors.forEach(anchor => {
                if (anchor.getAttribute('href') === `#${currentActiveId}`) {
                    anchor.classList.add('active-anchor');
                    if (isMobileSize) {
                        anchor.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
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
                if (nameField) nameField.value = "";
                const contactField = document.getElementById('feedback-contact');
                if (contactField) contactField.value = "";
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
        localStorage.setItem('activeStepNum', targetStepNum);

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

    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');
    if (stepParam) {
        const targetStep = parseInt(stepParam);
        if (targetStep >= 1 && targetStep <= 4) {
            updateWizardProgress(targetStep);
        }
    }

    const backToHomeLink = document.querySelector('.back-link');
    const modalExitConfirm = document.getElementById('modal-exit-confirm');
    const exitModalText = document.getElementById('exit-modal-text');
    const btnConfirmExit = document.getElementById('btn-confirm-exit');
    const btnCancelExit = document.getElementById('btn-cancel-exit');
    const closeExitModal = document.getElementById('close-exit-modal');

    if (backToHomeLink && modalExitConfirm && exitModalText) {
        backToHomeLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            modalExitConfirm.querySelector('.modal-header h3').textContent = "Leave Page?";
            btnConfirmExit.style.display = "block"; 
            btnCancelExit.textContent = "Stay Here";
            btnCancelExit.className = "modal-submit btn-green"; 
            
            if (!isDraftSaved) {
                exitModalText.innerHTML = `<strong>Warning: Your progress has not been saved yet!</strong><br><br>Are you sure you want to leave? Click 'Save Draft' near the progress tracker if you want to keep your information saved.`;
            } else {
                exitModalText.innerHTML = `<strong>Your draft is saved!</strong><br><br>You can finish your application whenever you return using your Reference Code: <strong>8228DD1D3A</strong>.<br><br>Go back to the homepage?`;
            }
            modalExitConfirm.style.display = 'flex';
        });
    }

    if (btnConfirmExit && backToHomeLink) {
        btnConfirmExit.addEventListener('click', () => {
            modalExitConfirm.style.display = 'none';
            window.location.href = backToHomeLink.getAttribute('href');
        });
    }

    [btnCancelExit, closeExitModal].forEach(closeBtn => {
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modalExitConfirm.style.display = 'none';
            });
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalExitConfirm) {
            modalExitConfirm.style.display = 'none';
        }
    });

    /* ==========================================================================
       ── WIZARD PANEL NAVIGATION VALIDATION CONTROLLER ──
       ========================================================================== */
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

            // STEP 1 CONSTRAINT: Validate birthdate logic constraints
            if (currentForm.getAttribute('id') === 'panel-step-1' && panelIsValid) {
                const bdayField = document.getElementById('birth-date');
                if (bdayField && bdayField.value) {
                    const selectedDate = new Date(bdayField.value);
                    const todayDate = new Date();
                    
                    // Strip hours from date values for accurate day comparisons
                    todayDate.setHours(0,0,0,0);
                    selectedDate.setHours(0,0,0,0);

                    if (selectedDate > todayDate) {
                        alert("Invalid Date: Your birthdate cannot be a date in the future.");
                        bdayField.classList.add('input-field-error');
                        panelIsValid = false;
                    } else {
                        bdayField.classList.remove('input-field-error');
                    }
                }
            }

            // STEP 2 CONSTRAINT: Checkbox entry logic verification
            if (currentForm.getAttribute('id') === 'panel-step-2' && panelIsValid) {
                const checkedBoxes = currentForm.querySelectorAll('input[name="disability_types"]:checked');
                if (checkedBoxes.length === 0) {
                    alert("Error: You must check at least one type of disability category to proceed.");
                    panelIsValid = false;
                }
            }

            // STEP 4 CONSTRAINT: File attachments presence tracking checks
            if (currentForm.getAttribute('id') === 'panel-step-4' && panelIsValid) {
                const photoInput = document.getElementById('file-id-pic');
                const medInput = document.getElementById('file-med-cert');
                const residencyInput = document.getElementById('file-brgy-cert');

                if ((photoInput && photoInput.files.length === 0) || 
                    (medInput && medInput.files.length === 0) || 
                    (residencyInput && residencyInput.files.length === 0)) {
                    
                    alert("Missing Document Files: For your data protection, browser security requires you to re-attach your image/document files each time you resume a draft application session. Please re-select your files before proceeding.");
                    panelIsValid = false;
                }
            }

            if (panelIsValid) {
                updateWizardProgress(targetNextStep);
            }
        });
    });

    const primaryFormAsset = document.getElementById('pwd-application-form');
    if (primaryFormAsset) {
        primaryFormAsset.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const photoInput = document.getElementById('file-id-pic');
            const medInput = document.getElementById('file-med-cert');
            const residencyInput = document.getElementById('file-brgy-cert');

            if ((photoInput && photoInput.files.length === 0) || 
                (medInput && medInput.files.length === 0) || 
                (residencyInput && residencyInput.files.length === 0)) {
                alert("Missing Document Files: Please fill all required document slots before proceeding.");
                return;
            }

            alert("Application Form Packed Successfully! Sent to Persons with Disability Affairs Office (PDAO) for data review validation.");
            localStorage.setItem('isApplicationSubmitted', 'true'); 
            localStorage.removeItem('pwdFormDraftData');             
            localStorage.removeItem('isDraftSaved');                 
            localStorage.removeItem('activeStepNum');
            window.location.href = "index.html";
        });
    }

    const triggerForgotLinks = document.querySelectorAll('.forgot-code-link');
    const modalForgotCode = document.getElementById('modal-forgot-code');
    const forgotStepPhone = document.getElementById('forgot-step-phone');
    const forgotStepSuccess = document.getElementById('forgot-step-success');
    const forgotPhoneInput = document.getElementById('forgot-phone-input');
    const submitForgotPhone = document.getElementById('submit-forgot-phone');

    if (triggerForgotLinks.length > 0) {
        triggerForgotLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const activeModal = link.closest('.modal');
                const isFromStatus = activeModal && activeModal.id === 'modal-status';
                if (activeModal) activeModal.style.display = 'none';
                
                if (forgotStepPhone) forgotStepPhone.style.display = 'block';
                if (forgotStepSuccess) forgotStepSuccess.style.display = 'none';
                if (forgotPhoneInput) {
                    forgotPhoneInput.value = "";
                    forgotPhoneInput.classList.remove('input-field-error');
                    forgotPhoneInput.placeholder = "e.g. 09XXXXXXXXX";
                }
                
                if (isFromStatus && forgotStepPhone && submitForgotPhone) {
                    forgotStepPhone.className = "modal-content modal-red";
                    submitForgotPhone.className = "modal-submit btn-red";
                } else if (forgotStepPhone && submitForgotPhone) {
                    forgotStepPhone.className = "modal-content modal-blue";
                    submitForgotPhone.className = "modal-submit btn-blue";
                }
                if (modalForgotCode) modalForgotCode.style.display = 'flex';
            });
        });
    }

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

            if (forgotPhoneInput) forgotPhoneInput.classList.remove('input-field-error');
            if (forgotStepPhone) forgotStepPhone.style.display = 'none';
            if (forgotStepSuccess) forgotStepSuccess.style.display = 'block';
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

    const btnSaveDraft = document.getElementById('btn-save-draft');
    const modalSaveDraft = document.getElementById('modal-save-draft');
    const draftStepPhone = document.getElementById('draft-step-phone');
    const draftStepSuccess = document.getElementById('draft-step-success');
    const draftPhoneInput = document.getElementById('draft-phone-input');
    const submitDraftPhone = document.getElementById('submit-draft-phone');
    const closeDraftModal = document.getElementById('close-draft-modal');
    const closeDraftSuccessModal = document.getElementById('close-draft-success-modal');

    /* ==========================================================================
       ── SAVE DRAFT MODAL CONTROLS (LOGIC LOOP FIX) ──
       ========================================================================== */
    if (btnSaveDraft && modalSaveDraft) {
        btnSaveDraft.onclick = () => {
            const liveDraftCheck = localStorage.getItem('isDraftSaved') === 'true';

            if (!liveDraftCheck) {
                if (draftStepPhone) draftStepPhone.style.display = 'block';
                if (draftStepSuccess) draftStepSuccess.style.display = 'none';
                if (draftPhoneInput) {
                    draftPhoneInput.value = "";
                    draftPhoneInput.classList.remove('input-field-error');
                    draftPhoneInput.placeholder = "e.g. 09XXXXXXXXX";
                }
                modalSaveDraft.style.display = 'flex';
            } else {
                if (draftStepPhone) draftStepPhone.style.display = 'none';
                if (draftStepSuccess) draftStepSuccess.style.display = 'block';
                modalSaveDraft.style.display = 'flex';
            }
        };
    }

    if (submitDraftPhone && draftPhoneInput) {
        submitDraftPhone.addEventListener('click', () => {
            const phoneValue = draftPhoneInput.value.trim();
            const phoneRegex = /^09\d{9}$/;

            if (!phoneRegex.test(phoneValue)) {
                draftPhoneInput.classList.add('input-field-error');
                draftPhoneInput.value = "";
                draftPhoneInput.placeholder = "Please enter a valid phone number...";
                return;
            }

            isDraftSaved = true;
            localStorage.setItem('isDraftSaved', 'true');
            if (draftStepPhone) draftStepPhone.style.display = 'none';
            if (draftStepSuccess) draftStepSuccess.style.display = 'block';
        });

        draftPhoneInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitDraftPhone.click();
            }
        });
    }

    if (draftPhoneInput) {
        draftPhoneInput.addEventListener('input', () => {
            draftPhoneInput.classList.remove('input-field-error');
        });
    }

    [closeDraftModal, closeDraftSuccessModal].forEach(closeBtn => {
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modalSaveDraft) modalSaveDraft.style.display = 'none';
            });
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalSaveDraft) {
            modalSaveDraft.style.display = 'none';
        }
    });

    const mainForm = document.getElementById('pwd-application-form');
    if (mainForm) {
        const urlParamsCheck = new URLSearchParams(window.location.search);
        const comingFromContinueRoute = urlParamsCheck.has('step');

        if (comingFromContinueRoute) {
            const savedData = JSON.parse(localStorage.getItem('pwdFormDraftData')) || {};
            Object.keys(savedData).forEach(fieldId => {
                const inputField = document.getElementById(fieldId);
                if (inputField) {
                    if (inputField.type === 'checkbox') {
                        inputField.checked = savedData[fieldId];
                    } else if (inputField.type === 'radio') {
                        const radioOption = mainForm.querySelector(`input[name="${inputField.name}"][value="${savedData[fieldId]}"]`);
                        if (radioOption) radioOption.checked = true;
                    } else {
                        inputField.value = savedData[fieldId];
                    }
                }
            });
        } else {
            if (!urlParamsCheck.has('step')) {
                localStorage.removeItem('pwdFormDraftData');
                localStorage.removeItem('isDraftSaved');
                localStorage.removeItem('activeStepNum');
            }
        }

        mainForm.addEventListener('input', (e) => {
            const target = e.target;
            if (!target.id && !target.name) return;

            let currentDraft = JSON.parse(localStorage.getItem('pwdFormDraftData')) || {};
            if (target.type === 'checkbox') {
                currentDraft[target.id || target.name] = target.checked;
            } else if (target.type === 'radio') {
                currentDraft[target.name] = target.value;
            } else {
                currentDraft[target.id] = target.value;
            }
            localStorage.setItem('pwdFormDraftData', JSON.stringify(currentDraft));
        });
    }

    const fabToggle = document.getElementById('fab-toggle');
    const fabClose = document.getElementById('fab-close');
    const fabCard = document.getElementById('fab-target-card');

    if (fabToggle && fabCard) {
        fabToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            fabCard.classList.toggle('is-open');
        });
    }
    if (fabClose && fabCard) {
        fabClose.addEventListener('click', () => {
            fabCard.classList.remove('is-open');
        });
    }
    document.addEventListener('click', (e) => {
        if (fabCard && fabToggle && !fabCard.contains(e.target) && !fabToggle.contains(e.target)) {
            fabCard.classList.remove('is-open');
        }
    });

    /* ==========================================================================
       ── ENHANCED FILE ATTACHMENT VALIDATION ENGINE WITH REMOVE HANDLERS ──
       ========================================================================== */
    const uploadRules = {
        'file-id-pic': { maxSize: 2 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'], previewId: 'preview-id-pic', rowId: 'row-id-pic' },
        'file-med-cert': { maxSize: 5 * 1024 * 1024, allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'], previewId: 'preview-med-cert', rowId: 'row-med-cert' },
        'file-brgy-cert': { maxSize: 5 * 1024 * 1024, allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'], previewId: 'preview-brgy-cert', rowId: 'row-brgy-cert' },
        'file-id-back': { maxSize: 5 * 1024 * 1024, allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'], previewId: 'preview-id-back', rowId: 'row-brgy-cert' }
    };

    Object.keys(uploadRules).forEach(inputId => {
        const fileInput = document.getElementById(inputId);
        if (!fileInput) return;

        fileInput.addEventListener('change', function() {
            const rule = uploadRules[inputId];
            const previewEl = document.getElementById(rule.previewId);
            const rowEl = document.getElementById(rule.rowId);
            
            if (this.files.length === 0) {
                if (previewEl) previewEl.textContent = "No file chosen";
                if (inputId !== 'file-id-back' && rowEl) rowEl.classList.remove('file-row-success');
                return;
            }

            const file = this.files[0];
            
            if (file.size > rule.maxSize) {
                const maxMb = rule.maxSize / (1024 * 1024);
                alert(`Error: "${file.name}" exceeds the maximum limit size of ${maxMb}MB.`);
                this.value = ""; 
                if (previewEl) previewEl.textContent = "No file chosen";
                if (inputId !== 'file-id-back' && rowEl) rowEl.classList.remove('file-row-success');
                return;
            }

            if (!rule.allowedTypes.includes(file.type) && file.type !== "") {
                alert(`Error: Invalid file format type. Please upload approved documents only.`);
                this.value = ""; 
                if (previewEl) previewEl.textContent = "No file chosen";
                if (inputId !== 'file-id-back' && rowEl) rowEl.classList.remove('file-row-success');
                return;
            }

            if (previewEl) {
                previewEl.textContent = file.name;
                previewEl.style.color = "var(--card-green)";
            }
            if (rowEl && inputId !== 'file-id-back') {
                rowEl.classList.add('file-row-success');
            }
        });
    });

    const fileSlots = [
        { input: 'file-id-pic', preview: 'preview-id-pic', clear: 'clear-id-pic', row: 'row-id-pic' },
        { input: 'file-med-cert', preview: 'preview-med-cert', clear: 'clear-med-cert', row: 'row-med-cert' },
        { input: 'file-brgy-cert', preview: 'preview-brgy-cert', clear: 'clear-brgy-cert', row: 'row-brgy-cert' },
        { input: 'file-id-back', preview: 'preview-id-back', clear: 'clear-id-back', row: 'row-brgy-cert' }
    ];

    fileSlots.forEach(slot => {
        const inputEl = document.getElementById(slot.input);
        const clearBtn = document.getElementById(slot.clear);
        const previewEl = document.getElementById(slot.preview);
        const rowEl = document.getElementById(slot.row);

        if (inputEl && clearBtn) {
            // Restore clear button visibility on resume load frames
            if (inputEl.files && inputEl.files.length > 0) clearBtn.style.display = 'inline-block';

            inputEl.addEventListener('change', () => {
                if (inputEl.files.length > 0) clearBtn.style.display = 'inline-block';
            });

            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                inputEl.value = ""; 
                if (previewEl) {
                    previewEl.textContent = "No file chosen";
                    previewEl.style.color = "";
                }
                clearBtn.style.display = 'none';

                if (slot.input !== 'file-id-back' && rowEl) {
                    rowEl.classList.remove('file-row-success');
                } else if (slot.input === 'file-id-back') {
                    const frontInput = document.getElementById('file-brgy-cert');
                    if (frontInput && frontInput.files.length === 0 && rowEl) {
                        rowEl.classList.remove('file-row-success');
                    }
                }
            });
        }
    });

    /* ==========================================================================
       ── VISUAL PREVIEW MODAL INTERACTIVE LOGIC (FIXED POSITIONING) ──
       ========================================================================== */
    const linkPreviewId = document.getElementById('link-preview-id'); 
    const modalVisualPreview = document.getElementById('modal-visual-preview');
    const previewTitle = document.getElementById('preview-modal-title');
    const previewDesc = document.getElementById('preview-modal-description');
    const closePreviewModal = document.getElementById('close-preview-modal');

    const singlePreviewBox = document.getElementById('single-preview-box');
    const multiPreviewBox = document.getElementById('multi-preview-box');

    const previewImgSingle = document.getElementById('preview-modal-img');
    const previewImgBrgy = document.getElementById('preview-img-brgy');
    const previewImgIdFront = document.getElementById('preview-img-idfront');
    const previewImgIdBack = document.getElementById('preview-img-idback');

    const reqTriggerPhoto = document.getElementById('req-trigger-photo');
    const reqTriggerMedical = document.getElementById('req-trigger-medical');
    const reqTriggerBarangay = document.getElementById('req-trigger-barangay');

    const faqTriggerPhoto = document.getElementById('faq-req-photo');
    const faqTriggerMedical = document.getElementById('faq-req-medical');
    const faqTriggerBarangay = document.getElementById('faq-req-barangay');

    function displayVisualSample(title, description, toggleBoxType, assignImagesCallback) {
        if (!modalVisualPreview || !previewTitle || !previewDesc || !singlePreviewBox || !multiPreviewBox) return;
        
        previewTitle.textContent = title;
        previewDesc.innerHTML = description;
        
        if (toggleBoxType === 'single') {
            multiPreviewBox.style.display = "none";
            singlePreviewBox.style.display = "flex";
        } else if (toggleBoxType === 'multi') {
            singlePreviewBox.style.display = "none";
            multiPreviewBox.style.display = "flex";
        }
        
        assignImagesCallback();
        modalVisualPreview.style.display = 'flex';
    }

    if (linkPreviewId) {
        linkPreviewId.addEventListener('click', (e) => {
            e.preventDefault();
            displayVisualSample(
                "Physical PWD ID Card Sample",
                "• Official card format issued by the Cagayan de Oro City Government.<br>• Features your unique control number, photo, and disability classification.",
                "single",
                () => { if (previewImgSingle) previewImgSingle.src = "sampleID.png"; }
            );
        });
    }

    [reqTriggerPhoto, faqTriggerPhoto].forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', () => {
                displayVisualSample(
                    "1×1 Photo Specifications",
                    "• Recent photo with a plain white background.<br>• Face must look straight forward with clear, clear lighting.<br>• Avoid dark sunglasses, hats, or heavy filters.",
                    "single",
                    () => { if (previewImgSingle) previewImgSingle.src = "1x1sample.jpg"; }
                );
            });
        }
    });

    [reqTriggerMedical, faqTriggerMedical].forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', () => {
                displayVisualSample(
                    "Medical Certificate Reference Layout",
                    "• Must be signed by a licensed physician or clinic specialist.<br>• Explicitly confirms your specific disability classification group.<br>• Text logs, doctor signature, and license numbers must be fully legible.",
                    "single",
                    () => { if (previewImgSingle) previewImgSingle.src = "medcertsample.png"; }
                );
            });
        }
    });

    [reqTriggerBarangay, faqTriggerBarangay].forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', () => {
                displayVisualSample(
                    "Identity & Residency Verification Options",
                    "• <strong>Option A:</strong> Standard Barangay Clearance certificate issued within the last 6 months.<br>• <strong>Option B:</strong> Front and Back copy of your official Government National ID proving your local residency.",
                    "multi",
                    () => {
                        if (previewImgBrgy) previewImgBrgy.src = "brgycertsample.jpg";
                        if (previewImgIdFront) previewImgIdFront.src = "NatID_front.png";
                        if (previewImgIdBack) previewImgIdBack.src = "NatID_back.png";
                    }
                );
            });
        }
    });

    if (closePreviewModal) {
        closePreviewModal.addEventListener('click', () => {
            if (modalVisualPreview) modalVisualPreview.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalVisualPreview) {
            modalVisualPreview.style.display = 'none';
        }
    });

    /* ==========================================================================
       ── CLICK-TO-FULLSCREEN ENHANCEMENT ENGINE ──
       ========================================================================== */
    const previewClickZones = document.querySelectorAll('.single-preview-frame, .sub-option-box');
    const allPreviewImages = document.querySelectorAll('#modal-visual-preview img');

    previewClickZones.forEach(zone => {
        zone.addEventListener('click', (e) => {
            const targetImg = e.target.closest('img');
            const finalImg = targetImg || zone.querySelector('img');
            
            if (finalImg && !finalImg.classList.contains('image-fullscreen-active')) {
                e.stopPropagation(); 
                finalImg.classList.add('image-fullscreen-active');
            }
        });
    });

    allPreviewImages.forEach(img => {
        img.addEventListener('click', (e) => {
            if (img.classList.contains('image-fullscreen-active')) {
                e.stopPropagation(); 
                img.classList.remove('image-fullscreen-active');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allPreviewImages.forEach(img => {
                img.classList.remove('image-fullscreen-active');
            });
        }
    });

    /* ==========================================================================
       ── ACCESSIBILITY & ESCAPE KEY MODAL DISMISS ENGINE ──
       ========================================================================== */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const allModals = document.querySelectorAll('.modal');
            allModals.forEach(modal => {
                modal.style.display = 'none';
            });
            if (typeof clearErrors === 'function') {
                clearErrors();
            }
        }
    });
    
});

// ==========================================================================
// ── PERSISTENT DARK MODE ENGINE ──
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIconIndicator = document.getElementById('theme-icon-indicator');

const currentThemePreference = localStorage.getItem('portalTheme');

if (currentThemePreference === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIconIndicator) themeIconIndicator.textContent = 'light_mode'; 
} else {
    document.body.classList.remove('dark-mode');
    if (themeIconIndicator) themeIconIndicator.textContent = 'dark_mode';  
}

if (themeToggleBtn && themeIconIndicator) {
    themeToggleBtn.addEventListener('click', () => {
        const isDarkActive = document.body.classList.toggle('dark-mode');
        
        if (isDarkActive) {
            localStorage.setItem('portalTheme', 'dark');
            themeIconIndicator.textContent = 'light_mode';
        } else {
            localStorage.setItem('portalTheme', 'light');
            themeIconIndicator.textContent = 'dark_mode';
        }
    });
}