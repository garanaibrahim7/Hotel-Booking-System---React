import { useState } from 'react'
import Login from './pages/Login'
import { useInitializeHandshakeQuery } from './redux/store/apiSlice';

function App() {
  const [count, setCount] = useState(0);
  useInitializeHandshakeQuery();

  return (
    <>
      <Login />
    </>
  )
}

export default App
