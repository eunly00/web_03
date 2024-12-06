const express = require('express');
const { Application, Bookmark, JobPosting, User } = require('../models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: 지원 관련 API
 */

/**
 * @swagger
 * /applications/apply:
 *   post:
 *     summary: 지원하기
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 지원자 ID
 *                 example: 1
 *               jobPostingId:
 *                 type: integer
 *                 description: 지원할 채용 공고 ID
 *                 example: 3
 *     responses:
 *       201:
 *         description: 지원 성공
 *       400:
 *         description: 요청 오류
 */
router.post('/apply', async (req, res) => {
    const { userId, jobPostingId } = req.body;

    try {
        // 사용자와 공고 검증
        const user = await User.findByPk(userId);
        const jobPosting = await JobPosting.findByPk(jobPostingId);

        if (!user || !jobPosting) {
            return res.status(400).json({ error: 'Invalid user or job posting' });
        }

        const application = await Application.create({
            userId,
            jobPostingId,
            status: 'pending',
        });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: 지원 내역 조회
 *     tags: [Applications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 사용자의 지원 내역
 */
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        const applications = await Application.findAll({
            where: { userId },
            include: [
                {
                    model: JobPosting,
                    as: 'jobPosting',
                    attributes: ['id', 'title', 'location', 'salary'],
                },
                {
                    model: User,
                    as: 'users',
                    attributes: ['username', 'email'],
                },
            ],
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /applications/bookmark:
 *   post:
 *     summary: 관심 등록
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 사용자 ID
 *                 example: 1
 *               jobPostingId:
 *                 type: integer
 *                 description: 관심 등록할 채용 공고 ID
 *                 example: 3
 *     responses:
 *       201:
 *         description: 관심 등록 성공
 *       400:
 *         description: 요청 오류
 */
router.post('/bookmark', async (req, res) => {
    const { userId, jobPostingId } = req.body;

    try {
        // 사용자와 공고 검증
        const user = await User.findByPk(userId);
        const jobPosting = await JobPosting.findByPk(jobPostingId);

        if (!user || !jobPosting) {
            return res.status(400).json({ error: 'Invalid user or job posting' });
        }

        const bookmark = await Bookmark.create({
            userId,
            jobPostingId,
        });

        res.status(201).json({ message: 'Job posting bookmarked successfully', bookmark });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /applications/cancel:
 *   delete:
 *     summary: 지원 취소
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 사용자 ID
 *                 example: 1
 *               jobPostingId:
 *                 type: integer
 *                 description: 취소할 채용 공고 ID
 *                 example: 3
 *     responses:
 *       200:
 *         description: 지원 취소 성공
 */
router.delete('/cancel', async (req, res) => {
    const { userId, jobPostingId } = req.body;

    try {
        const application = await Application.findOne({
            where: { userId, jobPostingId },
        });

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        await application.destroy();
        res.json({ message: 'Application canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
