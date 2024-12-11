const express = require('express');
const { Feedback, User } = require('../models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API for managing user feedback
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Add feedback from a user
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user providing feedback
 *                 example: 1
 *               message:
 *                 type: string
 *                 description: Feedback message
 *                 example: "Great service!"
 *               rating:
 *                 type: integer
 *                 description: Feedback rating (1-5)
 *                 example: 5
 *     responses:
 *       201:
 *         description: Feedback successfully created
 */
router.post('/', async (req, res) => {
  const { user_id, message, rating } = req.body;

  try {
    const feedback = await Feedback.create({ user_id, message, rating });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /feedback/{user_id}:
 *   get:
 *     summary: Retrieve all feedback for a specific user
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of feedback for the user
 */
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const feedbacks = await Feedback.findAll({
      where: { user_id },
      include: [{ model: User, as: 'users', attributes: ['id', 'username', 'email'] }],
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({ error: 'No feedback found for the user.' });
    }

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
