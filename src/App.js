import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./App.css"
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import Signin from './NewPages/Signin';
import Messages from './NewPages/Messages';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<LoginPage />} /> */}
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/map" element={<MapPage />} />
          <Route exact path="/chat" element={<Messages />} />
          <Route exact path="/chat/:receiverId" element={<Messages />} />
          <Route exact path="/chat/:receiverId/:chatId" element={<Messages />} />
          {/* <Route exact path="/chat" element={<ChatPage />} />
          <Route exact path="/chat/:receiverId" element={<ChatPage />} /> 
           <Route exact path="/chat/:receiverId/:chatId" element={<ChatPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
} 

export default App;
