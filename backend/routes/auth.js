import express from 'express';
import passport from '../auth/passport.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'  // forcing to ask what google account after each logout
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: `${process.env.CLIENT_ORIGIN}/dashboard`
}));


router.get('/infoGetter', (req, res) => {
  if (req.isAuthenticated()) {
   console.log("salaam auth  :  "+req.user.email);
   
    
    res.json({ userID: req.user.id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAuthenticated: true });
  } else {
    res.status(401).json({ userID: null, isAuthenticated: false  });
  }
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Error logging out.");
    }

    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).send("Error destroying session.");
      }

      res.clearCookie('connect.sid'); // remove cookie from browser
      res.redirect(process.env.CLIENT_ORIGIN); 
    });
  });
});


export default router;
