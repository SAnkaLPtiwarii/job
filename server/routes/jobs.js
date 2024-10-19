const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, jobController.createJob);
router.get('/', auth, jobController.getJobs);
router.post('/:jobId/send-alerts', auth, jobController.sendJobAlerts);

module.exports = router;