import axios from '../assets/js/api.js';
import { useMutation } from '@tanstack/react-query';

export const chatLogFetch = async () => {
    const {appt} = await axios.get(`/chat/${appointment_id}`);
    console.log('Fetched data:', chatlog.data);
    let chatlog = new Array(appt.length)
    for(var i = 0; i < appt.length; i++) {
        chatlog[i] = appt[i].messages.message_content; // message content
    }
    return {
        chatlog
    };
}
