import React from 'react';
import Chat from './chat';
import Document from './document';
import MainPage from './mainPage';
import Children from './children';
import Property from './property';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' exact element={<MainPage />} />
              <Route path='/document' element={<Document />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/children' element={<Children />} />
              <Route path='/property' element={<Property />} />
          </Routes>
      </Router>
  );
}

export default App;
