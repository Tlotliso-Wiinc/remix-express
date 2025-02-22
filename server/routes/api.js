import { Router, json } from 'express';
import userRouter from './users';
import memberRouter from './members';

const router = Router();

// Middleware example
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }
  // Add your authentication logic here
  next();
}

// Mount feature-specific routers
router.use('/users', userRouter);
router.use('/members', memberRouter);

// handle API requests
router.get("/status", (request, response) => {
    const status = {
       "status": "Running",
    };
    
    response.send(status);
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Data submission endpoint
router.post('/data', json(), (req, res) => {
  const data = req.body;
  // Process your data here
  res.json({ received: data });
});

// User endpoint with URL parameters
/*
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: `Fetching user ${userId}` });
});
*/

// Search endpoint with query parameters
router.get('/search', (req, res) => {
  const { query, page } = req.query;
  res.json({ query, page, results: [] });
});

// Protected endpoint example
router.post('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Access granted to protected resource' });
});

export default router;