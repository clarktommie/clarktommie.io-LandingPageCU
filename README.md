# Credit Union Landing Page

Static landing pages for credit union outreach, including a credit-union-focused landing page.

## Run Locally

1. Open a terminal and go to the project folder:
```bash
cd "project-folder"
```

2. Start a local web server:
```bash

```python -m http.server

3. Open either page in your browser:
```text
http://localhost:8000/
http://localhost:8000/credit-unions/
```

## Implemented Sections

- Hero with A/B-tested messaging (`#heroHeadline`) and CTA copy (`#ctaButton`)
- HubSpot scheduling CTA (HubSpot scheduling link provided by RiskInMind)
- Measured Credit Union Impact section with CECL-focused copy
- CECL Payoff Calculator with default inputs:
  - Monthly prep hours: `30`
  - Blended hourly cost: `85`
  - Manual prep reduction: `40`
- Peer Results section in progress, plus dynamic testimonial carousel from `testimonials.json`

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

Current empty-state messaging reflects that CECL-focused peer benchmarks are in progress.

## Deployment

- GitHub Pages compatible (static HTML/CSS/JS only)
- No backend required
- No external JavaScript dependencies required

## CECL Payoff Calculator Method

The calculator uses a simple annualized labor-savings model.

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
- Defaults are pre-filled as `30 / 85 / 40`.
- Results are initialized on page load using those defaults.

## JavaScript Hooks and IDs

The existing JavaScript expects these IDs and behaviors to remain intact:

- `#heroHeadline` and `#ctaButton` for A/B messaging variants
- `#ceclCalculatorForm`, `#monthlyHours`, `#hourlyCost`, `#reductionPercent`, `#calculatorResults` for calculator logic
- `#testimonialContainer` and `#testimonialStatus` for peer-result carousel/fallback state
