// Import the required scripts
import "./ui.js";  // Handles terminal animation & UI effects
import "../threejs/main.js"; // Initializes the 3D environment
import "../threejs/matrix.js"; // Runs the Matrix falling effect

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Main script loaded!");

    // Ensure Dark Mode is Always Applied
    document.body.classList.add("dark-mode");

    // Smooth Scrolling for Navigation
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Lazy Loading Images (Performance Optimization)
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
