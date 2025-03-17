document.addEventListener('DOMContentLoaded', function() {
    // Certificate navigation
    const certificates = document.querySelectorAll('.certificate-entry');
    const prevBtn = document.getElementById('prev-certificate');
    const nextBtn = document.getElementById('next-certificate');
    const counter = document.getElementById('certificate-counter');
    let currentIndex = 0;
    
    // Show only the first certificate initially
    updateCertificateDisplay();
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % certificates.length;
        updateCertificateDisplay();
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        updateCertificateDisplay();
    });
    
    // Update which certificate is displayed
    function updateCertificateDisplay() {
        certificates.forEach((cert, index) => {
            if (index === currentIndex) {
                cert.classList.add('active');
            } else {
                cert.classList.remove('active');
            }
        });
        
        // Update the counter text
        counter.textContent = `${currentIndex + 1} / ${certificates.length}`;
    }

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending state
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send the email using EmailJS
            emailjs.send('service_s01mkk4', 'template_bby5z9b', {
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            })
            .then(function() {
                // Success message - custom popup
                showCustomPopup('Your message has been sent successfully!');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                // Error message
                console.error('Email sending failed:', error);
                showCustomPopup('Sorry, there was an error sending your message. Please try again later.', 'error');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Custom popup functions
function showCustomPopup(message, type = 'success') {
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.querySelector('.popup-message');
    const popupIcon = document.querySelector('.popup-icon i');
    
    // Set message
    popupMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'error') {
        popupIcon.className = 'fas fa-exclamation-circle';
        popupIcon.style.color = '#ff4e4e';
    } else {
        popupIcon.className = 'fas fa-check-circle';
        popupIcon.style.color = '#4ade80';
    }
    
    // Show popup
    popup.classList.add('active');
    
    // Add close button event listener
    document.getElementById('popup-close').addEventListener('click', hideCustomPopup);
    
    // Add click outside to close
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideCustomPopup();
        }
    });
}

function hideCustomPopup() {
    const popup = document.getElementById('custom-popup');
    popup.classList.remove('active');
}
