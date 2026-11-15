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
  const fields = document.querySelector("#contact-form-fields");
  const review = document.querySelector("#contact-review");
  const status = document.querySelector("#contact-form-status");
  const sendButton = document.querySelector("#contact-send-button");
  const success = document.querySelector("#contact-form-success");

  document.querySelector("#contact-review-button").addEventListener("click", () => {
    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    document.querySelector("#review-name").textContent = values.get("name");
    document.querySelector("#review-email").textContent = values.get("email");
    document.querySelector("#review-subject").textContent = values.get("subject");
    document.querySelector("#review-message").textContent = values.get("message");

    fields.hidden = true;
    review.hidden = false;
    status.textContent = "";
    review.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector("#contact-edit-button").addEventListener("click", () => {
    review.hidden = true;
    fields.hidden = false;
    document.querySelector("#contact-review-button").focus();
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    sendButton.disabled = true;
    status.textContent = "送信しています…";

    const formData = new FormData(contactForm);
    formData.append("_subject", `【超・脱出】${formData.get("subject")}`);
    formData.append("_replyto", formData.get("email"));
    formData.append("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/ajax/cho.dassyutsu@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error(result.message || "送信に失敗しました。");
      }

      contactForm.reset();
      review.hidden = true;
      status.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      status.textContent = "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。";
      sendButton.disabled = false;
    }
  });
}
