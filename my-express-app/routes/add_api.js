const express = require('express');
const { JobTag, Notification, UserActivity } = require('../models'); // Sequelize 모델 가져오기
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: JobTags
 *   description: Job tag management API
 */

/**
 * @swagger
 * /job-tags:
 *   post:
 *     summary: Add a tag to a job posting
 *     tags: [JobTags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostingId:
 *                 type: integer
 *                 example: 1
 *               tag:
 *                 type: string
 *                 example: "Remote"
 *     responses:
 *       201:
 *         description: Tag added successfully
 */
router.post('/job-tags', async (req, res) => {
  const { jobPostingId, tag } = req.body;

  try {
    const jobTag = await JobTag.create({ jobPostingId, tag });
    res.status(201).json(jobTag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management API
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Retrieve notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 */
router.get('/notifications', async (req, res) => {
  const { userId } = req.query;

  try {
    const notifications = await Notification.findAll({
      where: { userId },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: "Your application has been reviewed."
 *     responses:
 *       201:
 *         description: Notification created successfully
 */
router.post('/notifications', async (req, res) => {
  const { userId, message } = req.body;

  try {
    const notification = await Notification.create({ userId, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: UserActivities
 *   description: User activity logging API
 */

/**
 * @swagger
 * /user-activities:
 *   post:
 *     summary: Log a user activity
 *     tags: [UserActivities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               activityType:
 *                 type: string
 *                 example: "Login"
 *               details:
 *                 type: string
 *                 example: "User logged in via web portal."
 *     responses:
 *       201:
 *         description: User activity logged successfully
 */
router.post('/user-activities', async (req, res) => {
  const { userId, activityType, details } = req.body;

  try {
    const userActivity = await UserActivity.create({ userId, activityType, details });
    res.status(201).json(userActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
