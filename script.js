const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const profilePhoto = document.getElementById("profilePhoto");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const filterMessage = document.getElementById("filterMessage");

if (profilePhoto) {
    profilePhoto.addEventListener("error", () => {
        profilePhoto.hidden = true;
    });
}

function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme ? savedTheme === "dark" : prefersDark);

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-theme");
        setTheme(isDark);
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    });
}

function updateFilterMessage() {
    if (!filterMessage) return;

    const visibleProjects = [...projectCards].filter(card => !card.hidden).length;
    filterMessage.textContent =
        `${visibleProjects} project${visibleProjects === 1 ? "" : "s"} displayed.`;
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });

        projectCards.forEach(card => {
            const matches = filter === "all" || card.dataset.category === filter;
            card.hidden = !matches;
        });

        updateFilterMessage();
    });
});

updateFilterMessage();

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const portfolioEmail = "arsathparvesh.m@gmail.com";

if (contactForm && formMessage) {
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

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        formMessage.textContent =
            "Opening your email application. Review the message and send it.";

        window.location.href =
            `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
    });
}