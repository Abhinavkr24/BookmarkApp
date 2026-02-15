# BookmarkApp

A full-stack real-time Bookmark Manager built with Next.js and Supabase, deployed on Vercel.

Users can authenticate with Google, add bookmarks, and see real-time updates without refreshing the page.

---

## Tech Stack

- Frontend: Next.js (App Router)
- Backend & Database: Supabase
- Authentication: Google OAuth (Supabase)
- Deployment: Vercel
- Styling: Tailwind CSS

---

## Features

- Google Authentication
- Add Bookmarks
- Delete Bookmarks
- Real-time Updates
- Row Level Security (RLS)

---

## Deployed URL

https://bookmark-app-two-black.vercel.app/

---

## Major Issues Faced & Resolution

### 1. Realtime Not Updating After Insert

**Issue:**  
After adding a bookmark, it was not appearing instantly. A manual refresh was required.

**Resolution:**  
Identified a realtime issue in the newer version of `@supabase/supabase-js`.  
Downgraded to a stable version and reinstalled dependencies.  
Realtime updates started working correctly.

---

### 2. Realtime Delete Not Working

**Issue:**  
Delete operation worked in the database, but UI was not updating in realtime.

**Resolution:**  
After downgrading Supabase, existing RLS policies were not functioning correctly.  
Rewrote and reapplied the required RLS policies, including DELETE policy.  

Additionally, improved frontend stability by refetching bookmarks inside the realtime listener instead of manually mutating state.

After these fixes, delete events triggered correctly and UI updated instantly.

---

