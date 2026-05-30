# BoostMe Design System

## Vision

BoostMe is an executive self-confidence platform for business leaders and career professionals. The product blends daily habits, career-specific training, guided tools, community support, and measurable growth.

## Tech Stack

- Frontend: Vite + React
- Backend: Supabase (DB, Auth, Storage)
- Deployment: Vercel
- Source Control: GitHub

## Folder Structure

- your-project/
  - DESIGN.md
  - src/main.jsx
  - src/App.jsx
  - src/styles/globals.css
  - src/components/
    - Navbar.jsx
    - Footer.jsx
    - Sidebar.jsx
    - StatsCard.jsx
    - BadgeIcon.jsx
    - ActivityItem.jsx
    - StreakBadge.jsx
    - MetroCard.jsx
    - SocialLoginButton.jsx
    - InputField.jsx
  - src/pages/
    - Home.jsx
    - Dashboard.jsx
    - Challenges.jsx
    - Journal.jsx
    - Progress.jsx
    - Profile.jsx
    - Settings.jsx
    - Login.jsx
    - Register.jsx
    - ForgotPassword.jsx
    - Achievements.jsx
    - Admin.jsx

## Design System

- Primary: #4CAF50
- Secondary: #2196F3
- Accent: #FFC107
- Background: #F5F5F5
- Text: #212121
- Error: #F44336
- Font sizes:
  - Headings: Arial Bold, 24px
  - Body: Arial, 16px
  - Labels: Arial, 14px
- Border radius: 8px
- Base unit: 8px
- Buttons: rectangular with rounded corners, primary color background
- Cards: white background with light drop shadow
- Navigation: bottom menu on mobile, sidebar on desktop

## Data Model

- users
- challenges
- journal_entries
- user_progress
- badges
- user_badges
- user_challenges
- notification_settings

## Permissions

- Regular user: CRUD on personal data only
- Admin: create/update challenges
- Badges generated automatically by system
