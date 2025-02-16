// ============================
// 🟢 TERMINAL BOOT-UP TEXT ANIMATION
// ============================
const terminalLines = [
    "Booting up Aryan's AI Engine...",
    "Initializing neural networks...",
    "Loading machine learning models...",
    "Compiling futuristic animations...",
    "Enabling dark mode environment...",
    "Connecting to GitHub projects...",
    "Fetching AI datasets...",
    "Authentication successful ✅",
    "Welcome to Aryan's Portfolio Terminal!"
];

let terminalIndex = 0, terminalCharIndex = 0;
const terminalText = document.getElementById("terminal-text");
const terminalScreen = document.getElementById("terminal-screen");

function typeTerminalText() {
    if (terminalIndex < terminalLines.length) {
        if (terminalCharIndex < terminalLines[terminalIndex].length) {
            terminalText.innerHTML += terminalLines[terminalIndex].charAt(terminalCharIndex);
            terminalCharIndex++;
            setTimeout(typeTerminalText, 50);
        } else {
            terminalText.innerHTML += "\n";
            terminalCharIndex = 0;
            terminalIndex++;
            setTimeout(typeTerminalText, 500);
        }
    } else {
        // Fade out the terminal screen after boot-up
        setTimeout(() => {
            terminalScreen.style.transition = "opacity 1s ease-out";
            terminalScreen.style.opacity = "0";
            setTimeout(() => { terminalScreen.style.display = "none"; }, 1000);
        }, 1000);
    }
}

// Start the typing animation when the page loads
document.addEventListener("DOMContentLoaded", () => {
    typeTerminalText();
});

// ============================
// 🟢 FUTURISTIC CURSOR EFFECT
// ============================
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ============================
// 🟢 GSAP PAGE LOAD ANIMATIONS
// ============================
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== "undefined") {
        gsap.from("h1", { duration: 1, opacity: 0, y: -50, ease: "power3.out" });
        gsap.from("p", { duration: 1.2, opacity: 0, y: 30, delay: 0.2, ease: "power3.out" });
        gsap.from(".btn", { duration: 1.5, opacity: 0, scale: 0.8, delay: 0.5, ease: "back.out(1.7)" });
    } else {
        console.warn("⚠️ GSAP library is missing. Animations may not work.");
    }
});

// ============================
// 🟢 SMOOTH SCROLL-BASED ANIMATIONS
// ============================
if (typeof gsap !== "undefined") {
    gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 50%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
        });
    });
}
