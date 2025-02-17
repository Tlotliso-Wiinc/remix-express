import { Router, json } from 'express';

import User from '../models/User';
import validate from '../middleware/validate.js';
import userSchema from '../validators/userSchema.js';
// import { json } from 'sequelize';

const userRouter = Router();

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
userRouter.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Create user
userRouter.post('/', json(), validate(userSchema), async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Update user
userRouter.put('/:id', json(), validate(userSchema), async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.update(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Delete user
userRouter.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
export default userRouter;