import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
