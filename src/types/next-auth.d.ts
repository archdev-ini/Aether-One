
import type {DefaultSession} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      aetherId?: string;
      isProfileComplete?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
    interface JWT {
        aetherId?: string;
        isProfileComplete?: boolean;
    }
}
