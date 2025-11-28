import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('[NextAuth] Attempting to authorize user:', credentials?.email);
          await connectDB();
          console.log('[NextAuth] Database connected');

          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            console.error('[NextAuth] Missing credentials');
            return null;
          }

          // Find user with password field
          const user = await User.findOne({ 
            email: email.toLowerCase() 
          }).select('+password');

          if (!user) {
            console.error('[NextAuth] User not found:', email);
            return null;
          }

          console.log('[NextAuth] User found, verifying password');
          // Verify password using the model method
          const isValid = await user.comparePassword(password);

          if (!isValid) {
            console.error('[NextAuth] Invalid password for user:', email);
            return null;
          }

          console.log('[NextAuth] Authentication successful for:', user.email);
          // Return user object (without password)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            image: user.image,
            businessType: user.businessType,
          };
        } catch (error) {
          console.error('[NextAuth] Authorization error:', error.message);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },


  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign in
      if (account?.provider === 'google') {
        try {
          await connectDB();
          
          // Check if user exists
          let existingUser = await User.findOne({ email: user.email.toLowerCase() });
          
          if (!existingUser) {
            // Create new user for Google sign-in
            existingUser = await User.create({
              name: user.name,
              email: user.email.toLowerCase(),
              profileImage: user.image,
              role: 'buyer', // Default role for Google sign-in
              isVerified: true, // Google accounts are pre-verified
              authProvider: 'google',
            });
            console.log('[NextAuth] Created new user via Google:', existingUser.email);
          }
          
          // Update user object with database ID
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.businessType = existingUser.businessType;
          user.phone = existingUser.phone;
        } catch (error) {
          console.error('[NextAuth] Error in Google sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      // Add user data to token on sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.phone = user.phone;
        token.image = user.image;
        token.businessType = user.businessType;
      }

      // Handle session update
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.phone = session.user.phone;
        token.image = session.user.image;
        // Add other fields that might be updated
      }

      // Sync with database on every check to ensure role is up to date
      if (!user && token?.email) {
        try {
          await connectDB();
          console.log(`[NextAuth] Checking DB for user: ${token.email}`);
          const dbUser = await User.findOne({ email: token.email.toLowerCase() }).lean();
          
          if (dbUser) {
            console.log(`[NextAuth] Found user in DB. Role: ${dbUser.role}, ID: ${dbUser._id}`);
            if (token.role !== dbUser.role) {
               console.log(`[NextAuth] UPDATING ROLE: ${token.role} -> ${dbUser.role}`);
            }
            token.role = dbUser.role;
            token.businessType = dbUser.businessType;
            token.id = dbUser._id.toString();
            token.phone = dbUser.phone;
          } else {
            console.warn(`[NextAuth] User NOT found in DB: ${token.email}`);
          }
        } catch (error) {
          console.error('[NextAuth] Error syncing user data in JWT:', error);
        }
      } else if (user) {
         console.log(`[NextAuth] Sign-in detected. User role: ${user.role}`);
      }

      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.image = token.image;
        session.user.businessType = token.businessType;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
