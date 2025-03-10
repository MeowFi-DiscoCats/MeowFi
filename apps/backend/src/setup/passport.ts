import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ADMIN_SECRET as string,
};

passport.use(
  "jwt",
  new JWTStrategy(jwtOptions, (payload: { username: string }, done) => {
    return done(null, payload);
  }),
);

const attemptTracker = new Map<
  string,
  { count: number; firstAttempt: number }
>();

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    const now = Date.now();
    const attemptData = attemptTracker.get(username) || {
      count: 0,
      firstAttempt: now,
    };

    if (now - attemptData.firstAttempt > 60000) {
      attemptData.count = 0;
      attemptData.firstAttempt = now;
    }

    if (attemptData.count >= 5) {
      return done(null, false, {
        message: "Too many failed attempts. Try again later.",
      });
    }

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      attemptTracker.delete(username);
      return done(null, { username: process.env.ADMIN_USERNAME });
    }

    attemptData.count += 1;
    attemptTracker.set(username, attemptData);
    return done(null, false, { message: "Invalid credentials" });
  }),
);
export default passport;
