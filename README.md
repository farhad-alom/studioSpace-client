# 🎬 StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**StudioSpace** is a full-stack marketplace where photographers, filmmakers, podcasters, musicians and artists can discover, filter and book professional creative studios by the hour. Studio owners can list, update and manage their own spaces.

---

## 🔗 Important Links

- **Live Site (Client):** [StudioSpace Client](https://studio-space-client-five.vercel.app)
- **Live API (Server):** https://studiospace-server-alpha.vercel.app/
- **Client Repository:** https://github.com/farhad-alom/studioSpace-client
- **Server Repository:** https://github.com/farhad-alom/studioSpace-server

---

## ✨ Key Features

- **Explore & Book Studios** — Search by title or location, filter by category (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop), and book with date, time slot and live hourly price calculation.
- **Secure Authentication** — Email/password and Google login using Better Auth with a JWT session stored in an **HTTPOnly cookie**. Password rules: at least 6 characters, one uppercase and one lowercase letter.
- **Route Protection (proxy.ts)** — Private routes redirect unauthenticated users to `/login` before the page renders. Logged-in users are redirected away from `/login` and `/register`.
- **Full Studio CRUD with Ownership Protection** — Add studios (imgbb image upload), edit with a pre-filled form, and delete with a confirmation modal. The server verifies ownership.
- **Smart Booking System** — Bookings start as `Pending` and can become `Confirmed`, `Completed` or `Cancelled`. The server blocks time overlaps with existing `Confirmed` bookings.
- **Dashboard** — Personal activity stats and quick action links.
- **Dynamic Home Page** — Swiper.js hero slider, six newest featured studios, clickable category cards, "How It Works" and "Host Guarantee" sections.
- **Dark / Light Theme** — One-click theme toggle, saved in `localStorage` and respecting the system preference on first visit.
- **PDF Invoice Generator** — Confirmed and Completed bookings get a "Download Invoice" button that creates a PDF receipt (jsPDF) fully on the client.
- **Modern UX** — Skeleton loaders, friendly empty states, custom confirmation modals and Sonner toast notifications.
- **Fully Responsive** — Mobile, tablet and desktop layouts with a sticky navbar, mobile sheet menu and user avatar dropdown.

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI & Styling | Tailwind CSS v4, shadcn/ui, Lucide, React Icons |
| Authentication | Better Auth (MongoDB adapter, JWT plugin), Google OAuth |
| Backend | Express.js 5, Node.js, ES Modules |
| Database | MongoDB (native driver) |
| Image Storage | imgbb API |
| Notifications | Sonner |
| Slider | Swiper.js |
| PDF | jsPDF |
| Hosting | Vercel (client and server) |

---

## 🔐 Security Notes

1. **JWT in HTTPOnly Cookie** — These endpoints use authentication middleware and return **401 Unauthorized** for anonymous users:
   - `POST /api/studios`
   - `PUT /api/studios/:id`
   - `DELETE /api/studios/:id`
   - `GET /api/my-studios`
   - `POST /api/bookings`
   - `GET /api/my-bookings`
   - `PATCH /api/bookings/:id/cancel`
   - `PATCH /api/bookings/:id/confirm`
   - `GET /api/dashboard/stats`
2. **Double-Booking Prevention** — Before saving, the server checks `startTime < requestedEnd && endTime > requestedStart` against `Confirmed` bookings and returns **409 Conflict** on a clash.
3. **Ownership Checks** — Users can only edit or delete their own studios and manage their own bookings.
4. **Route Protection** — `proxy.ts` guards private pages on the server side, and `PrivateRoute` acts as a second layer on the client.

---

## 🗺️ Pages & Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Hero slider, featured studios, categories, How It Works, Host Guarantee |
| `/studios` | Public | Explore studios with search and category filters |
| `/studios/[id]` | Public | Studio details, gallery, amenities, host info and booking modal |
| `/about-us` | Public | About the platform |
| `/login` | Public | Email/password and Google login |
| `/register` | Public | Account creation with password validation |
| `/dashboard` | Private | Activity stats and quick actions |
| `/add-studio` | Private | Create a studio listing |
| `/studios/edit/[id]` | Private | Update an owned studio |
| `/my-listings` | Private | Manage owned listings (update/delete) |
| `/my-bookings` | Private | View bookings, confirm, cancel and download invoices |

---

## ⚙️ Run Locally

### Prerequisites

- Node.js 20 or newer and npm
- A MongoDB database (local or Atlas)
- An imgbb API key ([get one here](https://api.imgbb.com))
- Google OAuth Client ID and Secret (only needed for Google login)

### 1. Server Setup

```bash
git clone https://github.com/farhad-alom/studioSpace-server
cd studioSpace-server
npm install
```

Create a `.env` file in the server root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the server (runs at `http://localhost:5000`):

```bash
npm run dev
```

### 2. Client Setup

```bash
git clone https://github.com/farhad-alom/studioSpace-client
cd studioSpace-client
npm install
```

Create a `.env.local` file in the client root:

```env
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

> Do **not** set `NEXT_PUBLIC_API_URL`. All API calls use relative `/api/...` URLs that `next.config.ts` rewrites to the backend, which keeps requests same-origin so the session cookie is always sent.

To use your local server, change the rewrite destination in `next.config.ts` to `http://localhost:5000/api/:path*`.

Start the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 👤 Examiner Test Credentials

| Role | Email | Password |
| --- | --- | --- |
| General User | `Ten@gmail.com` | `Ten@gmail.com` |

You can also register a new account. Google login works when OAuth credentials are configured.

---

© 2026 StudioSpace. All rights reserved.