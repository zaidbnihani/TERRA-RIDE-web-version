// ============================================================================
// app.js - RideFlow Landing Page Interactions & Tab Switcher
// ============================================================================

function switchAppTab(appType) {
    const riderBtn = document.getElementById('tab-rider-btn');
    const driverBtn = document.getElementById('tab-driver-btn');
    const riderMockup = document.getElementById('rider-screen-mockup');
    const driverMockup = document.getElementById('driver-screen-mockup');

    if (appType === 'rider') {
        riderBtn.classList.add('active');
        driverBtn.classList.remove('active');
        riderMockup.classList.add('active');
        driverMockup.classList.remove('active');
    } else {
        driverBtn.classList.add('active');
        riderBtn.classList.remove('active');
        driverMockup.classList.add('active');
        riderMockup.classList.remove('active');
    }
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
