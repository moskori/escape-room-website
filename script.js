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






const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const subject = String(formData.get("subject")).trim();
    const message = String(formData.get("message")).trim();
    const body = `お名前: ${name}\nメールアドレス: ${email}\nお問い合わせ項目: ${subject}\n\nお問い合わせ内容:\n${message}`;
    const mailto = `mailto:cho.dassyutsu@gmail.com?subject=${encodeURIComponent(`【超・脱出】${subject}`)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    document.querySelector("#contact-form-status").textContent =
      "メールアプリが開いたら、内容をご確認のうえ送信してください。";
  });
}
