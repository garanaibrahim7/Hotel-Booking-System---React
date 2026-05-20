import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const SimpleTextSession = () => {
    const [inputText, setInputText] = useState('');
    const [sessionValue, setSessionValue] = useState('');
    const [logStatus, setLogStatus] = useState('Ready');

    const BACKEND_URL = 'http://localhost:8000';

    const doHandshake = async () => {
        try {
            setLogStatus('Connecting...');
            await axios.get(`/sanctum/csrf-cookie`);
            setLogStatus('Handshake Done! Cookie is loaded in your browser.');
        } catch (err) {
            setLogStatus('Handshake Failed. Check your backend configuration.');
        }
    };

    const sendToSession = async () => {
        try {
            setLogStatus('Sending text...');
            const response = await axios.post(`/api/session/save-text`, { message: inputText });
            setLogStatus(`Saved! Server verified: "${response.data.saved_as}"`);
        } catch (err) {
            setLogStatus('Failed to send text to server.');
        }
    };

    const readFromSession = async () => {
        try {
            setLogStatus('Reading text...');
            const response = await axios.get(`/api/session/get-text`);
            setSessionValue(response.data.text_in_session);
            setLogStatus('Session read successfully!');
        } catch (err) {
            setLogStatus('Failed to read text from server.');
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '500px', margin: '50px auto', border: '1px solid #ccc', fontFamily: 'sans-serif' }}>
            <h2>Minimal Session Test</h2>
            <p><strong>Status:</strong> {logStatus}</p>

            <button onClick={doHandshake} style={{ width: '100%', padding: '10px', background: 'orange', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
                1. Run Initial Handshake
            </button>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Type simple text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ width: '95%', padding: '10px', marginBottom: '8px' }}
                />
                <button onClick={sendToSession} style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    2. Save Text to Session
                </button>
            </div>

            <div style={{ background: '#f5f5f5', padding: '15px', textAlign: 'center' }}>
                <button onClick={readFromSession} style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
                    3. Fetch Text from Session
                </button>
                <p style={{ fontSize: '18px', margin: '5px 0', color: 'darkblue' }}>
                    <strong>Value inside Server Session:</strong> <br />
                    <span style={{ fontWeight: 'bold', background: '#fff', padding: '2px 8px', display: 'inline-block', marginTop: '5px' }}>
                        {sessionValue || '(Click button 3 to read)'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SimpleTextSession;