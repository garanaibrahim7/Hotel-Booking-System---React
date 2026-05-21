import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: '9pxgjjpwyeogrtqvfldt',
    wsHost: '0.0.0.0',
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});