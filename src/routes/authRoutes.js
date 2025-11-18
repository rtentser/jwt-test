import { Router } from 'express';
import { signup, signin, newToken, logout } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/new_token', newToken);
router.get('/info', auth, (req,res)=>res.json({ id: req.user.id }));
router.get('/logout', auth, logout);

export default router;
