// --- Draggable floating elements ---
document.querySelectorAll('[data-draggable]').forEach(el => {
    let isDragging = false;
    let startX, startY, origX, origY;

    el.addEventListener('mousedown', e => {
        // Don't drag if clicking a link, button, or table link
        if (e.target.closest('a') || e.target.closest('button')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        origX = el.offsetLeft;
        origY = el.offsetTop;

        // Bring to front
        document.querySelectorAll('[data-draggable]').forEach(d => d.style.zIndex = 10);
        el.style.zIndex = 100;

        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (origX + dx) + 'px';
        el.style.top = (origY + dy) + 'px';
        // Clear right positioning if set via CSS
        el.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    el.addEventListener('touchstart', e => {
        if (e.target.closest('a') || e.target.closest('button')) return;

        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        origX = el.offsetLeft;
        origY = el.offsetTop;

        document.querySelectorAll('[data-draggable]').forEach(d => d.style.zIndex = 10);
        el.style.zIndex = 100;
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        el.style.left = (origX + dx) + 'px';
        el.style.top = (origY + dy) + 'px';
        el.style.right = 'auto';
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
});

// --- Table row click → popup ---
document.querySelectorAll('.table-row-clickable').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', e => {
        // Don't open popup if clicking the link itself
        if (e.target.closest('a')) return;

        const popupId = row.dataset.popup;
        const overlay = document.getElementById('popup-' + popupId);
        if (overlay) overlay.classList.add('active');
    });
});

// --- Close popups ---
document.querySelectorAll('.popup-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.popup-overlay').classList.remove('active');
    });
});

document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// --- Close popup with Escape ---
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup-overlay.active').forEach(o => o.classList.remove('active'));
    }
});
