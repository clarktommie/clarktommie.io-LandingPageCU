# Credit Union Landing Page

Static landing pages for credit union outreach, including a dedicated `/credit-unions` path.

## Run Locally

1. Open a terminal and go to the project folder:
```bash
cd "/home/tclark/Data Science/RIskInMind/LandingPage"
```

2. Start a local web server:
```bash
python -m http.server
```

3. Open either page in your browser:
```text
http://localhost:8000/
http://localhost:8000/credit-unions/
```

## Implemented Sections

- Hero messaging: `AI-Powered Compliance for Credit Unions`
- Credit union stats section with provided claims
- CECL payoff calculator using only user-entered inputs
- Dynamic testimonial carousel fed by `testimonials.json`
- Streamlined `Schedule Demo` form for regulatory users

## Testimonials Data

`testimonials.json` is intentionally empty until verified CU peer results are available.

Expected item format:

```json
[
  {
    "quote": "...",
    "role": "...",
    "institution": "..."
  }
]
```

When empty, the page shows a no-data message instead of fabricated results.

## Deployment

- GitHub Pages compatible (static HTML/CSS/JS only)
- No backend required
- No external JavaScript dependencies required
