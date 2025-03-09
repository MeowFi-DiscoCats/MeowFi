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

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return done(null, { username: process.env.ADMIN_USERNAME });
    }
    return done(null, false);
  }),
);

export default passport;
