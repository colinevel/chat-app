import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <h1>My App</h1>
        <Routes>
          <Route path="/" element={<ChatRoom openModal={handleOpenModal} />} />
        </Routes>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
        )}
      </div>
    </Router>
  );
}

export default App;
