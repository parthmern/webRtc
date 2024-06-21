import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { SocketProvider } from "./providers/Socket";
import RoomPage from "./pages/RoomPage";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <div className="app">
      <SocketProvider>
        <PeerProvider>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
          </Routes>

        </PeerProvider>
      </SocketProvider>
      
    </div>
  );
}

export default App;
