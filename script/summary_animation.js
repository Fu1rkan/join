/**
 * Summary page mobile animation controller
 * Shows greeting container first, then transitions to title and content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run animation on mobile devices (below 1400px)
    if (window.innerWidth <= 1400) {
        initializeSummaryAnimation();
    }
    
    // Re-check on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1400) {
            initializeSummaryAnimation();
        } else {
            resetToDesktopView();
        }
    });
});

/**
 * Initialize the mobile summary animation sequence
 */
function initializeSummaryAnimation() {
    let summaryGreeting = document.querySelector('.summary-greeting-container');
    let summaryTitle = document.querySelector('.summary-title');
    let summaryContainer = document.querySelector('.summary-container');
    
    if (!summaryGreeting || !summaryTitle || !summaryContainer) return;
    
    // Ensure greeting is visible and title/container are hidden initially
    summaryGreeting.style.opacity = '1';
    summaryGreeting.style.visibility = 'visible';
    summaryTitle.style.opacity = '0';
    summaryContainer.style.opacity = '0';
    
    // After 3 seconds, hide greeting and show title/container
    setTimeout(() => {
        summaryGreeting.style.opacity = '0';
        summaryGreeting.style.visibility = 'hidden';
        
        // Fade in title and container after greeting fades out
        setTimeout(() => {
            summaryTitle.style.opacity = '1';
            summaryContainer.style.opacity = '1';
        }, 500); // Small delay for smooth transition
        
    }, 3000); // 3 second delay
}

/**
 * Reset to desktop view (no animations)
 */
function resetToDesktopView() {
    let summaryGreeting = document.querySelector('.summary-greeting-container');
    let summaryTitle = document.querySelector('.summary-title');
    let summaryContainer = document.querySelector('.summary-container');
    
    if (summaryGreeting && summaryTitle && summaryContainer) {
        summaryGreeting.style.opacity = '';
        summaryGreeting.style.visibility = '';
        summaryTitle.style.opacity = '';
        summaryContainer.style.opacity = '';
    }
}