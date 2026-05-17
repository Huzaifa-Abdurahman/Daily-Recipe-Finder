# AI-Based Recipe Finder System

A full-stack semester project using Next.js 16 App Router, TypeScript, PostgreSQL, Prisma ORM, Neon PostgreSQL, and Vercel.

## Description
This project allows users to enter ingredients they have at home, and the system matches them against recipes in a PostgreSQL database. It displays recipes that have an 80% or greater ingredient match. Additionally, the project uses the OpenAI API to enhance recipes with better descriptions and professional cooking tips.

## Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## Setup Instructions

1. **Clone or Download the Project**
   Make sure you are in the project folder (`recipe-finder`).

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Configuration (Neon PostgreSQL)**
   - Create a project on [Neon.tech](https://neon.tech/) and copy your connection string.
   - Rename `.env.example` to `.env` (or create a new `.env` file).
   - Add your connection string and OpenAI API Key to the `.env` file:
     ```env
     DATABASE_URL="postgresql://user:password@ep-cool-db.us-east-2.aws.neon.tech/neondb?sslmode=require"
     OPENAI_API_KEY="your-openai-api-key"
     ```

4. **Initialize Prisma and Push Schema**
   Run the following commands to set up your tables:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the Database**
   Populate your database with 20 sample recipes and ingredients:
   ```bash
   node prisma/seed.js
   ```

6. **Run the Application Locally**
   Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Search recipes using comma-separated ingredients.
- Matching algorithm based on ingredient percentage.
- View cooking steps and recipe details.
- "Enhance Recipe" button uses OpenAI to provide cooking tips and improvements.

## Folder Structure
- `app/`: Next.js frontend pages and layouts.
- `app/api/`: Backend Next.js API routes (`/search` and `/enhance`).
- `components/`: Reusable React components (SearchBar, RecipeCard).
- `lib/`: Database and utility functions (`db.ts`).
- `prisma/`: Prisma schema and seed scripts.
"# Daily-Recipe-Finder" 
