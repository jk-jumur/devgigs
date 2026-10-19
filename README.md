markdown
# DevGigs — Developer Freelance Marketplace 🚀

A premium, fullstack marketplace built with **Next.js 14 (App Router)** where elite developers can post their tech gigs and clients can find the perfect match. 

This project focuses on a **polished UI, responsiveness, and industry-standard architecture**, featuring a custom "Midnight & Amber" theme with full dark mode support.

## 🔥 Key Features

- **Modern UI/UX:** Custom "Midnight & Amber" theme with a sleek, responsive design (Mobile, Tablet, Desktop).
- **Dark / Light Mode:** Fully functional theme toggle using a custom React Context.
- **Smooth Animations:** Powered by **Framer Motion** for staggered section loading, hover effects, and page transitions.
- **Authentication (Firebase):** Secure Email/Password and Google Login. User state is managed globally using React Context API.
- **Landing Page Sections:** Hero, Features, Categories, Featured Gigs, How It Works (with Testimonials), and CTA.
- **Browse & Filter:** Search gigs by title/skills, filter by Category and Budget, all handled dynamically on the client side.
- **Dynamic API Routes:** Full CRUD operations via Next.js API routes (`/api/gigs`).
- **Protected Routes:** `Add Gig` and `Manage Gigs` pages are strictly accessible only to logged-in users.
- **Interactive Dashboard:** Manage your gigs, view details, and delete them with a custom confirmation modal.
- **Loading States:** Skeleton loaders, animated spinners, and top-loading bars for a smooth user experience.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Authentication:** Firebase Auth (Email/Password, Google)
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Animations:** Framer Motion
- **Forms & Validation:** React Hook Form, Zod
- **Notifications:** Sonner (Toasts)
- **Data Fetching:** Next.js API Routes (Mock Data Layer)

## 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd devgigs
Install dependencies:

bash
npm install
Environment Variables:
Create a .env.local file in the root directory and add your Firebase config:

env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Run the development server:

bash
npm run dev
Open http://localhost:3000 with your browser.

🗺️ Route Summary
Route	Access	Description
/	Public	Landing page (7 sections)
/items	Public	Browse all gigs with search & filters
/items/[id]	Public	Gig details with sticky hire card & related gigs
/about	Public	About DevGigs
/login	Public	Login & Registration (Email/Google)
/items/add	🔒 Protected	Form to post a new gig
/items/manage	🔒 Protected	Table view to manage & delete gigs
/careers	Public	Careers page with job listings
/privacy	Public	Privacy Policy
/terms	Public	Terms of Service
/api/gigs	—	GET + POST API routes
🌐 Live Demo
[Insert your Vercel Live Link Here]