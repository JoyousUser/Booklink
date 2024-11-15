import React, { useEffect, useState } from 'react';
import API from '../services/api';

const TestComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        API.get('/hello')
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return <h1>{message || 'Loading...'}</h1>;
};

export default TestComponent;