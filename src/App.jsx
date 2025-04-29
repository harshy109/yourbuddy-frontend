import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './pages/Home'
import Chat from './pages/Chat';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
