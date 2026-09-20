import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/pokemon/:id" element={ <Profile/> } />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
