import express from 'express';
import passport from '../auth/passport.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: 'http://localhost:3000/'
}));


router.get('/infoGetter', (req, res) => {
  if (req.isAuthenticated()) {
   
    
    res.json({ userID: req.user.id, email: req.user.email, firstName: req.user.firstName, isAuthenticated: true });
  } else {
    res.status(401).json({ userID: null, isAuthenticated: false  });
  }
});

export default router;
