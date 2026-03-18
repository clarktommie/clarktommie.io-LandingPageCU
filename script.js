const testimonialContainer = document.getElementById("testimonialContainer");
const testimonialStatus = document.getElementById("testimonialStatus");
const heroHeadline = document.getElementById("heroHeadline");
const ctaButton = document.getElementById("ctaButton");

const calculatorForm = document.getElementById("ceclCalculatorForm");
const monthlyHoursInput = document.getElementById("monthlyHours");
const hourlyCostInput = document.getElementById("hourlyCost");
const reductionPercentInput = document.getElementById("reductionPercent");
const calculatorResults = document.getElementById("calculatorResults");

const scheduleDemoForm = document.getElementById("scheduleDemoForm");
const demoFormStatus = document.getElementById("demoFormStatus");

let carouselItems = [];
let carouselIndex = 0;
let rotationTimer = null;

const messagingVariants = [
  {
    headline: "Be Ready Before Your Next NCUA Examination",
    cta: "Schedule Demo",
    logLabel: "Variant A - Compliance Messaging",
  },
  {
    headline: "Detect Loan Portfolio Risk Before It Becomes a Loss",
    cta: "See How Erina Flags NCUA Risk Signals",
    logLabel: "Variant B - Risk Detection Messaging",
  },
  {
    headline: "Automate CECL Workflows and Reduce Manual Risk Reviews",
    cta: "Get Your NCUA Readiness Assessment",
    logLabel: "Variant C - Efficiency Messaging",
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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function renderCarouselItem() {
  if (!testimonialContainer || !testimonialStatus) return;

  testimonialContainer.innerHTML = "";

  if (!carouselItems.length) {
    testimonialContainer.innerHTML =
      '<article class="testimonial-card"><p class="testimonial-quote">Peer outcome snapshots are in progress. We are collaborating with credit union teams and welcome additional feedback.</p></article>';
    testimonialStatus.textContent =
      "In progress: more peer outcomes will be added as credit union partners approve publication.";
    return;
  }

  const item = carouselItems[carouselIndex];
  const card = document.createElement("article");
  card.className = "testimonial-card";
  card.innerHTML = `
    <p class="testimonial-quote">"${item.quote}"</p>
    <p class="testimonial-meta">${item.role}, ${item.institution}</p>
  `;
  testimonialContainer.appendChild(card);

  testimonialStatus.textContent = `Peer result ${carouselIndex + 1} of ${carouselItems.length}`;
}

function startTestimonialsRotation() {
  if (rotationTimer) {
    clearInterval(rotationTimer);
    rotationTimer = null;
  }

  if (carouselItems.length <= 1) return;

  rotationTimer = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
    renderCarouselItem();
  }, 7000);
}

async function loadTestimonials() {
  const source = document.body.dataset.testimonialsSrc || "testimonials.json";

  try {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error("Unable to load testimonials data");
    }

    const testimonials = await response.json();
    if (!Array.isArray(testimonials)) {
      throw new Error("Testimonials file must be an array");
    }

    carouselItems = testimonials.filter((item) => {
      return (
        item &&
        typeof item.quote === "string" &&
        item.quote.trim() &&
        typeof item.role === "string" &&
        item.role.trim() &&
        typeof item.institution === "string" &&
        item.institution.trim()
      );
    });

    carouselIndex = 0;
    renderCarouselItem();
    startTestimonialsRotation();
  } catch (error) {
    if (!testimonialContainer || !testimonialStatus) return;

    testimonialContainer.innerHTML =
      '<article class="testimonial-card"><p class="testimonial-quote">Peer outcome snapshots are in progress. We are collaborating with credit union teams and welcome additional feedback.</p></article>';
    testimonialStatus.textContent =
      "In progress: peer outcomes will appear here as they are approved for sharing.";
    console.error(error);
  }
}

function setupCalculator() {
  if (!calculatorForm || !calculatorResults) return;

  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const monthlyHours = Number(monthlyHoursInput.value);
    const hourlyCost = Number(hourlyCostInput.value);
    const reductionPercent = Number(reductionPercentInput.value);

    if (
      !Number.isFinite(monthlyHours) ||
      !Number.isFinite(hourlyCost) ||
      !Number.isFinite(reductionPercent)
    ) {
      calculatorResults.textContent = "Enter valid numeric values in all fields.";
      return;
    }

    if (monthlyHours < 0 || hourlyCost < 0 || reductionPercent < 0 || reductionPercent > 100) {
      calculatorResults.textContent = "Use non-negative values and a reduction between 0 and 100.";
      return;
    }

    const annualHoursSaved = monthlyHours * 12 * (reductionPercent / 100);
    const annualCostSaved = annualHoursSaved * hourlyCost;

    calculatorResults.innerHTML = `
      <p><strong>Estimated annual hours saved:</strong> ${annualHoursSaved.toFixed(1)} hours</p>
      <p><strong>Estimated annual labor savings:</strong> ${formatCurrency(annualCostSaved)}</p>
    `;
  });
}

function setupDemoForm() {
  if (!scheduleDemoForm || !demoFormStatus) return;

  scheduleDemoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    demoFormStatus.textContent =
      "Request captured locally. Use the link below to open RiskInMind in a new tab.";
  });
}

setupCalculator();
setupDemoForm();
applyMessagingVariant();
loadTestimonials();
