# SkillMatrix AI - Employee Skill Mapping & Risk Analysis Platform

[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](#)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](#)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](#)
[![Docker Support](https://img.shields.io/badge/Docker-Supported-2496ed.svg)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](#)

> **SkillMatrix AI** is an enterprise-grade workforce capability intelligence and talent retention platform. It provides automated 5-level technical skill mapping, real-time employee flight and burnout risk modeling, 9-box talent vulnerability heatmaps, and AI-driven precision upskilling recommendations.

---

## 🚀 Key Platform Features

1. **Executive Dashboard**: Real-time KPI telemetry, workforce skill health readiness index, high-flight risk talent alerts, and departmental skill coverage breakdowns.
2. **Employee Skill Directory**: Comprehensive employee roster with multi-criteria filtering (department, risk category, skill tags), grid/table toggles, CSV data export, and dynamic employee profile creation.
3. **9-Box Risk & Attrition Matrix**: Multi-factor flight risk and burnout index evaluation with interactive score sliders and individual driver analysis.
4. **Skill Mapping Matrix**: Standardized 5-level proficiency scale taxonomy (Novice to Expert) comparing current verified capability vs. target role requirements.
5. **Capability Gap Deficiencies**: Track critical technical shortages, business impact ratings, completion target dates, and status workflows (`Open` → `In Training` → `Mitigated`).
6. **AI Retention & Training Recommendations**: Automated upskilling recommendations with 1-click candidate enrollment.
7. **Real-Time Alerts & Notification Center**: Instant triggers for flight risk escalations, certification expirations, and single-point-of-failure warnings.
8. **Macro Analytics & Insights**: Departmental risk exposure and domain competency distribution with export capabilities.
9. **Audit & Compliance Report Generator**: Generate and download SOC 2/ISO compliance audit briefs and executive skill summaries in PDF or CSV formats.
10. **Role-Based Simulation & RBAC**: One-click persona switcher (HR Admin, Department Manager, Team Lead, Employee) with dark/light themes.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 (TypeScript), Vite 5, React Router v6, Lucide Icons, Custom SVG Radar & Trend Visualizations.
- **Backend (Optional / Full-Stack)**: Node.js, Express, Helmet, CORS, TypeScript.
- **Database (Optional / Production)**: PostgreSQL 14/15/16 DDL Schema (`server/src/db/schema.sql`) and Seed Data (`server/src/db/seed.sql`).
- **Resilience**: Zero-fail client-side persistence (LocalStorage + in-memory mock engine) when running as a standalone SPA, with seamless REST API syncing when `VITE_API_BASE_URL` is set.
- **Deployment Targets**: Vercel, Netlify, Render, Cloudflare Pages, AWS ECS/Amplify, Google Cloud Run, Docker.

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm**: v9.x+ (or `pnpm` / `yarn`)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-org/employee-skill-mapping-risk-analysis.git
cd employee-skill-mapping-risk-analysis

# Install frontend dependencies
npm install
```

### 2. Configure Environment
```bash
# Copy example environment configuration
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Production Build & Local Verification

To test the production build locally before deploying:

```bash
# Type check and build optimized static bundle into /dist
npm run build

# Preview the production build locally
npm run preview
```
The preview server will be accessible at: **[http://localhost:4173](http://localhost:4173)**

---

## 🌐 Production Cloud Deployment Guide

This project is configured with zero machine-specific dependencies and can be deployed to any major cloud provider in under 2 minutes.

### Option 1: Vercel (Recommended - Zero Config Static Frontend)
1. Push your repository to GitHub / GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Vercel will automatically detect `vite` settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel uses the bundled `vercel.json` for SPA routing and security headers.

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
2. Select your repository.
3. Build configuration is auto-detected from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

### Option 3: Docker Container Deployment (Any Cloud / VPS)
Build and run the production container locally or on cloud VPS (AWS Lightsail, DigitalOcean, Hetzner, Linode):

```bash
# Build the Docker image
docker build -t skillmatrix-platform:latest .

# Run the container on port 80
docker run -d -p 80:80 --name skillmatrix-app skillmatrix-platform:latest
```
Access at `http://your-server-ip`.

### Option 4: Full-Stack Docker Compose (Frontend + Backend + PostgreSQL)
To launch the entire enterprise ecosystem with PostgreSQL:

```bash
# Start all services in the background
docker-compose up -d --build

# View container status
docker-compose ps
```
- **Frontend SPA**: `http://localhost:80`
- **Backend API & Health Check**: `http://localhost:5000/api/health`
- **PostgreSQL Database**: `localhost:5432`

---

## 🗄️ PostgreSQL Database Configuration

If deploying with an external PostgreSQL instance (AWS RDS, Supabase, Neon, Railway):

1. Provision your PostgreSQL instance and obtain the connection URI.
2. Initialize tables:
   ```bash
   psql "postgresql://user:pass@host:5432/dbname" -f server/src/db/schema.sql
   psql "postgresql://user:pass@host:5432/dbname" -f server/src/db/seed.sql
   ```
3. Set the backend environment variable:
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
   ```

---

## ⚙️ Environment Variables Reference

### Frontend (`.env`)
| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_APP_ENV` | `production` | Environment mode (`development` \| `production`) |
| `VITE_APP_TITLE` | `SkillMatrix AI` | Document header title |
| `VITE_API_BASE_URL` | `""` | Backend API URL (Leave blank for standalone SPA mode) |
| `VITE_ENABLE_MOCK_FALLBACK` | `true` | Enables offline/fallback dataset |
| `VITE_DEMO_MODE` | `true` | Allows instant one-click demo persona switcher |

### Backend (`server/.env`)
| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | HTTP listening port |
| `NODE_ENV` | `production` | Node environment |
| `CORS_ORIGIN` | `*` | Allowed CORS origins (comma-separated or `*`) |
| `DATABASE_URL` | `""` | PostgreSQL connection string |

---

## 🧪 Quality & Cross-Platform Verification

- **Cross-Platform**: Tested and compliant across Windows (PowerShell/CMD), macOS (zsh), and Linux (bash/sh).
- **Responsive Testing**:
  - Desktop (>1440px): 4-column KPI grids, side-by-side matrices.
  - Laptop (1024px - 1440px): Dynamic 2-column layouts.
  - Tablet (768px - 1023px): Collapsible drawer, auto-wrapping cards.
  - Mobile / iPhone / Android (<768px): Hamburger menu drawer with backdrop overlay, single-column KPI stacks, touch-scrollable tables.

---
## 📄 License
MIT License. Developed for the S5 Mini Project 2.
