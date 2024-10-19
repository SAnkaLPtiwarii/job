import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyEmail: '',
        employeeSize: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (!formData.phone.trim()) return "Phone number is required";
        if (!formData.companyName.trim()) return "Company name is required";
        if (!formData.companyEmail.trim()) return "Company email is required";
        if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) return "Invalid email format";
        if (!formData.employeeSize || isNaN(formData.employeeSize)) return "Employee size must be a number";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await signup(formData);
            setSuccess(response.message);
            if (response.action === 'verify') {
                setTimeout(() => history.push('/verify', { email: formData.companyEmail }), 2000);
            } else if (response.action === 'login') {
                setTimeout(() => history.push('/login'), 2000);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="left-content">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
            </div>
            <div className="right-content">
                <h2>Sign Up</h2>
                <p>Lorem Ipsum is simply dummy text</p>
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone no." onChange={handleChange} required />
                    <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
                    <input type="email" name="companyEmail" placeholder="Company Email" onChange={handleChange} required />
                    <input type="number" name="employeeSize" placeholder="Employee Size" onChange={handleChange} required />
                    <p className="terms">By clicking on proceed you will accept our Terms & Conditions</p>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Proceed'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;