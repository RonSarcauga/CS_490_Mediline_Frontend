import { useMutation } from '@tanstack/react-query';
import axios from '../assets/js/api.js';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/register', formData);
      return response.data;
    }
  });
};