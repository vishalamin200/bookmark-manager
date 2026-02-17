# 📌 Bookmark Manager

A full-stack, real-time bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users can authenticate with Google, add private bookmarks, and see real-time updates across multiple tabs — without refreshing the page.

---

## 🚀 Live Demo

- 🌍 **Live URL:** https://bookmark-manager-vishal.vercel.app 
- 📂 **Repository:** https://github.com/vishalamin200/bookmark-manager

---

## ✨ Features

- 🔐 Google OAuth Authentication
- ➕ Add bookmarks (Title + URL)
- 🗑 Delete bookmarks
- 🔒 Private bookmarks per user
- ⚡ Real-time updates across tabs

- 📱 Responsive design


---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Supabase
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Realtime Subscriptions

### Deployment
- Vercel

---

## 🏗 Architecture Overview

- Authentication handled via Supabase Google OAuth.
- Bookmarks stored in PostgreSQL.
- Row Level Security ensures users can only access their own bookmarks.

- React state updates instantly when database changes occur.

---

## 🔐 Database Schema

### Table: `bookmarks`

| Column      | Type      | Description |
|------------|-----------|-------------|
| id         | uuid      | Primary Key |
| user_id    | uuid      | References `auth.users(id)` |
| title      | text      | Bookmark title |
| url        | text      | Bookmark URL |
| created_at | timestamp | Auto-generated timestamp |

---




## 🛠 Local Development Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/vishalamin200/bookmark-manager
cd bookmark-manager

```

### 2️⃣ Install Dependencies

```bash
npm install

```

### 3️⃣ Create Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

```

### 4️⃣ Run Development Server

```bash
npm run dev

```

Visit: [http://localhost:3000]()

---


## 📁 Project Structure

```plaintext
src/
 ├── app/
 │    ├── page.tsx            # Main application entry
 │    ├── auth/
 │    │    └── callback/      # OAuth redirect handler
 ├── components/
 │    ├── AddBookmark.tsx     # Form to create bookmarks
 │    ├── BookmarkList.tsx    # Real-time list component
 ├── lib/
 │    └── supabaseClient.ts   # Supabase client configuration
 ├── types/
 │    └── index.ts            # TypeScript interfaces

```

---



## 📄 License

This project is built for assessment purposes.

