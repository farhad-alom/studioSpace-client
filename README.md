# 🎬 StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**StudioSpace** is a full-stack marketplace where creators—photographers, filmmakers, podcasters, musicians, and artists—can discover, filter, and book professional creative studios by the hour. Studio owners can list, update, and manage their own spaces with booking management.

---

## 🔗 Important Links

- **Live Site (Client):** [StudioSpace Client](https://studio-space-client-five.vercel.app)
- **Live API (Server):** `https://studiospace-server-alpha.vercel.app/`
- **Client Repository:** `https://github.com/farhad-alom/studioSpace-client`
- **Server Repository:** `https://github.com/farhad-alom/studioSpace-serverE`

---

## ✨ Key Features

- **Explore & Book Studios** — Search by title or location, filter by category (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop), and book studios with date and time-slot selection plus live hourly price calculation.
- **Secure JWT Authentication (HTTPOnly Cookie)** — Email/password authentication, Google social login, and registration with password rules (uppercase letter, lowercase letter, and at least 6 characters). The Better Auth JWT session is stored in an **HTTPOnly cookie**. Protected APIs reject unauthorized requests with **401 Unauthorized**.
- **Full Studio CRUD with Ownership Protection** — Authenticated hosts can add studios (with imgbb image upload), edit pre-filled forms, and delete listings with a confirmation modal. The server verifies ownership for updates and deletions.
- **Smart Booking System with Double-Booking Prevention** — New bookings are saved with `Pending` status and display `Pending`, `Confirmed`, `Completed`, or `Cancelled` statuses. Before saving a reservation, the server checks for time overlaps with existing `Confirmed` bookings and rejects conflicts with a clear error.
- **Interactive Hero Slider & Dynamic Home Page** — A Swiper.js slider with three slides, dynamically fetched featured studios (the six newest), clickable category cards that link to pre-filtered results, plus “How Booking Works” and “Host Guarantee” sections.
- **Dark / Light Theme Toggle** — One-click full-system theme switching, persisted in `localStorage` and respecting the system preference on first visit.
- **Modern UX** — Skeleton loaders during data fetching, friendly empty states with calls to action, custom confirmation modals (no default browser `alert()`), and Sonner toast notifications for authentication, CRUD, and booking actions.
- **Fully Responsive** — Mobile, tablet, and desktop layouts with a sticky navbar, active-route indicators, mobile sheet menu, and user avatar dropdown (Dashboard, Add New Studio, My Listings, My Bookings, Logout).

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | **Next.js 16 (App Router)**, React 19, TypeScript |
| UI & Styling | Tailwind CSS v4, shadcn/ui, Lucide, React Icons |
| State / Data Fetching | React Hooks, Fetch API (`credentials: "include"`) |
| Authentication | **Better Auth** (MongoDB adapter), **JWT plugin**, Google OAuth |
| Backend | **Express.js 5**, Node.js, ES Modules |
| Database | **MongoDB** (native driver), `StudioCollection`, `BookingCollection` |
| Image Storage | imgbb API |
| Notifications | Sonner |
| Slider | Swiper.js |
| Hosting | Vercel (client and server) |

---

## 🔐 Security Notes (Challenge Implementations)

1. **JWT in HTTPOnly Cookie** — The following endpoints are protected by authentication middleware that validates the Better Auth JWT session cookie and returns **401 Unauthorized** for anonymous users:
   - `POST /api/studios`
   - `PUT /api/studios/:id`
   - `DELETE /api/studios/:id`
   - `POST /api/bookings`
   - `GET /api/my-bookings`
   - `GET /api/my-studios`
   - `PATCH /api/bookings/:id/cancel`
2. **Double-Booking Prevention** — Before saving a reservation, the server checks for overlapping slots using the condition `startTime < requestedEnd && endTime > requestedStart`, considering bookings with `Confirmed` status. Conflicting requests are rejected with an HTTP **409 Conflict** response.
3. **Ownership Checks** — Users can only edit or delete their own studios and cancel their own bookings. Unauthorized ownership attempts are rejected.

---

## 🗺️ Pages & Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Hero slider, featured studios, categories, How It Works, Host Guarantee |
| `/studios` | Public | Explore studios with search and category filters |
| `/studios/[id]` | Public | Studio details, gallery, amenities, host information, and booking modal |
| `/login` | Public | Email/password and Google login |
| `/register` | Public | Account creation with password validation |
| `/add-studio` | Private | Create a studio listing with imgbb image upload |
| `/studios/edit/[id]` | Private | Update an owned studio using a pre-filled form |
| `/my-listings` | Private | Manage owned studio listings (update/delete) |
| `/my-bookings` | Private | View bookings, status badges, and cancel pending bookings |
| `/about-us` | Public | About the platform |

---

## ⚙️ Run Locally

### Prerequisites

- Node.js 20 or newer and npm
- A MongoDB database (local or MongoDB Atlas connection string)
- An imgbb API key ([Get an API key](https://api.imgbb.com))
- Google OAuth Client ID and Secret (optional; required only for Google social login)

### 1. Server Setup

Clone the server repository and install dependencies:

```bash
git clone PASTE_SERVER_GITHUB_REPO_LINK_HERE
cd server
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
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

The server should run at `http://localhost:5000` (assuming the configured port is `5000`).

### 2. Client Setup

Clone the client repository and install dependencies:

```bash
git clone PASTE_CLIENT_GITHUB_REPO_LINK_HERE
cd client
npm install
```

Create a `.env.local` file in the client root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

Start the client:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Examiner Test Credentials

Use the account below to test login and private pages (Add Studio, My Listings, and My Bookings):

| Role | Email | Password |
| --- | --- | --- |
| General User | `PASTE_TEST_EMAIL_HERE` | `PASTE_TEST_PASSWORD_HERE` |

You can also register a new account. Passwords must contain at least one uppercase letter, one lowercase letter, and at least six characters. Google login is available when OAuth credentials are configured.

---

## 📄 Submission Checklist

- [ ] Client and server GitHub repositories submitted
- [ ] Live client website deployed and accessible
- [ ] Live API URL added to this README
- [ ] Client and server repository URLs added
- [ ] Private routes reload without errors and preserve authenticated sessions
- [ ] No Lorem Ipsum text
- [ ] No default browser `alert()`; use Sonner toasts and custom modals
- [ ] At least 15 notable client-side commits
- [ ] At least 8 notable server-side commits

---

© 2026 StudioSpace. All rights reserved.
