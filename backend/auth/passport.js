import passport from 'passport';
import { getGoogleStrategy } from './strategies/google.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });
  
  passport.use(getGoogleStrategy());

export default passport;
