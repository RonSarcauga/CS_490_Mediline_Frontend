import axios from '../assets/js/api.js';

export function authHeaders() {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        }
    };
}

export const chatLogFetch = async (appointment_id) => {
    const res = await axios.get(`/chat/${appointment_id}`, authHeaders());
    const chat = res.data;

    const chatlog = chat.messages.map(msg => ({
        message: msg.message_content,
        sender: parseInt(msg.user_id),
        timestamp: msg.time
    }));

    return { chatlog };
};
