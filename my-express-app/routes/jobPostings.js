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
 *                 example: "Frontend Developer"
 *               company_id:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: "We are looking for a skilled frontend developer."
 *               location:
 *                 type: string
 *                 example: "Seoul, South Korea"
 *               salary:
 *                 type: number
 *                 example: 50000
 *               employmentType:
 *                 type: string
 *                 example: "Full-time"
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
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

/**
 * @swagger
 * /job-postings/{id}:
 *   get:
 *     summary: Retrieve job posting details
 *     tags: [JobPostings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The job posting ID
 *     responses:
 *       200:
 *         description: Job posting details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *                   example: 123
 *       404:
 *         description: Job posting not found
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const jobPosting = await JobPosting.findByPk(id);
  
      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }
       // 조회수 증가
       jobPosting.view_count = (jobPosting.view_count || 0) + 1;
       await jobPosting.save();

      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /job-postings/{id}:/recommendations:
 *   get:
 *     summary: Get related job postings
 *     tags: [JobPostings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The job posting ID
 *     responses:
 *       200:
 *         description: Related job postings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   sector:
 *                     type: string
 *                   location:
 *                     type: string
 */

router.get('/:id/recommendations', async (req, res) => {
    const { id } = req.params;
  
    try {
      const jobPosting = await JobPosting.findByPk(id);
  
      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }
  
      const relatedJobs = await JobPosting.findAll({
        where: {
          id: { [Op.ne]: id }, // 현재 공고를 제외
          [Op.or]: [
            { salary_text: jobPosting.salary_text }, // 동일한 직무 분야
            { location: jobPosting.location }, // 동일한 지역
          ],
        },
        limit: 5, // 최대 5개 추천
      });
  
      res.json(relatedJobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;
