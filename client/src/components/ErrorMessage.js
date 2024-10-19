import React from 'react';

function ErrorMessage({ message }) {
    return message ? <div className="error-message">{message}</div> : null;
}

export default ErrorMessage;