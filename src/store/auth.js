import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import LoginService from '../services/LoginService';


export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies();

  const user = ref(null);
  const token = ref(null);

  // Login method
  const login = async (credentials) => {
    try {
      const response = await LoginService.store(credentials);

      // Assuming response is like { data: { user, token } }
      if (response && response.data) {
        // No need to use `.value` here since `user` and `token` are already reactive refs
        user.value = response.data.user;
        token.value = response.data.token;

        // Set cookies
        cookies.set('token', token.value, { secure: true, sameSite: 'Strict' });
        cookies.set('user', JSON.stringify(user.value), { secure: true, sameSite: 'Strict' });
        //cookies type
        cookies.set('tokenType', 'Bearer', { secure: true, sameSite: 'Strict' });
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };


  // Logout method
  const logout = () => {
    user.value = null;
    token.value = null;

    // Remove cookies
    cookies.remove('token');
    cookies.remove('user');
    cookies.remove('tokenType');
  };

  return {
    user,
    token,
    login,
    logout,
  };

});
