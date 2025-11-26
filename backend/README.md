# BizConnect Backend

This folder contains all backend logic for the BizConnect application, organized for scalability and future microservices architecture.

## Structure

```
backend/
├── shared/                    # Shared code across services
│   ├── models/               # Mongoose models
│   │   ├── User.js          # User authentication model
│   │   ├── SellerProfile.js # Seller business profile
│   │   ├── Session.js       # NextAuth sessions
│   │   └── Account.js       # OAuth accounts (future)
│   │
│   ├── config/              # Configuration files
│   │   └── db.js           # MongoDB connection
│   │
│   ├── middleware/          # Shared middleware (future)
│   │   ├── auth.js         # JWT verification
│   │   ├── errorHandler.js # Error handling
│   │   └── validation.js   # Request validation
│   │
│   └── utils/              # Utility functions (future)
│       ├── jwt.js         # JWT utilities
│       ├── email.js       # Email service
│       └── helpers.js     # Helper functions
│
├── media-service/          # Image/File Upload Service (future)
│   └── (to be implemented)
│
└── chat-service/           # Real-time Chat Service (future)
    └── (to be implemented)
```

## Current Implementation

### Models

All Mongoose models are located in `backend/shared/models/`:

- **User.js**: Core user model with authentication
  - Email/password authentication
  - Password hashing with bcryptjs
  - Role-based access (buyer/seller)
  
- **SellerProfile.js**: Extended seller information
  - Business details
  - Location and category
  - Ratings and verification status

- **Session.js**: NextAuth database sessions
  - Session token management
  - User session tracking

- **Account.js**: OAuth provider accounts (prepared for future social auth)

### Configuration

- **db.js**: MongoDB connection with singleton pattern
  - Optimized for serverless environments
  - Connection caching to prevent multiple connections
  - Error handling

## Usage in Frontend

The frontend Next.js app imports backend modules using the `@/backend` alias:

```javascript
// Import models
import User from '@/backend/shared/models/User';
import SellerProfile from '@/backend/shared/models/SellerProfile';

// Import database connection
import connectDB from '@/backend/shared/config/db';
```

## Future Expansion

### Media Service

Will handle:
- Image uploads (Cloudinary/S3)
- Image processing and compression
- PDF generation
- File management

### Chat Service

Will handle:
- Real-time messaging (Socket.io)
- Conversation management
- Notifications
- Online status tracking

## Environment Variables

Required environment variables (defined in root `.env`):

```
MONGODB_URI=mongodb://localhost:27017/bizconnect
```

## Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  image: String,
  role: 'buyer' | 'seller',
  emailVerified: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### SellerProfile Collection
```javascript
{
  userId: ObjectId (ref: User),
  businessName: String,
  businessType: 'product' | 'service' | 'both',
  category: String,
  location: String,
  district: String,
  description: String,
  businessHours: {
    from: String,
    to: String
  },
  logo: String,
  verified: Boolean,
  rating: Number,
  totalReviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Session Collection
```javascript
{
  sessionToken: String (unique),
  userId: ObjectId (ref: User),
  expires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Development

When adding new backend functionality:

1. **Models**: Add to `backend/shared/models/`
2. **Config**: Add to `backend/shared/config/`
3. **Middleware**: Add to `backend/shared/middleware/`
4. **Utils**: Add to `backend/shared/utils/`

## Deployment

The backend code is deployed as part of the Next.js application to Vercel. Future microservices can be deployed separately.

## Notes

- All models use Mongoose for MongoDB ODM
- Password hashing is automatic on user creation/update
- Session management is handled by NextAuth
- Models prevent recompilation in development mode
