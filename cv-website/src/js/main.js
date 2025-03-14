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
});