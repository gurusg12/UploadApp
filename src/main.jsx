import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Filter from './Filter.jsx'
import Filt from './Filt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Filter/>
    {/* <Filt/> */}
  </StrictMode>,
)
