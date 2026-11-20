
// ================================
// DARK MODE, LIGHT MODE
// DAN PENGATURAN UKURAN TULISAN
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Mengambil tema dan ukuran tulisan yang tersimpan
    let savedTheme = localStorage.getItem("hc-theme") || "light";
    let savedFontSize = Number(localStorage.getItem("hc-font-size")) || 16;

    // Membatasi ukuran tulisan
    savedFontSize = Math.min(24, Math.max(12, savedFontSize));

    // ================================
    // MEMBUAT PANEL PENGATURAN
    // ================================

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

    // Mengambil elemen tombol
    const themeButton = document.getElementById("theme-toggle");
    const decreaseButton = document.getElementById("font-decrease");
    const increaseButton = document.getElementById("font-increase");
    const fontSizeDisplay = document.getElementById("font-size-display");

    // ================================
    // MENERAPKAN TEMA
    // ================================

    function applyTheme(theme) {
        document.body.classList.toggle("dark-mode", theme === "dark");

        themeButton.textContent =
            theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

        localStorage.setItem("hc-theme", theme);
    }

    // ================================
    // MENERAPKAN UKURAN TULISAN
    // ================================

    function applyFontSize(size) {
        savedFontSize = Math.min(24, Math.max(12, size));

        document.documentElement.style.setProperty(
            "--article-font-size",
            savedFontSize + "px"
        );

        fontSizeDisplay.textContent = savedFontSize + "px";

        localStorage.setItem("hc-font-size", savedFontSize);
    }

    // Menerapkan pengaturan awal
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);

    // ================================
    // TOMBOL DARK MODE
    // ================================

    themeButton.addEventListener("click", function () {

        const newTheme = document.body.classList.contains("dark-mode")
            ? "light"
            : "dark";

        applyTheme(newTheme);
    });

    // ================================
    // TOMBOL PERKECIL TULISAN
    // ================================

    decreaseButton.addEventListener("click", function () {
        applyFontSize(savedFontSize - 2);
    });

    // ================================
    // TOMBOL PERBESAR TULISAN
    // ================================

    increaseButton.addEventListener("click", function () {
        applyFontSize(savedFontSize + 2);
    });

    // ================================
    // FITUR DRAG SELURUH PANEL
    // ================================

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let initialLeft = 0;
    let initialTop = 0;

    // Menentukan awal pergerakan panel
    settings.addEventListener("pointerdown", function (e) {

        // Jika yang ditekan tombol, jangan geser panel
        if (e.target.closest("button")) {
            return;
        }

        isDragging = true;

        const rect = settings.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;

        initialLeft = rect.left;
        initialTop = rect.top;

        // Mengubah posisi panel menjadi koordinat layar
        settings.style.left = initialLeft + "px";
        settings.style.top = initialTop + "px";
        settings.style.right = "auto";
        settings.style.bottom = "auto";

        // Mengunci pointer selama proses geser
        settings.setPointerCapture(e.pointerId);

        e.preventDefault();
    });

    // Menggerakkan panel
    settings.addEventListener("pointermove", function (e) {

        if (!isDragging) return;

        const newLeft = initialLeft + (e.clientX - startX);
        const newTop = initialTop + (e.clientY - startY);

        // Membatasi panel agar tidak keluar layar
        const maxLeft = window.innerWidth - settings.offsetWidth;
        const maxTop = window.innerHeight - settings.offsetHeight;

        const finalLeft = Math.max(0, Math.min(newLeft, maxLeft));
        const finalTop = Math.max(0, Math.min(newTop, maxTop));

        settings.style.left = finalLeft + "px";
        settings.style.top = finalTop + "px";
    });

    // Menghentikan pergerakan panel
    settings.addEventListener("pointerup", function () {
        isDragging = false;
    });

    settings.addEventListener("pointercancel", function () {
        isDragging = false;
    });

    // ================================
    // MENYESUAIKAN POSISI SAAT RESIZE
    // ================================

    window.addEventListener("resize", function () {

        // Jika panel belum pernah digeser, posisi default tetap
        if (settings.style.left === "" || settings.style.top === "") {
            return;
        }

        const rect = settings.getBoundingClientRect();

        const maxLeft = window.innerWidth - settings.offsetWidth;
        const maxTop = window.innerHeight - settings.offsetHeight;

        settings.style.left =
            Math.max(0, Math.min(rect.left, maxLeft)) + "px";

        settings.style.top =
            Math.max(0, Math.min(rect.top, maxTop)) + "px";
    });

});
