(function addHorizontalFades() {
    const lists = document.querySelectorAll('.kanban-board .task-list');

    lists.forEach((list) => {
        // Wrapper erzeugen und list hineinverschieben
        const wrap = document.createElement('div');
        wrap.className = 'hs-wrap';
        list.parentNode.insertBefore(wrap, list);
        wrap.appendChild(list);

        // Fade-Overlays erstellen
        const fadeLeft = document.createElement('div');
        const fadeRight = document.createElement('div');
        fadeLeft.className = 'hs-fade hs-fade--left';
        fadeRight.className = 'hs-fade hs-fade--right';
        wrap.appendChild(fadeLeft);
        wrap.appendChild(fadeRight);

        // Update-Logik je nach Scrollposition
        const update = () => {
            // nur bei mobiler Ansicht relevant – dein Overflow ist dort aktiv
            const max = list.scrollWidth - list.clientWidth;
            const hasOverflow = max > 1;

            wrap.classList.toggle('has-overflow', hasOverflow);

            if (!hasOverflow) {
                fadeLeft.style.opacity = '0';
                fadeRight.style.opacity = '0';
                return;
            }

            const atStart = list.scrollLeft <= 1;
            const atEnd = list.scrollLeft >= max - 1;

            // Am Anfang: nur rechter Fade sichtbar
            // In der Mitte: beide sichtbar
            // Am Ende: nur linker Fade sichtbar
            fadeLeft.style.opacity = atStart ? '0' : '1';
            fadeRight.style.opacity = atEnd ? '0' : '1';
        };

        // Events
        list.addEventListener('scroll', update, { passive: true });

        // Resize/Font/Layouträume können sich ändern
        const ro = new ResizeObserver(update);
        ro.observe(list);

        // Tasks können dynamisch dazu kommen/entfernt werden
        const mo = new MutationObserver(update);
        mo.observe(list, { childList: true, subtree: true });

        // Initial
        update();
    });
})();