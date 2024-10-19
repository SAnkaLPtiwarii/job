import React from 'react';

function SuccessMessage({ message }) {
    return message ? <div className="success-message">{message}</div> : null;
}

export default SuccessMessage;