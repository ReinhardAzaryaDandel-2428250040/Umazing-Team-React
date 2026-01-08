Umazing Team (Vite + React + Tailwind + Framer Motion)

Quick start (pnpm):

```bash
pnpm create vite umazing-team --template react
cd umazing-team
pnpm install
pnpm install tailwindcss postcss autoprefixer framer-motion
npx tailwindcss init -p
# (ensure tailwind.config.js contains './index.html' and './src/**/*.{js,jsx}')
pnpm dev
```

Or when using the provided files in this folder:

```bash
# from c:/Users/user1/Downloads/Reinhard/React
pnpm install
pnpm dev
```

This scaffold includes:
- `src/components/Navbar.jsx`
- `src/sections/Home.jsx`
- `src/sections/Character.jsx`
- `src/sections/Predict.jsx`
- `src/App.jsx` and `src/main.jsx`

Character data is fetched from `https://uma-api-chi.vercel.app/`.

Environment and Prediction API
-----------------------------

To enable the image prediction feature in `src/sections/Predict.jsx`, create a `.env` file in the project root with the variable `VITE_PREDICT_URL` pointing to your prediction endpoint. The form sends a POST `FormData` with the field name `image`.

Example `.env` (do not commit your real keys):

```
VITE_PREDICT_URL=http://localhost:5000/predict
```

Expected API response
---------------------

The component expects the endpoint to return JSON. A minimal response shape is:

```
{ "result": "predicted-label-or-data" }
```

If `VITE_PREDICT_URL` is not set the app will fallback to a demo response.
