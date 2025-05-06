import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './pages/Home'
import Chat from './pages/Chat';
import ChatPage from './pages/ChatPage';
import ContextProvider from './context/Context';

function App() {
  
  return (
    <>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </ContextProvider>
    </>
  )
}

export default App
