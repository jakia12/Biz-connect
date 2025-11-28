import connectDB from '@/backend/shared/config/database';
import User from '@/backend/shared/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
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
    async jwt({ token, user }) {
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
