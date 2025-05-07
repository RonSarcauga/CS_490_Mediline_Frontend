import React, { useState } from 'react';
import Chatbox from './Chatbox';
import { chatlog } from '../../assets/js/const.js';

const SharedChatBox = () => {
    // Initial chat data
    const [log, setChatLog] = useState(chatlog.log);

    // Handle messages sent from either chatbox
    const handleSendMessage = (senderUser, message) => {
        // Create a new message object
        const newMessage = [senderUser, message];

        // Update the shared chat log with the new message
        setChatLog((prevLog) => [...prevLog, newMessage])
    };

return (
    <> 
        <Chatbox
            user={0}
            data={log}
            onSendMessage={handleSendMessage}
        />
        <Chatbox
            user={1}
            data={log}
            onSendMessage={handleSendMessage}
        />
    </>
);
};

export default SharedChatBox;