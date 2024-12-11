const express = require('express');
const Announcement = require('../models/Announcement'); // Sequelize 모델 가져오기
const router = express.Router();

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Retrieve active announcements
 *     tags: [Announcement]
 *     responses:
 *       200:
 *         description: A list of active announcements
 */
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.findAll({ where: { isActive: true } });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
