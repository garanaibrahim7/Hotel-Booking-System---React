import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
const testEcho = new Echo({
    broadcaster: 'reverb',
    key: '9pxgjjpwyeogrtqvfldt',
    wsHost: '0.0.0.0',
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

const SimpleTextSession = () => {
  const [targetId, setTargetId] = useState('1'); 
  const [listeningChannel, setListeningChannel] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const startListening = () => {
    if (!targetId) return alert('Please enter a booking ID to track!');

    // Clean up any old channels before switching listeners
    if (listeningChannel) {
        testEcho.leaveChannel(`booking-tracker.${listeningChannel}`);
    }

    const channelName = `booking-tracker.${targetId}`;
    console.log(`📡 Attempting to establish a live listener channel link on: ${channelName}`);
    
    // 2. Direct Echo connection setup
    testEcho.channel(channelName)
      .listen('.PaymentStatusProcessed', (data) => {
        console.log('🎉 Boom! Packet caught over the air:', data);
        
        // Push the new event data array message onto our local UI view list
        setReceivedMessages(prev => [
            ...prev, 
            { timestamp: new Date().toLocaleTimeString(), payload: data }
        ]);
      });

    setListeningChannel(targetId);
  };

  // Clean up socket listener when closing the page entirely
  useEffect(() => {
    return () => {
        if (listeningChannel) {
            testEcho.leaveChannel(`booking-tracker.${listeningChannel}`);
        }
    };
  }, [listeningChannel]);

  return (
    <div className="container py-5 text-dark" style={{ maxWidth: '700px' }}>
      <div className="card p-4 shadow border-0 rounded-0 bg-white">
        <h4 className="fw-bold text-uppercase border-bottom pb-2 mb-3">📡 Real-Time WebSocket Sandbox Sandbox</h4>
        
        <div className="row g-2 align-items-center mb-4">
          <div className="col-8">
            <label className="small text-muted text-uppercase fw-bold d-block mb-1">Target Booking ID</label>
            <input 
              type="number" 
              className="form-control rounded-0" 
              value={targetId} 
              onChange={(e) => setTargetId(e.target.value)} 
              placeholder="e.g. 1"
            />
          </div>
          <div className="col-4 pt-4">
            <button onClick={startListening} className="btn btn-dark w-100 rounded-0 fw-bold py-2 text-uppercase">
              Connect
            </button>
          </div>
        </div>

        {listeningChannel && (
          <div className="alert alert-success rounded-0 border-0 mb-4 py-2 small fw-bold text-uppercase animate-pulse">
            🟢 Active Listener Mounted on channel: <code className="text-dark bg-white px-1">booking-tracker.{listeningChannel}</code>
          </div>
        )}

        <h6 className="fw-bold text-uppercase small text-secondary mb-2">Live Message Event Stream:</h6>
        <div className="border bg-light p-3 rounded-0 style scrollbar" style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'auto' }}>
          {receivedMessages.length === 0 ? (
            <p className="small text-muted fst-italic mb-0 text-center pt-5">Awaiting live broadcasts from server... Leave this page open and trigger the URL tab now.</p>
          ) : (
            receivedMessages.map((msg, idx) => (
              <div key={idx} className="bg-white border p-2 mb-2 shadow-sm rounded-0 small font-monospace">
                <span className="badge bg-dark rounded-0 me-2">{msg.timestamp}</span>
                <strong>Success state:</strong> <span className={msg.payload.success ? 'text-success' : 'text-danger'}>{String(msg.payload.success)}</span>
                <pre className="mt-2 mb-0 bg-light p-2 border text-muted" style={{ fontSize: '11px' }}>
                  {JSON.stringify(msg.payload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleTextSession;