const heroHeadline = document.getElementById("heroHeadline");
const ctaButton = document.getElementById("ctaButton");
const testimonialContainer = document.getElementById("testimonialContainer");

const messagingVariants = [
  {
    headline: "Be Ready Before Your Next NCUA Examination",
    cta: "Schedule Demo",
    logLabel: "Variant A – Compliance Messaging",
  },
  {
    headline: "Detect Loan Portfolio Risk Before It Becomes a Loss",
    cta: "See How Erina Flags NCUA Risk Signals",
    logLabel: "Variant B – Risk Detection Messaging",
  },
  {
    headline: "Automate CECL Workflows and Reduce Manual Risk Reviews",
    cta: "Get Your NCUA Readiness Assessment",
    logLabel: "Variant C – Efficiency Messaging",
  },
];

function applyMessagingVariant() {
  if (!heroHeadline || !ctaButton) return;

  const randomIndex = Math.floor(Math.random() * messagingVariants.length);
  const selectedVariant = messagingVariants[randomIndex];

  heroHeadline.textContent = selectedVariant.headline;
  ctaButton.textContent = selectedVariant.cta;
  console.log(selectedVariant.logLabel);
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

applyMessagingVariant();
trackPrimaryCtaClick();
loadTestimonials();
