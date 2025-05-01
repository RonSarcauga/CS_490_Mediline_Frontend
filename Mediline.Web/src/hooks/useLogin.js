import { useMutation } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      if (!email || !password) throw new Error("Email and password are required.");

      const response = await axios.post('/auth/login', {
        username: email,
        password,
      });
      return response.data;
    }
  });
};
