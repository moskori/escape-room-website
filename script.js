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


const sharedRevealElements = document.querySelectorAll(
  ".news-section, .about-section, .games-section, .access-section, .faq-section, .contact-section"
);

sharedRevealElements.forEach((element) => {
  element.classList.add("reveal");
});


if ("IntersectionObserver" in window) {
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
      rootMargin: "0px 0px -8% 0px",
      threshold: 0,
    }
  );

  sharedRevealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  sharedRevealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}




