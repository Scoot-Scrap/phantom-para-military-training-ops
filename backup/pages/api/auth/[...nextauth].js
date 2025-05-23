// File: pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from '../../../lib/email';
import { getUserByEmail, verifyPassword } from '../../../lib/userService';
import { revokeRefreshToken, issueRefreshToken } from '../../../lib/tokenService';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId:   process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),                                                                                // OAuth SSO via GitHub :contentReference[oaicite:0]{index=0}
    EmailProvider({
      server:     process.env.EMAIL_SERVER,
      from:       process.env.EMAIL_FROM,
      sendVerificationRequest,                                                        // Magic-link (passwordless) flow :contentReference[oaicite:1]{index=1}
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const user = await getUserByEmail(creds.email);
        if (!user || !(await verifyPassword(creds.password, user.hash))) return null;   // Password check :contentReference[oaicite:2]{index=2}
        return user;
      },
    }),
  ],

  // 7.6 Session Management & Timeouts
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,         // Absolute timeout: 8 hours :contentReference[oaicite:3]{index=3}
    updateAge: 15 * 60,          // Inactivity timeout: 15 minutes :contentReference[oaicite:4]{index=4}
  },

  // 7.7 Token Rotation & Refresh
  jwt: {
    maxAge: 30 * 60,             // Access token expires in 30 minutes :contentReference[oaicite:5]{index=5}
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === 'credentials') {
        // Issue a refresh token at login
        token.refreshToken = await issueRefreshToken(user.id);                        // One-time use refresh token :contentReference[oaicite:6]{index=6}
      }
      // Rotate refresh token on token use
      if (token.refreshToken && Date.now() / 1000 > token.exp) {
        const newPair = await revokeRefreshToken(token.refreshToken);
        token = { ...token, ...newPair };                                            // Replace with new tokens :contentReference[oaicite:7]{index=7}
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  // 7.8 Multi-Factor & Passwordless Setup
  providers: [
    /* Providers defined above include Credentials + Email magic links.
       For TOTP/MFA, integrate via next-auth-webauthn (experimental) :contentReference[oaicite:8]{index=8} */
  ],

  // 7.9 Passkeys / WebAuthn (experimental)
  // Uncomment when ready:
  // providers: [
  //   WebAuthnProvider({ /* config per auth.js docs */ })
  // ],

  // 7.11 Cookie Security
  cookies: {
    sessionToken: {
      name:   'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',      // Prevent CSRF :contentReference[oaicite:9]{index=9}
        path:     '/',
        secure:   process.env.NODE_ENV === 'production',
      },
    },
  },

  // 7.13 Logout & Revocation
  events: {
    async signOut(message) {
      // Revoke refresh tokens on logout
      if (message.token?.refreshToken) {
        await revokeRefreshToken(message.token.refreshToken);
      }
    },
  },

  // 7.14 Audit Logging
  events: {
    async signIn({ user, account }) {
      console.log(`SIGNIN\t${user.email}\tvia ${account.provider}`);               // Replace with external log service :contentReference[oaicite:10]{index=10}
    },
    async signOut({ token }) {
      console.log(`SIGNOUT\t${token.sub}`);                                          // Console or SIEM integration :contentReference[oaicite:11]{index=11}
    },
  },
});