const ctaButton = document.getElementById("ctaButton");
const testimonialContainer = document.getElementById("testimonialContainer");

const ctaVariants = [
  "Schedule Demo",
  "See how Erina flags NCUA risks",
  "Get your NCUA readiness assessment",
];

function applyCtaVariant() {
  if (!ctaButton) return;

  const randomIndex = Math.floor(Math.random() * ctaVariants.length);
  const selectedVariant = ctaVariants[randomIndex];

  ctaButton.textContent = selectedVariant;
  console.log("CTA Variant Shown:", selectedVariant);
}

function trackPrimaryCtaClick() {
  if (!ctaButton) return;

  ctaButton.addEventListener("click", () => {
    console.log("CTA Clicked");
  });
}

async function loadTestimonials() {
  try {
    const response = await fetch("testimonials.json");
    if (!response.ok) {
      throw new Error("Unable to load testimonials");
    }

    const testimonials = await response.json();

    if (!testimonialContainer || !Array.isArray(testimonials)) return;

    testimonials.forEach((item) => {
      const card = document.createElement("article");
      card.className = "testimonial-card";
      card.innerHTML = `
        <p class="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</p>
        <p class="testimonial-quote">"${item.quote}"</p>
        <p class="testimonial-meta">${item.role}, ${item.institution}</p>
      `;
      testimonialContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Testimonial load error:", error);
  }
}

applyCtaVariant();
trackPrimaryCtaClick();
loadTestimonials();
