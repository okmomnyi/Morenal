# 🛍️ MORENAL - E-Commerce Platform

**Elegance in every Purchase**

Modern e-commerce platform with admin dashboard and customer storefront built with Next.js 16, React, TypeScript, Firebase, and Tailwind CSS.

## 🚀 Quick Start

### 1. Install & Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

### 2. Environment Variables
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Access (comma-separated emails)
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com

# ImgBB Image Hosting (free at https://api.imgbb.com/)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### 3. Firebase Setup
1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password + Google)
3. Create Firestore database
4. Deploy security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow delete: if isAdmin();
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /orders/{orderId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
  }
}
```

## 🎯 Key Features

### Customer Storefront
- **Homepage:** Hero carousel, featured products
- **Shop:** Product catalog with filters
- **Cart & Checkout:** Full shopping experience
- **User Accounts:** Profile and order history
- **Authentication:** Email/password + Google OAuth

### Admin Management (Stealth Access)
- **Secret Login:** `/management-login` (invisible to customers)
- **Dashboard:** Analytics and overview
- **Products:** Add, edit, delete products
- **Orders:** Manage customer orders
- **Hero Images:** Upload carousel images via ImgBB
- **Sample Data:** Seed products and images for testing

### Technical Stack
- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Images:** ImgBB CDN hosting
- **State:** React Context + Hooks

## 🔧 Admin Setup

### First-Time Admin Access
1. **Create Account:** Visit `/auth/signup`
2. **Add Admin Email:** Add your email to `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local`
3. **Restart Server:** `npm run dev`
4. **Access Management:** Visit `/management-login`

### Seed Sample Data
1. Visit `/admin/test-setup`
2. Click "Seed Products" (adds 4 sample products)
3. Click "Seed Hero Images" (adds 3 carousel images)

## 🌐 Available URLs

### Customer Pages
- `/` - Homepage with hero section
- `/shop` - Product catalog
- `/about` - Company information
- `/cart` - Shopping cart
- `/checkout` - Purchase flow
- `/account` - User profile (requires login)
- `/auth/signin` - Customer login
- `/auth/signup` - Create account

### Admin Pages (Stealth)
- `/management-login` - **Secret admin access**
- `/admin/dashboard` - Analytics overview
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/hero-images` - Carousel management
- `/admin/test-setup` - Sample data seeding

## 💻 Usage Examples

### Authentication
```tsx
import { useAuth } from "@/context/AuthContext";
import { useSignIn, useSignOut } from "@/hooks/useFirebaseAuth";

function MyComponent() {
  const { user, isAdmin } = useAuth();
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          {isAdmin && <p>Admin Access</p>}
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn(email, password)}>Sign In</button>
      )}
    </div>
  );
}
```

### Firestore Operations
```tsx
import { setDocument, getDocument, queryDocuments, collections } from "@/lib/firebase";

// Create product
await setDocument(collections.products, "product-id", {
  name: "Product Name",
  price: 99.99,
  image: "https://i.ibb.co/xxxxx/image.jpg"
});

// Get product
const product = await getDocument(collections.products, "product-id");

// Query products
const products = await queryDocuments(collections.products, [
  createConstraints.where("category", "==", "electronics"),
  createConstraints.orderBy("price", "desc")
]);
```

### Image Upload
```tsx
import ImageUpload from "@/components/upload/ImageUpload";

function ProductForm() {
  return (
    <ImageUpload
      onUploadComplete={(url) => console.log("Image uploaded:", url)}
      onUploadProgress={(progress) => console.log(`Progress: ${progress}%`)}
    />
  );
}
```

## 🚀 Deployment

### Build & Deploy
```bash
npm run build
npm run start
```

### Production Environment
Set these variables in your hosting platform:
- All Firebase config variables
- `NEXT_PUBLIC_ADMIN_EMAILS` (production admin emails)
- `NEXT_PUBLIC_IMGBB_API_KEY` (production ImgBB key)

### Security Notes
- Admin access is completely hidden from customers
- Uses discrete "Management Portal" terminology
- No visible admin links in customer interface
- Email-based admin authorization

## 🛠️ Development

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── (customer)/     # Customer storefront
│   ├── admin/          # Admin dashboard
│   └── api/            # API routes
├── components/         # UI components
├── context/           # React Context
├── hooks/             # Custom hooks
├── lib/               # Utilities
└── layout/            # Layout components
```

### Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code linting
```

## 📞 Troubleshooting

- **Google Sign-In Error:** Enable Google provider in Firebase Console
- **Image Upload Issues:** Check ImgBB API key
- **Admin Access Denied:** Verify email in `NEXT_PUBLIC_ADMIN_EMAILS`
- **Firestore Errors:** Deploy security rules via Firebase Console

---

**MORENAL - Professional E-Commerce Platform** 🛍️

**Admin Access:** http://localhost:3000/management-login
