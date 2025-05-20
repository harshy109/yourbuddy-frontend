import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage';
import ContextProvider from './context/Context';
import Signup from './pages/Signup';
import Login from './pages/Login';  // Import the Login component

function App() {
  
  return (
    <>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />  {/* Add Login route */}
        </Routes>
      </Router>
    </ContextProvider>
    </>
  )
}

export default App
