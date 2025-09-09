# 🛍️ iShop Morocco - E-commerce Platform

**Morocco's Premier Online Shopping Destination**

A modern, full-stack e-commerce platform built with Next.js, featuring a sleek black and gold design, comprehensive shopping cart functionality, and secure user authentication.

![iShop Morocco](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3)

## ✨ Features

### 🛒 **Shopping Experience**
- **Product Catalog** - Browse extensive product collections with detailed information
- **Smart Search & Filtering** - Find products quickly with advanced search capabilities
- **Shopping Cart** - Add, remove, and manage items with real-time updates
- **Wishlist** - Save favorite products for later
- **Product Reviews** - Customer feedback and ratings system

### 👤 **User Management**
- **Secure Authentication** - Login/Register with email verification
- **User Profiles** - Manage personal information and preferences
- **Order History** - Track all purchases and order status
- **Account Verification** - Email verification system for security
- **Role-based Access** - Admin, moderator, and user roles

### 📦 **Order Management**
- **Complete Checkout Process** - Secure payment flow
- **Order Tracking** - Real-time order status updates
- **Order History** - Detailed purchase records
- **Invoice Generation** - Downloadable order receipts
- **Delivery Tracking** - Track packages from warehouse to door

### 🎨 **Design & UX**
- **Modern Dark Theme** - Elegant black and gold color scheme
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Enhanced user experience with Tailwind transitions
- **Intuitive Navigation** - Easy-to-use interface design
- **Loading States** - Professional loading indicators and skeletons

### 🔒 **Security & Performance**
- **Protected Routes** - Secure user areas with authentication guards
- **Data Validation** - Client and server-side validation
- **Error Handling** - Graceful error management and user feedback
- **Optimized Performance** - Fast loading times and smooth interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ishop-morocco.git
cd ishop-morocco
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Service (for verification)
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@ishop-morocco.com

# Payment (if using Stripe)
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ishop-morocco/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── en/               # Main application pages
│   │   │   ├── cart/         # Shopping cart
│   │   │   ├── order/        # Order management
│   │   │   ├── profile/      # User profile
│   │   │   └── auth/         # Authentication pages
│   │   ├── context/          # React context providers
│   │   ├── components/       # Reusable UI components
│   │   └── lib/              # Utility functions
├── public/                   # Static assets
├── styles/                   # Global styles
└── README.md
```

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: NextAuth.js

### **Backend**
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose
- **API**: Next.js API Routes
- **Authentication**: JWT + NextAuth

### **Development Tools**
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm/yarn/pnpm
- **Version Control**: Git

## 🎨 Design System

### **Color Palette**
- **Primary**: Black (`#000000`)
- **Accent**: Gold/Yellow (`#fbbf24`)
- **Text**: White (`#ffffff`)
- **Secondary**: Gray variants
- **Success**: Green (`#10b981`)
- **Error**: Red (`#ef4444`)

### **Typography**
- **Primary Font**: System fonts optimized by Next.js
- **Headings**: Bold, large sizes for impact
- **Body**: Medium weight for readability

## 📱 Features by Page

### **Home Page (`/en`)**
- Hero section with promotional content
- Featured products showcase
- Category navigation
- Special offers and deals

### **Cart Page (`/en/cart`)**
- Shopping cart items management
- Quantity adjustments
- Price calculations
- Checkout initiation

### **Profile Page (`/en/profile`)**
- User information display
- Account verification status
- Order statistics
- Recent orders preview

### **Orders Page (`/en/order`)**
- Complete order history
- Order status tracking
- Detailed order information
- Reorder functionality

### **Authentication (`/en/auth`)**
- User registration
- Login functionality
- Email verification
- Password management

## 🔧 API Endpoints

```
GET    /api/products          # Get all products
GET    /api/products/[id]     # Get specific product
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/orders            # Get user orders
POST   /api/orders            # Create new order
GET    /api/user/profile      # Get user profile
PUT    /api/user/profile      # Update user profile
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**
- **Netlify**: Configure build settings
- **Railway**: Add environment variables
- **DigitalOcean**: Use App Platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: https://github.com/ayoubameur-crypto
- LinkedIn: https://www.linkedin.com/in/ayoub-ameur-772a70362/
- Email: ayoubyameury@gmail.com

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set
- **Vercel** - For hosting and deployment platform
- **MongoDB** - For the database solution

## 📊 Project Status

- ✅ **Authentication System** - Complete
- ✅ **Shopping Cart** - Complete
- ✅ **User Profile** - Complete
- ✅ **Order Management** - Complete
- ✅ **Responsive Design** - Complete
- 🚧 **Payment Integration** - In Progress
- 🚧 **Admin Dashboard** - Planning
- 🚧 **Mobile App** - Future

---

Made with ❤️ by Ayoub Ameur

*iShop Morocco - Where Premium Meets Convenience*