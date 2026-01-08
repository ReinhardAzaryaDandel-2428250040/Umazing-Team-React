Predict section (src/sections/Predict.jsx)

Overview

- Modern, theme-consistent UI for image-based prediction.
- Includes: image upload, preview, predict button with loading state, and result area with simple animation.
- Uses existing theme (`hero-bg`, gradients) and `framer-motion` for subtle animations.

How to run locally

1. Install deps (if not already):

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open http://localhost:5173 or the port Vite suggests (5174) and navigate to the Predict page.

API / Demo behavior

- The component reads `VITE_PREDICT_URL` from environment variables (in `.env`):

```env
VITE_PREDICT_URL=https://your-predict-api.example.com/predict
```

- If `VITE_PREDICT_URL` is not set the component falls back to a demo response (suitable for UI testing).
- The component sends a `FormData` with key `image` to the endpoint and expects JSON back. The UI will show the raw JSON or `data.result` if present.

Accessibility & Notes

- File input is accessible (label + hidden input).
- Buttons have disabled state and loading indicator.
- Result area shows formatted JSON; you can adapt rendering logic to match your real API contract.

Next steps (optional)

- Wire the real prediction API and map the returned fields to a friendly result UI.
- Add client-side image validation (size/dimensions) if desired.
- Add unit / integration tests for the upload flow.
