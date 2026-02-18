// Restored script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("PDKVCET Website Loaded");

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dropdown Mobile Toggle Logic (if needed)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) { // Mobile breakpoint
                // e.preventDefault(); // Option to prevent default link 
                this.classList.toggle('active');
            }
        });
    });
});
