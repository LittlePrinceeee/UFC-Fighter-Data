// Shared behaviour for every page.

// ----- Mobile menu -----
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

if (menuButton && menu) {
    const setOpen = (open) => {
        menu.classList.toggle("show", open);
        menuButton.setAttribute("aria-expanded", String(open));
    };

    menuButton.addEventListener("click", () => {
        setOpen(!menu.classList.contains("show"));
    });

    // Close the menu after choosing a link or pressing Escape
    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("show")) {
            setOpen(false);
            menuButton.focus();
        }
    });
}

// ----- Athletes page: filter men / women -----
const filterButtons = document.querySelectorAll("[data-filter]");
const champions = document.querySelectorAll("[data-division]");
const countLabel = document.getElementById("champ-count");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let shown = 0;

        filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        champions.forEach((card) => {
            const match = filter === "all" || card.dataset.division === filter;
            card.hidden = !match;
            if (match) shown++;
        });

        if (countLabel) {
            countLabel.textContent = `${shown} ${shown === 1 ? "champion" : "champions"}`;
        }
    });
});

// ----- Contact page: confirm only when the form is valid -----
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", () => {
        alert("Message sent. Thanks for helping us keep the data right!");
    });
}
