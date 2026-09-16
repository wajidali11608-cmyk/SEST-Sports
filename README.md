# SEST Sports Week 2026 — Jamia Hamdard

> **RISE ABOVE • REIGN SUPREME**  
> The official web application for **SEST Sports Week 2026**, School of Engineering Sciences & Technology (SEST), Jamia Hamdard, New Delhi.

---

## Key Features

### 1. Dynamic Multi-Sport Registration (`/register`)
- **Badminton Specialization**:
  - Selection for **Gender Category** (Men / Women) and **Match Format** (Singles ₹200 / Doubles ₹300 total).
  - Collects details directly for Player 1 (and Player 2 for Doubles) without redundant team or captain fields.
- **Team Sports (Cricket, Football, Volleyball, Basketball)**:
  - Asks for Captain details and automatically populates the **Captain as Player #01** in the Squad Roster.

### 2. Interactive Floating Helpline Bot
- Continuously visible at the bottom-right of the screen across all pages.
- **Form Assistance Helpline**: Direct helpline call links for instant registration and payment support.
- **Student Lead Coordinators**:
  - **Md Armaan Saifi** (Student Lead)
  - **Umme Hani** (Student Lead)

### 3. Payment Screenshot Verification & Download
- Instant UPI QR code scan display.
- Uploaded payment screenshots are converted to high-resolution previews.
- Full-size view and 1-click image download inside the Admin Dashboard.

### 4. Protected Admin Dashboard (`/admin`)
- Secured via environment variable (`NEXT_PUBLIC_ADMIN_PASSWORD`).
- Filter registrations by **Sport** or **Status** (Confirmed / Pending / Rejected).
- Real-time search by Team Name, Captain, Registration ID, or Enrollment Number.
- 1-Click **CSV Export** for offline roster management.

### 5. Real-Time Dual-Tab Google Sheets Integration
Automatically syncs entries to Google Sheets into 2 separate tabs:
1. **`Teams Overview`** (Tab 1): Unique team summary rows with payment proof status.
2. **`All Players`** (Tab 2): Individual row entries for every registered player with team mapping.

---

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19 & TypeScript
- **Styling**: Vanilla CSS & Tailwind CSS (Custom Neo-Brutalist Design System)
- **Icons**: Lucide React
- **Backend Sync**: Google Apps Script Web App API

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/wajidali11608-cmyk/SEST-Sports.git
cd SEST-Sports
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (`.env.local`)
Create a `.env.local` file in the root directory:

```env
# Google Sheets Apps Script Web App Deployment URL
NEXT_PUBLIC_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

# Admin Dashboard Access Passkey
NEXT_PUBLIC_ADMIN_PASSWORD="your_admin_password_here"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Event Specifications

- **Dates**: 5 to 7 October 2026
- **Venue**: Sports Complex, Jamia Hamdard, New Delhi
- **Disciplines**: Cricket, Football, Badminton, Volleyball, Basketball

---

## Organizing Committee

### Teacher Coordinators (Faculty Conveners)
- **Dr. Bhavya Alankar**
- **Dr. Safdar Tanveer**
- **Mr. Tabish Mufti**

### Student Lead Coordinators
- **Md Armaan Saifi**
- **Umme Hani**

### Registration Helpdesk
- **Form Assistance Helpline**

---

## License
Designed & Developed for **School of Engineering Sciences & Technology (SEST), Jamia Hamdard**. All Rights Reserved © 2026.
