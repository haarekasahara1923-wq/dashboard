# SaaSAuto - Multi-Tenant Automation Platform

A production-ready SaaS platform for Education, Real Estate, and Healthcare industries, featuring robust automation and WhatsApp integration.

## Features

- **Multi-Tenant Architecture**: Data isolation for every client.
- **Industry Specific Dashboards**:
  - **Education**: Admissions, Fees, Attendance, Faculty.
  - **Real Estate**: Leads, Pipeline, Site Visits.
  - **Healthcare**: Appointments, Patients, Doctors.
- **Automation Engine**: Rule-based triggers and actions (WhatsApp first).
- **Billing & Subscriptions**: Integrated with Razorpay.
- **Role-Based Access Control**: Super Admin, Admin, Manager, Staff.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend**: Next.js API Routes, Node.js.
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: NextAuth.js.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/saas-auto.git
   cd saas-auto
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Duplicate `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```
   - Update `DATABASE_URL` with your PostgreSQL connection string.
   - Generate a `NEXTAUTH_SECRET`.

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to view the application.

## Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the environment variables from your `.env` file to Vercel's project settings.
4. Deploy!

## License

[MIT](LICENSE)
