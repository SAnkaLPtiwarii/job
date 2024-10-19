import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyOTP } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function OTPVerification() {
    const [email, setEmail] = useState('');
    const [emailOTP, setEmailOTP] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const handleVerify = async () => {
        setError('');
        setSuccess('');
        try {
            const response = await verifyOTP(email, emailOTP);
            setSuccess('Verification successful!');
            // Assuming the response includes a token
            localStorage.setItem('token', response.token);
            setTimeout(() => history.push('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="left-content">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
            </div>
            <div className="right-content">
                <h2>Verify OTP</h2>
                <p>Enter the OTP sent to your email</p>
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
                <div className="otp-inputs">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email OTP"
                        value={emailOTP}
                        onChange={(e) => setEmailOTP(e.target.value)}
                    />
                    <button onClick={handleVerify}>Verify</button>
                </div>
            </div>
        </div>
    );
}

export default OTPVerification;