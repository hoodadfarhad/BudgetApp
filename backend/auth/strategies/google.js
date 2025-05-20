import dotenv from 'dotenv';
dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export function getGoogleStrategy() {
  return new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.Base_callback}/auth/google/callback`,
  }, (accessToken, refreshToken, profile, done) => {


    const user = {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      provider: 'google'
    };

   



    
    return done(null, user);
  });
}
