const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");

    item.classList.toggle("is-open");
  });
});
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("menu-open");

  menuButton.setAttribute("aria-expanded", isOpen);
});
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
const revealElements = document.querySelectorAll(
  ".about-section, .games-section, .access-section, .faq-section, .contact-section"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);





