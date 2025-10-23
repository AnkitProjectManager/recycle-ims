# RecycleIMS - Recycling Inventory Management System

A modern, professional ERP system for metal recycling and inventory management, built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Dark Theme UI** - Professional dark interface with excellent contrast and readability
- **Dashboard & Analytics** - Real-time KPIs, charts, and business insights
- **Inventory Management** - Track materials, quantities, locations, and values
- **Sales & Purchase Orders** - Complete order management workflow  
- **Compliance Tracking** - Certificates, environmental impact, and regulatory compliance
- **Customer Portal** - Dedicated interface for customer interactions
- **User Management** - Role-based access control and permissions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom CSS variables
- **UI Components:** Radix UI primitives with custom styling
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Forms:** React Hook Form with Zod validation

## 🎨 Design System

- **Color Scheme:** Dark theme with turquoise/blue accents
- **Typography:** Geist Sans with smooth font rendering
- **Components:** Modern cards, glassmorphism effects, subtle animations
- **Accessibility:** High contrast ratios and semantic HTML

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/recycle-ims.git
cd recycle-ims
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Credentials

The application uses mock authentication for demo purposes:

### Admin/Staff Access:
- **Email:** \`admin@cmi.com\` (or any email without "customer")
- **Password:** \`password\` (any password works)
- **Access:** Full dashboard and management features

### Customer Portal:
- **Email:** \`customer@cmi.com\` (any email containing "customer")  
- **Password:** \`password\` (any password works)
- **Access:** Customer portal with certificates and reports

## 📁 Project Structure

\`\`\`
recycle-ims/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with dark theme
│   └── [pages]/           # Page components
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, cards, etc.)
│   ├── dashboard/        # Dashboard-specific components
│   ├── inventory/        # Inventory management components
│   ├── auth/            # Authentication components
│   └── [modules]/       # Feature-specific components
├── lib/                  # Utility functions
├── scripts/              # Database setup scripts
└── public/              # Static assets
\`\`\`

## 🎯 Key Features Implemented

### ✅ Modern UI/UX
- Dark theme with excellent contrast
- Modern card layouts with backdrop blur
- Responsive design for all screen sizes
- Smooth animations and transitions

### ✅ Dashboard
- KPI cards with real-time metrics
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons

### ✅ Inventory Management
- Material tracking with search/filter
- Location and quantity management
- Status indicators and alerts
- Bulk operations

### ✅ Authentication & Security
- Role-based access control
- Mock authentication system
- User management interface
- Secure routing

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuration

The application uses CSS variables for theming. Customize colors in \`app/globals.css\`:

\`\`\`css
:root {
  --background: oklch(0.08 0.01 240);    /* Dark background */
  --foreground: oklch(0.98 0.01 180);    /* Light text */
  --primary: oklch(0.70 0.15 175);       /* Brand turquoise */
  /* ... more variables */
}
\`\`\`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please contact [support@recycle-ims.com](mailto:support@recycle-ims.com)

---

**Built with ❤️ for the recycling industry**