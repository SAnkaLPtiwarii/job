import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, sendJobAlerts } from '../services/jobService';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const fetchedJobs = await getJobs();
            setJobs(fetchedJobs);
        } catch (err) {
            setError('Failed to fetch jobs. Please try again later.');
        }
    };

    const handleSendAlerts = async (jobId) => {
        try {
            await sendJobAlerts(jobId);
            setSuccess('Job alerts sent successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to send job alerts. Please try again later.');
        }
    };

    return (
        <div className="dashboard-container">
            <aside>
                <nav>
                    <Link to="/dashboard">Home</Link>
                </nav>
            </aside>
            <main>
                <Link to="/create-job" className="create-interview-btn">Create Interview</Link>
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
                <div className="job-list">
                    {jobs.map(job => (
                        <div key={job._id} className="job-item">
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p>Experience: {job.experienceLevel}</p>
                            <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                            <p>Candidates: {job.candidates.join(', ')}</p>
                            <button onClick={() => handleSendAlerts(job._id)}>Send Alerts</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard