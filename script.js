const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const profilePhoto = document.getElementById("profilePhoto");

profilePhoto.addEventListener("error", () => {
    profilePhoto.hidden = true;
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Light and dark theme
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
});

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterMessage = document.getElementById("filterMessage");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let count = 0;

        filterButtons.forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });

        projectCards.forEach(card => {
            const matches =
                filter === "all" || card.dataset.category === filter;

            card.hidden = !matches;
            if (matches) count++;
        });

        filterMessage.textContent =
            `${count} project${count === 1 ? "" : "s"} displayed.`;
    });
});

// Footer year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Contact form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Replace with your real email before publishing
const portfolioEmail = "your-email@example.com";

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    if (portfolioEmail === "your-email@example.com") {
        formMessage.textContent =
            "Update portfolioEmail in script.js with your email address.";
        return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formMessage.textContent =
        "Opening your email application. Review the message and send it.";

    window.location.href =
        `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});