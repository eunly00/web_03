const express = require('express');
const {JobPosting} = require('../models'); // Sequelize 모델 임포트
const router = express.Router();
const { Op } = require("sequelize");

/**
 * @swagger
 * tags:
 *   name: JobPostings
 *   description: 채용 공고 관련 API
 */

/**
 * @swagger
 * /job-postings:
 *   get:
 *     summary: 채용 공고 조회
 *     tags: [JobPostings]
 *     responses:
 *       200:
 *         description: 채용 공고 목록
 */
router.get('/', async (req, res) => {
    try {
        const jobPostings = await JobPosting.findAll();
        res.json(jobPostings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings/search:
 *   get:
 *     summary: 채용 공고 검색
 *     tags: [JobPostings]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: 검색 키워드
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 검색된 채용 공고 목록
 */
router.get('/search', async (req, res) => {
    const { keyword } = req.query;
    try {
        const jobPostings = await JobPosting.findAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`
                }
            }
        });
        res.json(jobPostings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings/filter:
 *   get:
 *     summary: 채용 공고 필터링
 *     tags: [JobPostings]
 *     parameters:
 *       - in: query
 *         name: location
 *         description: 지역 필터링
 *         schema:
 *           type: string
 *       - in: query
 *         name: employmentType
 *         description: 고용형태 필터링
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 필터링된 채용 공고 목록
 */
router.get('/filter', async (req, res) => {
    const { location, employmentType } = req.query;
    try {
        const jobPostings = await JobPosting.findAll({
            where: {
                ...(location && { location }),
                ...(employmentType && { employmentType })
            }
        });
        res.json(jobPostings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings/sort:
 *   get:
 *     summary: 채용 공고 정렬
 *     tags: [JobPostings]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: 정렬 기준 (e.g., salary, deadline)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 정렬된 채용 공고 목록
 */
router.get('/sort', async (req, res) => {
    const { sortBy = 'postedAt', order = 'DESC' } = req.query;
    try {
        const jobPostings = await JobPosting.findAll({
            order: [[sortBy, order.toUpperCase()]]
        });
        res.json(jobPostings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings:
 *   post:
 *     summary: 채용 공고 등록
 *     tags: [JobPostings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               employmentType:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: 채용 공고가 성공적으로 등록됨
 */
router.post('/', async (req, res) => {
    try {
        const jobPosting = await JobPosting.create(req.body);
        res.status(201).json(jobPosting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings/{id}:
 *   put:
 *     summary: 채용 공고 수정
 *     tags: [JobPostings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 채용 공고 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: 수정된 채용 공고
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const jobPosting = await JobPosting.findByPk(id);
        if (!jobPosting) {
            return res.status(404).json({ error: 'Job posting not found' });
        }
        await jobPosting.update(req.body);
        res.json(jobPosting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /job-postings/{id}:
 *   delete:
 *     summary: 채용 공고 삭제
 *     tags: [JobPostings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 채용 공고 ID
 *     responses:
 *       200:
 *         description: 삭제 완료
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const jobPosting = await JobPosting.findByPk(id);
        if (!jobPosting) {
            return res.status(404).json({ error: 'Job posting not found' });
        }
        await jobPosting.destroy();
        res.json({ message: 'Job posting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
