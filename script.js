document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    
    // Function to update active link based on scroll position
    function updateActiveLink() {
        const imageContainers = document.querySelectorAll('.image-container');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[navLinks.length - 1].classList.add('active');
            navbar.style.opacity = "0.9";
            return;
        }

        // Check other sections
        imageContainers.forEach((container, index) => {
            const rect = container.getBoundingClientRect();
            if (rect.top >= -windowHeight/2 && rect.top <= windowHeight/2) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');

                if (index === 0) {
                    navbar.style.opacity = "1";
                } else {
                    navbar.style.opacity = "0.9";
                }
            }
        });
    }

    // Add click event listeners to all nav links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add transitioning class to clicked link
            link.classList.add('active');
            
            // Get all image containers and scroll to the one matching the index
            const imageContainers = document.querySelectorAll('.image-container');
            if (imageContainers[index]) {
                imageContainers[index].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Set initial active state
    updateActiveLink();
});