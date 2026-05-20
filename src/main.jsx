import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'
import SimpleTextSession from './SimpleTextSession.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <SimpleTextSession /> */}
      <RouterProvider router={router} />
      {/* <BrowserRouter>
    <App />
    </BrowserRouter> */}
    </Provider>
  </StrictMode>,
)
