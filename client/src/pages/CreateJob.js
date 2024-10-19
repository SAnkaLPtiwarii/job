import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Add Link import here
import { createJob } from '../services/jobService';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function CreateJob() {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        candidates: '',
        endDate: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await createJob(jobData);
            setSuccess('Job created successfully!');
            setTimeout(() => history.push('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating job. Please try again.');
        }
    };

    return (
        <div className="create-job-container">
            <aside>
                <nav>
                    <Link to="/dashboard">Home</Link>
                </nav>
            </aside>
            <main>
                <h2>Create New Job</h2>
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
                <form onSubmit={handleSubmit}>
                    <label>
                        Job Title
                        <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
                    </label>
                    <label>
                        Job Description
                        <textarea name="description" value={jobData.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Experience Level
                        <select name="experienceLevel" value={jobData.experienceLevel} onChange={handleChange} required>
                            <option value="">Select Experience Level</option>
                            <option value="Entry">Entry Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </label>
                    <label>
                        Add Candidates (comma-separated emails)
                        <input type="text" name="candidates" value={jobData.candidates} onChange={handleChange} placeholder="e.g. candidate1@example.com, candidate2@example.com" />
                    </label>
                    <label>
                        End Date
                        <input type="date" name="endDate" value={jobData.endDate} onChange={handleChange} required />
                    </label>
                    <button type="submit">Create Job</button>
                </form>
            </main>
        </div>
    );
}

export default CreateJob;