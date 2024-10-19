const Job = require('../models/Job');
const { sendJobAlert } = require('../services/emailService');

exports.createJob = async (req, res) => {
    try {
        const { title, description, experienceLevel, candidates, endDate } = req.body;
        const job = new Job({
            title,
            description,
            experienceLevel,
            candidates: candidates.split(',').map(email => email.trim()),
            endDate,
            company: req.user.id,
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job.', error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs.', error: error.message });
    }
};

exports.sendJobAlerts = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate('company');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.company._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to send alerts for this job' });
        }

        const alerts = job.candidates.map(candidate => sendJobAlert(candidate, job));
        await Promise.all(alerts);

        res.json({ message: 'Job alerts sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending job alerts', error: error.message });
    }
};