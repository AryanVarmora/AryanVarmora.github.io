// 🌌 Matrix Rain Effect
const matrixCanvas = document.createElement("canvas");
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;
matrixCanvas.style.position = "fixed";
matrixCanvas.style.top = "0";
matrixCanvas.style.left = "0";
matrixCanvas.style.zIndex = "-2"; // Keeps it behind everything
document.body.appendChild(matrixCanvas);

const ctx = matrixCanvas.getContext("2d");

// Matrix Code Configuration
const columns = Math.floor(window.innerWidth / 14);
const drops = Array(columns).fill(0);
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const fontSize = 14;

// Matrix Animation
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Start Matrix Effect
setInterval(drawMatrix, 50);

// Adjust Canvas on Resize
window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
});
