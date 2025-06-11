document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            emailjs.send('service_s01mkk4', 'template_bby5z9b', {
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            })
            .then(function() {
                showCustomPopup('Your message has been sent successfully!');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.error('Email sending failed:', error);
                showCustomPopup('Sorry, there was an error sending your message. Please try again later.', 'error');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Make logo scrollable to top
    const logoLink = document.querySelector('.logo-link');
    
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing effect for intro greeting
    const typingElement = document.getElementById('typing-text');
    const textToType = "Hello, I'm";
    let charIndex = 0;
    
    if (typingElement) {
        // Clear any existing content
        typingElement.innerHTML = '';
        
        // Create typing cursor
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        
        // Type each character with delay
        function typeNextChar() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, 100); // Adjust speed here (lower = faster)
            } else {
                // Add blinking cursor at the end
                typingElement.appendChild(cursor);
            }
        }
        
        // Start typing with a small initial delay
        setTimeout(typeNextChar, 500);
    }

    // Looping code block typing effect
    const codeElement = document.getElementById('typing-code');
    
    if (codeElement) {
        // Store the original HTML content
        const originalContent = codeElement.innerHTML;
        
        function startTypingAnimation() {
            // Clear the code block
            codeElement.innerHTML = '';
            
            // Add cursor
            const cursor = document.createElement('span');
            cursor.classList.add('typing-cursor-code');
            codeElement.appendChild(cursor);
            
            // For a simpler approach that works better with complex HTML
            let currentDisplayedHTML = '';
            let fullHTML = originalContent;
            let i = 0;
            
            // Faster typing speed - reduced from 30ms to 10ms
            const typeInterval = setInterval(() => {
                if (i < fullHTML.length) {
                    // Process multiple characters at once for even faster typing
                    const charsToAdd = Math.min(3, fullHTML.length - i); // Add 3 chars at once for speed
                    currentDisplayedHTML += fullHTML.substring(i, i + charsToAdd);
                    codeElement.innerHTML = currentDisplayedHTML;
                    codeElement.appendChild(cursor);
                    i += charsToAdd;
                } else {
                    clearInterval(typeInterval);
                    
                    // Wait 8 seconds and then restart the animation
                    setTimeout(() => {
                        startTypingAnimation();
                    }, 8000);
                }
            }, 20); // Typing speed
        }
        
        // Start the initial animation
        startTypingAnimation();
    }

    // Setup Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Apply different animation effects based on section id
                switch(section.id) {
                    case 'intro':
                        animateIntro(section);
                        break;
                    case 'about-me':
                        animateAboutMe(section);
                        break;
                    case 'education':
                        animateEducation(section);
                        break;
                    case 'experience':
                        animateExperience(section);
                        break;
                    case 'skills':
                        animateSkills(section);
                        break;
                    case 'certificates':
                        animateCertificates(section);
                        break;
                    case 'contact':
                        animateContact(section);
                        break;
                }
                
                // Stop observing after animation
                observer.unobserve(section);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    const sections = document.querySelectorAll("section[id]");
    
    window.addEventListener("scroll", navHighlighter);
    
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            
            // Skip the intro section for navigation highlighting
            if (sectionId === 'intro') return;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector("nav a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector("nav a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }
    
    navHighlighter();

    const certificateTiles = document.querySelectorAll('.certificate-tile');
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-certificate-image');
    const modalTitle = document.getElementById('modal-certificate-title');
    const modalClose = document.querySelector('.modal-close');
    
    certificateTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const img = this.querySelector('.certificate-image');
            const title = this.querySelector('.certificate-info h3').textContent;
            
            if (img && img.src) {
                modalImage.src = img.src;
                modalImage.alt = img.alt || title;
                modalTitle.textContent = title;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            setTimeout(() => {
                if (!modal.classList.contains('active')) {
                    modalImage.src = '';
                }
            }, 300);
        }
    }

    // Set up capstone modal close functionality
    const capstoneModal = document.getElementById('capstone-modal');
    const capstoneModalClose = capstoneModal ? capstoneModal.querySelector('.modal-close') : null;
    
    if (capstoneModalClose) {
        capstoneModalClose.addEventListener('click', function() {
            closeCapstoneModal();
        });
    }
    
    if (capstoneModal) {
        capstoneModal.addEventListener('click', function(e) {
            if (e.target === capstoneModal) {
                closeCapstoneModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && capstoneModal && capstoneModal.classList.contains('active')) {
            closeCapstoneModal();
        }
    });

    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Check if we're in cooldown period
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const touchDiff = touchStartY - touchEndY;
        
        // Only trigger if significant swipe (avoid small movements)
        if (Math.abs(touchDiff) < 50) return;
        
        // Determine direction and find current section
        const direction = touchDiff > 0 ? 1 : -1; // Down = positive, Up = negative
        
        let currentSectionIndex = 0;
        const scrollPosition = window.scrollY + 100; // Add offset for header
        
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionIndex = index;
            }
        });
        
        // Find target section
        const targetIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
        if (targetIndex !== currentSectionIndex) {
            // Scroll to target section
            isScrolling = true;
            lastScrollTime = now;
            
            sections[targetIndex].scrollIntoView({
                behavior: 'smooth'
            });
            
            // Reset scrolling flag after animation completes
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }, { passive: true });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Check if we're in cooldown period
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const direction = e.key === 'ArrowDown' ? 1 : -1;
            
            // Find current section
            let currentSectionIndex = 0;
            const scrollPosition = window.scrollY + 100; // Add offset for header
            
            sections.forEach((section, index) => {
                if (scrollPosition >= section.offsetTop) {
                    currentSectionIndex = index;
                }
            });
            
            // Find target section
            const targetIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
            if (targetIndex !== currentSectionIndex) {
                // Scroll to target section
                e.preventDefault();
                isScrolling = true;
                lastScrollTime = now;
                
                sections[targetIndex].scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Reset scrolling flag after animation completes
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }
    });
});

// Visitor Counter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get current visit count from localStorage
    let visitCount = localStorage.getItem('visitCount');
    
    // If no count exists, start from 0
    if (!visitCount) {
        visitCount = 0;
    }
    
    // Increment the count
    visitCount = parseInt(visitCount) + 1;
    
    // Store the new count
    localStorage.setItem('visitCount', visitCount);
    
    // Display the count
    const visitCountElement = document.getElementById('visit-count');
    if (visitCountElement) {
        visitCountElement.textContent = visitCount.toLocaleString();
    }
});

function showCustomPopup(message, type = 'success') {
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.querySelector('.popup-message');
    const popupIcon = document.querySelector('.popup-icon i');
    
    popupMessage.textContent = message;
    
    if (type === 'error') {
        popupIcon.className = 'fas fa-exclamation-circle';
        popupIcon.style.color = '#ff4e4e';
    } else {
        popupIcon.className = 'fas fa-check-circle';
        popupIcon.style.color = '#4ade80';
    }
    
    popup.classList.add('active');
    
    document.getElementById('popup-close').addEventListener('click', hideCustomPopup);
    
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
// Capstone modal functionality
function openCapstoneModal(element) {
    const modal = document.getElementById('capstone-modal');
    const modalImage = document.getElementById('modal-capstone-image');
    const modalTitle = document.getElementById('modal-capstone-title');
    const img = element.querySelector('.collage-image');
    
    if (img && img.src) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = img.alt;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCapstoneModal() {
    const modal = document.getElementById('capstone-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                document.getElementById('modal-capstone-image').src = '';
            }
        }, 300);
    }
}