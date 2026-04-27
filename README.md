# Open Project Inventory

Inventory dashboard with a React frontend and an Express backend API.

## Module 5 Deployment Outputs

- Frontend URL (Vercel/Netlify): `REPLACE_WITH_FRONTEND_URL`
- Backend URL (Render): `REPLACE_WITH_BACKEND_URL`

## Local Run

### 1) Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Deploy Backend (Render)

1. Create a new **Web Service** from this repo.
2. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Deploy and copy your Render URL.
4. Verify endpoints:
   - `GET <BACKEND_URL>/inventory`
   - `POST <BACKEND_URL>/inventory`
   - Optional health check: `GET <BACKEND_URL>/health`

## Deploy Frontend (Vercel or Netlify)

Deploy the `frontend` directory and set:

- Environment variable: `VITE_API_BASE_URL=<BACKEND_URL>`

Recommended settings:

- Build command: `npm run build`
- Publish directory: `dist`

After deploy, verify:

1. Dashboard loads at public URL.
2. Inventory list loads from deployed backend.
3. Add Item form creates a new item via deployed backend.

## Notes

- In local development, the frontend uses Vite proxy for `/inventory`.
- In production, the frontend uses `VITE_API_BASE_URL`.
- Backend CORS is enabled to allow hosted frontend requests.
