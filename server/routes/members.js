import { Router, json } from 'express';

import Member from '../models/Member';
import validate from '../middleware/validate.js';
import memberSchema from '../validators/memberSchema.js';

const memberRouter = Router();

// Get all members
memberRouter.get('/', async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get member by ID
memberRouter.get('/:id', async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Create member
memberRouter.post('/', json(), validate(memberSchema), async (req, res) => {
    try {
      const member = await Member.create(req.body);
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Update member
memberRouter.put('/:id', json(), validate(memberSchema), async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      await member.update(req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Delete member
memberRouter.delete('/:id', async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      await member.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
export default memberRouter;