import React from "react";
import Chat from './chat';
import Document from './document';
import Children from './children';
import Property from './property';
import Family from './family';
import {Routes, Route, useNavigate} from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();
    const navigateToChat = () => {
        navigate('/chat');
      };
    
      const navigateToDocuments = () => {
        navigate('/document');
      };
      const navigateToChildren = () => {
        navigate('/children');
      };
      const navigateToProperty = () => {
        navigate('/property');
      };
      const navigateToFamily = () => {
        navigate('/family');
      };

    return (
        <div className="centerBox">
            <div className="heading">LegalMind</div>
            <p>Different ways to start!</p>
            <div className="optionButtons">
                <button className="clickButton" onClick = {navigateToDocuments}>Documents</button>
                <button className="clickButton" onClick = {navigateToChat}>Women Law</button>
                <button className="clickButton" onClick = {navigateToChildren}>Children Law</button>
                <button className="clickButton" onClick = {navigateToFamily}>Family Law</button>
                <button className="clickButton" onClick = {navigateToProperty}>Intellectual Property Law</button>
            </div>
            <Routes>
              <Route path='/document' element={<Document />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/children' element={<Children />} />
              <Route path='/family' element={<Family />} />
              <Route path='/property' element={<Property />} />
          </Routes>
        </div>
    )
}

export default MainPage;