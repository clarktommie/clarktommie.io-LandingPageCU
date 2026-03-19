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
- CECL payoff calculator using user-entered baseline hours and labor cost, with a default 40% reduction assumption drawn from the project brief
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

## CECL Payoff Calculator Method

The project instructions explicitly require a `CECL payoff calculator` but do not prescribe a
formula. The implemented calculator uses a simple labor-savings model tied to the instruction
example that says automated CECL workflows reduced manual data prep by `40%`.

Inputs:

- `Manual CECL prep hours per month`
- `Analyst blended hourly cost (USD)`
- `Reduction in manual prep (%)`

Formulas:

```text
annualManualHours = monthlyHours * 12
annualBaselineLaborCost = annualManualHours * hourlyCost
annualHoursSaved = annualManualHours * (reductionPercent / 100)
projectedAnnualManualHours = annualManualHours - annualHoursSaved
projectedAnnualLaborCost = projectedAnnualManualHours * hourlyCost
annualCostSaved = annualBaselineLaborCost - projectedAnnualLaborCost
```

Interpretation:

- Monthly CECL effort is annualized by multiplying by `12`.
- The entered reduction percentage is applied to annual manual hours.
- Saved hours are converted to labor savings using the entered blended hourly cost.
- The `40%` default reflects the project brief's sample outcome and can be changed by the user.
