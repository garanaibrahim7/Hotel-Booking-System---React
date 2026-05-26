import { useState } from 'react'
import Login from './pages/Login'
import { useInitializeHandshakeQuery } from './redux/store/apiSlice';
import './css/header.css';


function App() {
  const [count, setCount] = useState(0);
  useInitializeHandshakeQuery();

  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
  });

  return (
    <>
      <Login />
    </>
  )
}

export default App
