const express = require('express');
const FAQ = require('../models/FAQ'); // Sequelize 모델 가져오기
const router = express.Router();

/**
 * @swagger
 * /faqs:
 *   get:
 *     summary: Retrieve a list of FAQs
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: A list of FAQs
 */
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.findAll();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
