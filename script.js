// All Scripts: Form Validation + Safety Card Animation + Reviews Slider + City Click + FAQ Toggle
document.addEventListener("DOMContentLoaded", function () {
  // === FORM VALIDATION FOR ALL FORMS ===
  document.querySelectorAll("form").forEach(form => {
    const captchaText = form.querySelector(".captcha");
    const formMessage = document.createElement("p");
    form.appendChild(formMessage);

    const actualCaptcha = captchaText ? captchaText.textContent.trim() : "1514";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('input[placeholder="Name"]')?.value.trim();
      const mobile = form.querySelector('input[placeholder="Mobile Number"], input[placeholder="Phone"]')?.value.trim();
      const captchaInput = form.querySelector('input[placeholder="Captcha"]')?.value.trim();
      const checkbox = form.querySelector('input[type="checkbox"]');

      if (!name || !mobile || !captchaInput) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
      }

      if (captchaInput !== actualCaptcha) {
        formMessage.textContent = "Captcha does not match.";
        formMessage.style.color = "red";
        return;
      }

      if (checkbox && !checkbox.checked) {
        formMessage.textContent = "Please agree to the terms.";
        formMessage.style.color = "red";
        return;
      }

      formMessage.textContent = "Thank you! Your appointment request has been submitted.";
      formMessage.style.color = "green";
      form.reset();
    });
  });

  // === SAFETY CARD ANIMATION ON SCROLL ===
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "translateY(0)";
          entry.target.style.opacity = 1;
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => {
    card.style.transform = "translateY(50px)";
    card.style.opacity = 0;
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });

  // === GOOGLE REVIEWS SLIDER (Auto-show 1 at a time) ===
  const reviews = document.querySelectorAll(".review-card");
  let reviewIndex = 0;

  if (reviews.length > 1) {
    function showNextReview() {
      reviews.forEach((r, i) => {
        r.style.display = i === reviewIndex ? "block" : "none";
      });
      reviewIndex = (reviewIndex + 1) % reviews.length;
    }

    showNextReview();
    setInterval(showNextReview, 4000);
  }

  // === CITY SELECTION EFFECT (Click to highlight) ===
  const cities = document.querySelectorAll(".city");

  cities.forEach((city) => {
    city.addEventListener("click", () => {
      cities.forEach((c) => c.classList.remove("selected"));
      city.classList.add("selected");
    });
  });

  // === FAQ TOGGLE ===
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});
