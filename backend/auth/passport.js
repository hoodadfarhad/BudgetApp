import passport from 'passport';
import { getGoogleStrategy } from './strategies/google.js';

passport.serializeUser((user, done) => {    // previously I had saved only user.is, and later in deserializing, i only restored the id that's why
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {  // now I am saving the whole user info from google on the session
    done(null, user);
  });
  
  passport.use(getGoogleStrategy());

export default passport;
