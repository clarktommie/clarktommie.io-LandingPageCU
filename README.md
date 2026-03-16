# Credit Union Landing Page

Static landing page for credit-union outreach with a client-side A/B messaging experiment.

## Run Locally

1. Open a terminal and go to the project folder:
```bash
cd "/home/tclark/Data Science/RIskInMind/LandingPage"
```

2. Start a local web server:
```bash
python -m http.server
```

3. Open the page in your browser:
```text
http://localhost:8000
```

## A/B Messaging Experiment

On each page load, `script.js` randomly selects one of three variants and updates:
- Hero headline (`#heroHeadline`)
- Primary CTA button text (`#ctaButton`)

Variants:
- Variant A (Compliance): `Be Ready Before Your Next NCUA Examination` / `Schedule Demo`
- Variant B (Risk Detection): `Detect Loan Portfolio Risk Before It Becomes a Loss` / `See How Erina Flags NCUA Risk Signals`
- Variant C (Efficiency): `Automate CECL Workflows and Reduce Manual Risk Reviews` / `Get Your NCUA Readiness Assessment`

The selected variant is logged in the browser console (example: `Variant A – Compliance Messaging`).

## Deployment

- GitHub Pages compatible (static HTML/CSS/JS only)
- No backend required
- No external JavaScript dependencies required

## Stop the Server

1. In the same terminal where the server is running, press:
```text
Ctrl + C
```

## Project Files

- `index.html`
- `styles.css`
- `script.js`
- `testimonials.json`
