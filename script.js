
// ================================
// DARK MODE & LIGHT MODE
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Mengambil tema dan ukuran tulisan yang tersimpan
    let savedTheme = localStorage.getItem("hc-theme") || "light";
    let savedFontSize = Number(localStorage.getItem("hc-font-size")) || 16;

    // Membatasi ukuran tulisan
    savedFontSize = Math.min(24, Math.max(12, savedFontSize));

    // Menerapkan tema
    function applyTheme(theme) {
        document.body.classList.toggle("dark-mode", theme === "dark");

        themeButton.textContent =
            theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

        localStorage.setItem("hc-theme", theme);
    }

    // Menerapkan ukuran tulisan
    function applyFontSize(size) {
        savedFontSize = Math.min(24, Math.max(12, size));

        document.documentElement.style.setProperty(
            "--article-font-size",
            savedFontSize + "px"
        );

        fontSizeDisplay.textContent = savedFontSize + "px";

        localStorage.setItem("hc-font-size", savedFontSize);
    }

    // Membuat panel pengaturan
    const settings = document.createElement("div");
    settings.id = "website-settings";

    settings.innerHTML = `
        <button id="theme-toggle" type="button">
            🌙 Dark Mode
        </button>

        <div class="font-controls">
            <span>Ukuran tulisan</span>

            <button id="font-decrease" type="button"
                aria-label="Perkecil tulisan">A−</button>

            <span id="font-size-display">16px</span>

            <button id="font-increase" type="button"
                aria-label="Perbesar tulisan">A+</button>
        </div>
    `;

    document.body.appendChild(settings);

    // Mengambil tombol
    const themeButton = document.getElementById("theme-toggle");
    const decreaseButton = document.getElementById("font-decrease");
    const increaseButton = document.getElementById("font-increase");
    const fontSizeDisplay = document.getElementById("font-size-display");

    // Menerapkan pengaturan awal
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);

    // Mengganti tema
    themeButton.addEventListener("click", function () {
        const newTheme = document.body.classList.contains("dark-mode")
            ? "light"
            : "dark";

        applyTheme(newTheme);
    });

    // Memperkecil tulisan
    decreaseButton.addEventListener("click", function () {
        applyFontSize(savedFontSize - 2);
    });

    // Memperbesar tulisan
    increaseButton.addEventListener("click", function () {
        applyFontSize(savedFontSize + 2);
    });

});
