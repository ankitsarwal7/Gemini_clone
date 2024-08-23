 

import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, handleRecentClick,newChat } = useContext(Context);

  return (
    <div className='sidebar'>
      <div className='top'>
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={assets.menu_icon} 
          alt="Menu icon" 
        />
        <div onClick={()=>newChat()} className='new-chat'>
          <img src={assets.plus_icon} alt="Plus icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.length > 0 ? (
              prevPrompt.map((item, index) => (
                <div 
                  key={index} 
                  className="recent-entry"
                  onClick={() => handleRecentClick(item)} // Add onClick event
                >
                  <img src={assets.message_icon} alt="Message icon" />
                  <p>{item}...</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;




 