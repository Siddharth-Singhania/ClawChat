import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import {SocketContextProvider} from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      {/* <App/> */}
      <SocketContextProvider>
        <App/>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
